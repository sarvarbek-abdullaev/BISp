import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ExtractJwt.fromAuthHeaderAsBearerToken() is a method that returns a function that extracts the JWT from the request header.
      ignoreExpiration: false, // By default, the JWT strategy throws an error if the token is expired. We can override this behavior by setting the ignoreExpiration option to true.
      secretOrKey: process.env.JWT_SECRET, // The secretOrKey option is used to verify the signature of the JWT. This is the same secret we used to sign the JWT in the AuthService.
    });
  }

  async validate(payload: { email: string }) {
    await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });
  }
}
