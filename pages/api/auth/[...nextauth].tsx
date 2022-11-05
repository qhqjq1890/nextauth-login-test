import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../libs/auth";

let prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "유저 아이디", type: "id", placeholder: "id" },
        password: {
          label: "유저 패스워드",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            id: String(credentials?.id),
          },
          select: {
            id: true,
            name: true,
            address: true,
            password: true,
          },
        });

        if (!user) {
          throw new Error("유저를 찾을 수 없습니다.");
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          throw new Error("비밀번호가 틀렸습니다.");
        }

        return { id: user!.id };
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
