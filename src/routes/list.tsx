import Dashboard from "pages/dashboard"

import Login from "pages/login"

import Home from "pages/home"
import News from "pages/news"

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
  },
  {
    path: '/news',
    component: News
  }
]

export {
  AuthedRoute,
  UnauthedRoute,
  PublicRoute
}