import jwt from "jsonwebtoken";
import hash from "object-hash";
import {jwtCookieField, jwtSecret} from "./config.js";
import {getDebug} from "./utils.js";

const debug = getDebug('jwt-utils');

export default {
  generateTokenForPayload(payload) {
    return jwt.sign(payload, jwtSecret);
  },
  generateTokenForRequest(req, extraPayload) {
    const {ip} = req;
    const userAgent = req.headers['user-agent'];
    const sessionHash = hash({ip, userAgent});
    const payload = {...extraPayload, __h: sessionHash};
    return this.generateTokenForPayload(payload);
  },
  verifyRequest(req) {
    if (!req.cookies) throw new Error('no cookies!');

    const token = req.cookies[jwtCookieField];
    if (!token) throw new Error('no token in cookies')
    const validSignature = this.verifyToken(token);
    if (!validSignature) throw new Error('invalid token');

    const payload = this.decodeToken(token);
    const {__h} = payload;
    const {ip} = req;
    const userAgent = req.headers['user-agent'];
    const sessionHash = hash({ip, userAgent});
    const valid = __h === sessionHash;
    if (valid) {
      req.user = payload;
    }
    if (!valid) throw new Error('session mismatch')
    return valid;
  },
  verifyToken(token) {
    if (!token) return false;
    let valid = false;
    try {
      jwt.verify(token, jwtSecret);
      valid = true;
    } catch (e) {
      debug('verify-token failed:',e.message)
      valid = false;
      // nothing
    }
    return valid;
  },
  // note decode does not validate token
  decodeToken(token) {
    return jwt.decode(token);
  },
};
