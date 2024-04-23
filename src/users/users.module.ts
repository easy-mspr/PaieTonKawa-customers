import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CompaniesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
