import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CompaniesService } from 'src/companies/companies.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly companiesService: CompaniesService
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['company']
    });
    if (!user) {
      throw new NotFoundException(`User with email ${id} not found`);
    }
    return user;
  }

  async findOneEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['company']
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(userDto: any): Promise<User[]> {
    if (userDto.companyName) {
      const company = await this.companiesService.findOrCreateByName(userDto.companyName);
      userDto.company = company;
    }

    const saltOrRounds = 10;
    userDto.password = await bcrypt.hash(userDto.password, saltOrRounds);

    const newUser = this.usersRepository.create(userDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: number, userDto: any): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { id }, relations: ['company'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (userDto.companyName) {
      const company = await this.companiesService.findOrCreateByName(userDto.companyName);
      userDto.company = company;
    }
    user = this.usersRepository.merge(user, userDto);
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['company'] });
  }

  async findAllUsersByCompanyId(companyId: number): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        company: { id: companyId }
      },
      relations: ['company'],
    });
  }
}
