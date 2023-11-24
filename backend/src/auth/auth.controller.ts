import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
// import { CreateUserDtoLocal } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './dto/signUp.dto';
import { JWTGuard } from './guards/jwt.guard';
import { StatusGateway } from 'src/user/status.gateway';


//talk to anas about new routes
// @ApiExcludeController()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
		private readonly statusGateway: StatusGateway
    ) {}

    @Get('api')
    @UseGuards(AuthGuard('42'))
    async handle42Auth(@Req() request: any, @Res() response: Response) {
        const user = request.user;
        console.log("Copy This Token: ", request.user.token);
		response.cookie("token", "Bearer " + request.user.token);
		if (user.twoFactor === true)
			response.redirect('http://localhost:3001/verification');
		else
		{
			const payload = {
				status: "online",
				userId: user.user.id
			}
			this.statusGateway.server.emit('status', payload);
			response.redirect('http://localhost:3001/dashboard');
		}
	}

	
	@Get('google')
	@UseGuards(AuthGuard('google'))
	async handleGoogleAuth(
		@Req() request: any,
		@Res() response: Response
	 ) {
		const user = request.user;
		console.log("Copy This Token: ", request.user.token);
		response.cookie("token", "Bearer " + request.user.token);
		if (user.twoFactor === true)
			response.redirect('http://localhost:3001/verification');
		else
		{
			const payload = {
				status: "online",
				userId: user.user.id
			}
			this.statusGateway.server.emit('status', payload);
			response.redirect('http://localhost:3001/dashboard');
		}
	}

	@Post('2fa')
	@UseGuards(JWTGuard)
	async handle2fa(
		@Body() body: {twofactorcode: string},
		@Req() request: Request
	) {
		console.log(body);
		const user = await this.userService.getCurrentUser(request);
    	const isValid = await this.authService.userTwoFaChecker(user, body);
		if (!isValid)
			throw new HttpException("invalid code", HttpStatus.BAD_REQUEST);
		const payload = {
			status: "online",
			userId: user.id
		}
		this.statusGateway.server.emit('status', payload);
		return user;
	}

	@Post('login')
  	@UseGuards(LocalAuthGuard)
	async handleLogin(@Body() data: SignInDto, @Req() request: any, @Res() response: Response) {
		const user = request.user;
	  	console.log("Copy This Token: ", request.user.token);
		response.cookie("token", "Bearer " + request.user.token);
		if (user.twoFactor === true)
			response.redirect('http://localhost:3001/verification');
		else
		{
			const payload = {
				status: "online",
				userId: user.id
			}
			this.statusGateway.server.emit('status', payload);
			response.redirect('http://localhost:3001/dashboard');
		}
		// response.send(user);
	}

	@Post('signUp')
	async signUp(@Body() data: SignUpDto, @Req() request: any, @Res() response: Response) {
		const user = await this.authService.signUp(data);
		response.cookie("token", "Brearer " + user.token);
		const payload = {
			status: "online",
			userId: user.user.id
		}
		this.statusGateway.server.emit('status', payload);
		response.send(user);
	}
}


