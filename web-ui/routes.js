import {authenticateRequest} from "../api/auth/auth.middleware.js";

export const AdminRoutes = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'auth.login',
    path: '/login'
  },
  {
    name: 'dashboard',
    path: '/dashboard',
  }
]

export function getRouteByName(arg) {
  //todo make it nested!
  return AdminRoutes.find(it => it.name === arg);
}
export const accessControlMiddleware = function (req,res,next){
  if (shouldRedirectLogin(req)) {
    return res.redirect('/login');
  }
  if (shouldRedirectToDashboard(req)) {
    return res.redirect('/dashboard');
  }
   next();
}
export function shouldRedirectLogin(req){
  return !req.user && String(req.url).startsWith('/dashboard');
}
export function shouldRedirectToDashboard(req){
  return req.user && String(req.url).startsWith('/login')
}
