import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
@Unique(['tematic'])
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  tematic: string;


}