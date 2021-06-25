import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import Google from 'passport-google-oauth20';
import Twitter from 'passport-twitter';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import routes from './routes';

import errorHandler from './validations/handler/handler';


dotenvExpand(config());

const app = express();

// const allowedOrigins = process.env.SITESALLOWED!.split(',');
app.use(cors(
  // {
  //   origin: function (origin, callback) {
  //     if(!origin) return callback(new Error('Not allowed by CORS'))
  //     if (allowedOrigins.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }
));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.AUTH0_SECRET!,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user as Express.User)
})


const  GoogleStrategy = Google.Strategy;

passport.use(new GoogleStrategy(
  {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_REDIRECT_URIS
},
  function(accessToken, refreshToken, profile, cb) {

    console.log(profile);
    
    cb(null, profile);
  }
));

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);


app.get(
  '/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000');
  }
);

app.get(
  '/getuser',
  (request, respose) => {
    respose.status(200).json(request.user);
  }
);


app.use('/erp/api/v1', routes);

app.use('/uploads/images', express.static(path.join(__dirname, '..', 'uploads', 'images')));
app.use('/uploads/pdfs', express.static(path.join(__dirname, '..', 'uploads', 'pdfs')));

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3003);
