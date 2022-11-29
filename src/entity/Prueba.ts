import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
@Unique(['tipo'])
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(100)
  tipo: string;

  @Column()
  @IsNotEmpty()
  cant_test: number;

  @Column()
  @IsNotEmpty()
  result: string;

}