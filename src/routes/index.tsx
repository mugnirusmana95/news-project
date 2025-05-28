import {
  Routes as WrapperRoutes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import {
  AuthedRoute,
  UnauthedRoute,
  PublicRoute
} from "routes/list"

import AuthedComponent from "routes/components/AuthedComponent"
import UnauthedComponent from "routes/components/UnauthedComponent"
import PublicComponent from "routes/components/PublicComponent"
import { useSelector } from "react-redux"
import { RootState } from "redux/store"

import NotFound from "pages/404"

const Routes = () => {
  const { data } = useSelector((state: RootState) => state.auth)
  return (
    <Router>
			<WrapperRoutes>
        {AuthedRoute.map((item, index) => {
          return (
            <Route
              key={index.toString()}
              path={item.path}
              element={(<AuthedComponent component={item.component} token={data?.access_token} />)}
            />
          )
        })}

        {UnauthedRoute.map((item, index) => {
          return (
            <Route
              key={index.toString()}
              path={item.path}
              element={(<UnauthedComponent component={item.component} token={data?.access_token} />)}
            />
          )
        })}

        {PublicRoute.map((item, index) => {
          return (
            <Route
              key={index.toString()}
              path={item.path}
              element={(<PublicComponent component={item.component} />)}
            />
          )
        })}

        <Route path="*" element={<NotFound />} />
      </WrapperRoutes>
    </Router>
  )
}

export default Routes