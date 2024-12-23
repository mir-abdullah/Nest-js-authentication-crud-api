/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGaurd } from 'src/auth/gaurd';

@UseGuards(JwtGaurd)
@Controller('users')
export class UserController {
    @Get()
    getMe(@GetUser() user: User) {
        return user
    }
    
   
}
