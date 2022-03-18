import Express from "express";
import bodyParser from "body-parser";
import {AuthService} from "./auth.service.js";
import {getDebug} from "../../lib/utils.js";
import {jwtCookieField} from "../../lib/config.js";
import JwtUtils from "../../lib/jwt-utils.js";
import {authGuard} from "./auth.middleware.js";

const debug = getDebug('auth:router');
const cookieMaxAge = 12 * 60 * 60 * 1000;

const app = Express.Router();

app.post('/setup', bodyParser.json(), async (req, res) => {
  const {body: {email, password}} = req;
  const user = await AuthService.setupAdminUser(email, password);
  if (!user) return res.status(400).send('something is not right!');
  const token = JwtUtils.generateTokenForRequest(req, user);
  res.cookie(jwtCookieField, token, {maxAge: cookieMaxAge});
  return res.json({success: !!user});
});

app.post('/login', bodyParser.json(), async (req, res) => {
  const {body: {email, password}} = req;
  const user = await AuthService.login(email, password);
  if (!user) return res.status(400).json({success: false});
  const token = JwtUtils.generateTokenForRequest(req, {email});
  res.cookie(jwtCookieField, token, {maxAge: cookieMaxAge});
  res.send('');
});

app.use(authGuard);

app.get('/me', (req, res) => {
  const {email} = req.user;
  res.json({email});
});
export const AuthRouter = app;
