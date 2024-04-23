import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthGuard } from './auth/auth.guard';

@Controller('customers')
export class AppController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('by-id/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('by-email/:email')
  findOneEmail(@Param('email') email: string) {
    return this.usersService.findOneEmail(email);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('company/:companyId')
  getUsersByCompany(@Param('companyId') companyId: number) {
    return this.usersService.findAllUsersByCompanyId(companyId);
  }
}
