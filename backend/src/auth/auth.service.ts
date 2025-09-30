import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/roles';
import { TokenBlacklistService } from 'src/token-blacklists/token-blacklists.service';
import { LoginAdminDto } from 'src/roles/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const user = await this.usersService.createUser(createUserDto);

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXP || '15m',
    });

    return { user, accessToken };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email, true);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXP || '15m',
    });

    const { password: _, ...result } = user;
    return { user: result, accessToken };
  }

  async logout(token: string, userId: number): Promise<{ message: string }> {
    try {
      const decodedToken = this.jwtService.decode(token) as any;

      if (!decodedToken || !decodedToken.exp) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
      }

      const expiresAt = new Date(decodedToken.exp * 1000);

      await this.tokenBlacklistService.addToBlacklist(token, userId, expiresAt);

      return { message: 'Successfully logged out' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateToken(payload: any) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXP,
      }),
    };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;

    const user = await this.usersService.findOneByEmail(email, true);

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordCorrect) {
      throw new BadRequestException(
        'The email or password you entered is incorrect',
      );
    }

    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Access denied. Admins only.');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    return this.generateToken(payload);
  }
}
