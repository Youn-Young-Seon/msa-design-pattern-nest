import { IsEmail, IsEmpty, Length } from "class-validator";

export class RequestUser {
    @IsEmpty({ message: 'Email cannot be null' })
    @Length(2, Infinity, { message: 'Email not be less than two characters' })
    @IsEmail()
    email: string;

    @IsEmpty({ message: 'Name cannot be null' })
    @Length(2, Infinity, { message: 'Name not be less than two characters' })
    name: string;

    @IsEmpty({ message: 'Password cannot be null' })
    @Length(8, Infinity, { message: 'Password must be equals or grater than 8 characters' })
    pwd: string
}