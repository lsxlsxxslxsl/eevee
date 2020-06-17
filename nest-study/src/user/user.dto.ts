import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realName: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '手机号必须是 Number 类型' },
  )
  readonly mobile: number;
  readonly role?: string | number;
}
