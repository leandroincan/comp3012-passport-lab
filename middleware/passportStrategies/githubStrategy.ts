import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { PassportStrategy } from "../../interfaces";
import { userModel } from "../../models/userModel";
import dotenv from "dotenv";

dotenv.config();

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: "http://localhost:8000/auth/github/callback",
  },

  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done
  ) => {
    try {
      let user = userModel.findByGithubId(profile.id);

      if (!user) {
        const name =
          profile.displayName ||
          profile.username ||
          "GitHub User";

        user = userModel.createGithubUser(
          profile.id,
          name
        );
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;