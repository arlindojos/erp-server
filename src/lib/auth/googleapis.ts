
const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGL_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_REDIRECT_URIS
}

export default googleCredentials;
