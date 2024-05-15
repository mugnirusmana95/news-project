import { PageType } from "pages/PageType"

const Home = ({ router, state }: PageType) => {
  const { auth } = state
  return (
    <div className="w-full h-full flex-flex-row font-bold flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">Home</div>
      <div className="w-full flex flex-row gap-5 items-center justify-center">
        {auth?.data?.access_token ? (
          <span
            className="w-fit underline italic cursor-pointer"
            onClick={() => router('/dashboard')}
          >Dashboard</span>
        ) : (
          <span
            className="w-fit underline italic cursor-pointer"
            onClick={() => router('/login')}
          >Login</span>
        )}
      </div>
    </div>
  )
}

export default Home