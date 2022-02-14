import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { CustomMongooseAdapter } from "../../../lib/CustomMongooseAdapter";

export default NextAuth({
  adapter: CustomMongooseAdapter(),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    {
      id: "google",
      name: "Google",
      type: "oauth",
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      checks: ["pkce", "state"],
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Store the user's profile in the session
      session.user = user;
      return session;
    },
  },
});
