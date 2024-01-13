declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    backendTokens: {
      accessToken: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };

    backendTokens: {
      accessToken: string;
    };
  }
}
