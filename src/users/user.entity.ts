import { IsEnum } from "class-validator";
import { UserRole } from "src/enum/role.enum";



import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'user'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
  @Column()
    // @Column({ unique: true })
    username:string
    
//    @Column({ unique: true })
   @Column()
    password:string 


    @Column()
    role: UserRole;
    
    

//     @OneToMany(() => Employee, (employee) => employee.user)
// employees: Employee[];


//    @OneToMany(() => Leave, (leave) => leave.user)
// leaves: Leave[];


}
