import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
export class Coment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(250)
  content: string;

  @Column()
  @IsNotEmpty()
  valid: boolean;

  @Column()
  @IsNotEmpty()
  user_info: string;

}