import { Entity, PrimaryGeneratedColumn,  Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  imagen: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(250)
  descript: string;


}