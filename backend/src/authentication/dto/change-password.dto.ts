import { IsEmail, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  oldPassword: string;

  @Length(6, 20)
  newPassword: string;
}
