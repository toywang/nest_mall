import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SkipJwtAuth } from './constants';
import { RegisterDto } from './dto/registerDto';

@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @ApiBody({ type: RegisterDto })
  @SkipJwtAuth()
  @Post('register')
  async register(@Request() req, @Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
