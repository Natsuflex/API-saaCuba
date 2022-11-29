import { Entity, PrimaryGeneratedColumn,  Column } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';


@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  video: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(250)
  descript: string;


}