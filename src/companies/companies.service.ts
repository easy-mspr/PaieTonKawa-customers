import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async create(companyDto: any): Promise<Company[]> {
    const newCompany = this.companiesRepository.create(companyDto);
    await this.companiesRepository.save(newCompany);
    return newCompany;
  }

  async update(id: number, companyDto: any): Promise<Company> {
    const company = await this.companiesRepository.preload({
      id: id,
      ...companyDto,
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    await this.companiesRepository.save(company);
    return company;
  }

  async remove(id: number): Promise<void> {
    const result = await this.companiesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }

  async findOrCreateByName(companyname: string): Promise<Company> {
    let company = await this.companiesRepository.findOne({
      where: { companyname },
    });
    if (!company) {
      company = this.companiesRepository.create({ companyname });
      await this.companiesRepository.save(company);
    }
    return company;
  }
}
