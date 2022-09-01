import { Test } from 'src/test/entities/test.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'role', default: 'student' })
  role: string;
  @OneToMany(() =>  Test, test => test.user)
  tests: Test[];
}
