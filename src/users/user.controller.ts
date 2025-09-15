
import { Userdto } from "./user.dto";
import { User } from "./user.entity";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/enum/role.enum";
import { Roles } from "src/auth/decorators/roles.decorator";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./user.service";
import { BadRequestException, Body, Controller, Post, UnauthorizedException, ValidationPipe,UploadedFile,
  UseInterceptors, } from "@nestjs/common";
import * as XLSX from 'xlsx';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
export class UserController {
    constructor(private userService: UsersService,
       private readonly jwtService: JwtService,
    ) { }

    // @UseGuards(AuthGuard,RolesGuard)
    // @Roles(UserRole.ADMIN)


@Post('/register')
async UserRegister(
  @Body(ValidationPipe) userRegister: Userdto
): Promise<any> {
  try {
    return await this.userService.userregister(userRegister);
  } catch (error) {
    throw new BadRequestException(error.message || 'Registration failed');
  }
}


  @Post('/login')
  async login(@Body() userLogin: Userdto): Promise<any> {
    const user = await this.userService.findOne(userLogin.username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // You can return user data (without password) or JWT token here
    // const { password, ...rest } = user;
    // return rest;
    const payload = {
      username: user.username,
      ref_id: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    }

  }

    @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    console.log("sheetName",sheetName);
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    console.log("json data",jsonData);

    return await this.userService.saveExcelData(jsonData);
  }







// @Post('/login')
// async login(@Body() userLogin: Userdto): Promise<any> {
//   const user = await this.userService.findOne(userLogin.username);
//   if (!user) {
//     throw new UnauthorizedException('Invalid username or password');
//   }
//   const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
//   if (!isPasswordValid) {
//     throw new UnauthorizedException('Invalid username or password');
//   }

//   // You can return user data (without password) or JWT token here
//   const { password, ...rest } = user;
//   return rest;
// }

    }
    
