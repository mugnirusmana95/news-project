import { To } from "react-router"
import { RootState, RootDispatch } from "redux/store"

type RelativeRoutingType = "route" | "path"

interface NavigateOptions {
  replace?: boolean
  state?: any
  preventScrollReset?: boolean
  relative?: RelativeRoutingType
  unstable_flushSync?: boolean
  unstable_viewTransition?: boolean
}

interface NavigateFunction {
  (to: To, options?: NavigateOptions): void
  (delta: number): void
}

export interface PageType {
  router: NavigateFunction
  state: RootState
  dispatch: RootDispatch
}