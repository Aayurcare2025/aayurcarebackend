import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Opd extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  plan:string;


  @Column()
  Sum_Insured:number;

  @Column()
  premium:number;


  



  

}

  
