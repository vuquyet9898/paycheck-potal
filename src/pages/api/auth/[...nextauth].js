/* eslint-disable no-param-reassign */
import { LOGIN } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const params = {
          personal_id: credentials.personal_id,
          password: credentials.password,
        }
        const res = await fetchApi({
          url: LOGIN,
          options: {
            method: 'POST',
          },
          params,
        })
        if (res.data) {
          return res.data
        }

        return null
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          name: user.full_name,
          phone: user.phone_number,
        }
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken
      return session
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
})
