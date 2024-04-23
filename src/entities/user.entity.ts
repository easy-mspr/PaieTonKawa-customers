import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdat: Date;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255 })
  lastname: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20 })
  phonenumber: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 20 })
  postalcode: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 10 })
  role: string;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
