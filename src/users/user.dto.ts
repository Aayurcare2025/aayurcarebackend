  import { IsEnum, IsNotEmpty, Matches } from "class-validator";
import { UserRole } from "src/enum/role.enum";
  
  export class Userdto {

      @Matches(
    /^[A-Z][a-zA-Z0-9]*$/,
      {
        message: 'Username should start with capital letter.',
      }
    )
    @IsNotEmpty()
    username: string;

    @Matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      {
        message: 'Password should have 1 upper case, lowercase, number, and special character.',
      }
    )
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole = UserRole.USER; // Default role
  }
