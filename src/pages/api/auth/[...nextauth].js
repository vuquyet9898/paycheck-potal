import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import LoginApi from './login';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const res = await LoginApi.login({
          personal_id: credentials.personal_id,
          password: credentials.password,
        });

        if (res.data) {
          return res.data;
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          accessToken: user.accessToken,
          name: user.full_name,
          phone: user.phone_number,
        };

      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
});
