import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
@Unique(['tittle'])
export class Cuento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(100)
  tittle: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(500)
  history: string;

  @Column()
  @IsNotEmpty()
  picto_replace: string;

}