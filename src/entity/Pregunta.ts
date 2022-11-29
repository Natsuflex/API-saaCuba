import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(250)
  test: string;

  @Column()
  @IsNotEmpty()
  resp: number;

  @Column()
  @IsNotEmpty()
  id_prueba: number;

}