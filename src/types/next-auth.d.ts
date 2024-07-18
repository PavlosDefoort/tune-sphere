import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      accessToken?: string;
      refreshToken?: string;
      username?: string;
    };
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    username?: string;
  }
}
