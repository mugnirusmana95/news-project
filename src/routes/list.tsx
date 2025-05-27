import Dashboard from "pages/dashboard"

import Login from "pages/login"

import Home from "pages/home"
import News from "pages/news"
import AllNews from "pages/all-news"
import NewsDetail from "pages/news-detail"

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
  },
  {
    path: '/all-news',
    component: AllNews
  },
  {
    path: '/all-news/:id',
    component: NewsDetail
  }
]

export {
  AuthedRoute,
  UnauthedRoute,
  PublicRoute
}