import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {
	@IsNotEmpty({ message: 'Username is required'})
	@IsString()
	username: string;

	@IsNotEmpty({ message: "email is required"})
	@IsEmail()
	email: string;

	@IsNotEmpty({ message: "password is required"})
	@IsString()
	password: string;
}

export class SignInDto {

	@IsNotEmpty({ message: "email is required"})
	email: string;

	@IsNotEmpty({ message: "password is required"})
	@IsString()
	password: string;
}
