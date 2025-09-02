import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser, Role } from 'src/roles/roles';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user)
      throw new UnauthorizedException('User or password are incorrect');

    const passwordIsMatched = await bcrypt.compare(password, user.password);
    if (!passwordIsMatched)
      throw new UnauthorizedException('User or password are incorrect');

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: IUser) {
    const payload = { sub: user.id, email: user.email, roles: user.role };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOneById(decoded.sub);

      if (!user) throw new ForbiddenException('Invalid refresh token');

      const payload = { sub: user.id, email: user.email, roles: user.role };

      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (e) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }

  async register(createUserDto: CreateUserDto) {
    const role = createUserDto.role || Role.USER;

    const { user } = await this.usersService.createUser({
      ...createUserDto,
      role,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { user, accessToken, refreshToken };
  }
}
