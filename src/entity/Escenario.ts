import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
export class Escenario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(250)
  content: string;

  @Column()
  @IsNotEmpty()
  represent: string;

  @Column()
  @IsNotEmpty()
  id_seccion: number;

}