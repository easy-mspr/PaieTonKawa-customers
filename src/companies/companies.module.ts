import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService],
  exports: [TypeOrmModule, CompaniesService],
  controllers: [CompaniesController], // Ajouter cette ligne
})
export class CompaniesModule {}
