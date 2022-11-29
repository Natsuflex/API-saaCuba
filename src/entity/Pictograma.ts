import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';


@Entity()

export class Picto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  valor: string;

  @Column()
  @IsNotEmpty()
  pictograma: string;

  @Column()
  id_user: number;

}
