import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './guard/jwt-strategies';
import { Roles } from './guard/jwt-roles.guard';
import { Role } from 'src/roles/roles';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guard/jwt-auth.guard';
import { LoginAdminDto } from 'src/roles/login-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @Roles(Role.USER, Role.ADMIN)
  @Public()
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('login/admin')
  @Roles(Role.ADMIN)
  @Public()
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.user.id;

    if (!token) {
      throw new HttpException('No token provided', HttpStatus.BAD_REQUEST);
    }

    return this.authService.logout(token, userId);
  }
}
