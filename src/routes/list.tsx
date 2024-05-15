import Dashboard from "pages/dashboard"

import Login from "pages/login"

import Home from "pages/home"

interface RootObjectType {
	path?: string
	component?: any
}

interface RootType extends Array<RootObjectType>{}

const AuthedRoute: RootType = [
  {
    path: '/dashboard',
    component: Dashboard
  }
]

const UnauthedRoute: RootType = [
  {
    path: '/login',
    component: Login
  }
]

const PublicRoute: RootType = [
  {
    path: '/',
    component: Home
  }
]

export {
  AuthedRoute,
  UnauthedRoute,
  PublicRoute
}