import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'expiration_date', type: 'datetime' })
  expirationDate: Date;
}
