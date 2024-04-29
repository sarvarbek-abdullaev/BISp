import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      profile: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        imageUrl: string;
        role: string;
      };
    };

    backendTokens: {
      accessToken: string;
    };
  }
}

import JWT from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    profile: {
      id: string;
      email: string;
      imageUrl: string;
      firstName: string;
      lastName: string;
      role: string;
    };

    backendTokens: {
      accessToken: string;
    };
  }
}
