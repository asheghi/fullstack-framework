import db from '../../lib/database.js';
import {getDebug} from "../../lib/utils.js";
import {verifyRequest} from "../../lib/jwt-utils.js";
const debug = getDebug('auth.middleware');

// try to fill req.user based on jwt token inside cookie header
export const authenticateRequest = (req, res, next) => {
  try {
    verifyRequest(req);
  } catch (e) {
    debug('failed to authenticate',e.message);
  }
  return next();
};

export async function authGuard(req, res, next) {
  if (!req.user) return res.status(401).send();
  const exists = db.users.find(it => it.email === req.user.email);
  if (!exists) return res.status(401).send();
  return next();
}
