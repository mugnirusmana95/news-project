import { PageType } from "pages/PageType"
import { useEffect, useState } from "react"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import { getNews, defaultNews, dataArticlesType } from "redux/slices/news-slices"
import Alert from "components/alert"
import Loader from "components/loader"
import Header from "components/header"

const Home = ({ dispatch, state, router }: PageType) => {
  const { news } = state
  const [newsHeader, setNewsHeader] = useState<dataArticlesType>()
  const [errorAlert, setErrorAlert] = useState({
    show: false,
    title: '',
    message: ''
  })

  useEffect(() => {
    dispatch(getNews({ page: 1, pageSize: 10, category: 'all', isCombine: false }))
  }, [])

  useEffect(() => {
    if (news?.isSuccess || news?.isError) {
      dispatch(defaultNews())

      if (news?.isSuccess && news?.data) {
        const firstData: dataArticlesType = news?.data[0]
        setNewsHeader(firstData)
      }

      if (news?.isError) {
        setErrorAlert({
          show: true,
          title: 'Warning',
          message: news?.errorMessage ?? 'Something went wrong'
        })
      }
    }
  }, [news])

  return (
    <div className="w-screen h-full flex flex-col p-5 gap-5 laptop:gap-10 laptop:py-10 laptop:px-20 text-gray-600 overflow-hidden">
      <Header router={router} currentRouter={'/'} />

      <div className="w-full flex flex-col items-center justify-center p-5 rounded bg-gray-200 text-lg">
        <span className="mb-2">Welcome to News App</span>
        <div className="font-bold text-center">
          Craft narrative that ignite <span className="text-cyan-500">inspiration</span>,
        </div>
        <div className="font-bold text-center">
          <span className="text-cyan-500">Knowledge</span>, and <span className="text-cyan-500">entertainment</span>
        </div>
      </div>

      <div className="w-full flex flex-col tablet:flex-row gap-5 cursor-pointer" onClick={() => router(`/all-news/${newsHeader?.id}`)}>
        <div className="w-full min-h-[200px] max-h-[200px] laptop:min-h-[250px] laptop:max-h-[250px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
          <img src={newsHeader?.urlToImage} alt="news" className="rounded-lg w-full h-full object-cover"/>
        </div>
        <div className="w-full flex flex-col gap-4 justify-center">
          <div className="w-full h-fit flex flex-row gap-3 items-center">
            <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
              <IoPerson />
            </div>
            <span>{newsHeader?.source?.name}</span>
          </div>
          <div className="font-bold text-xl laptop:text-4xl text-black line-clamp-1 laptop:line-clamp-2 overflow-hidden text-ellipsis">{newsHeader?.title}</div>
          <div className="text-xs line-clamp-2 laptop:line-clamp-2 overflow-hidden text-ellipsis">{newsHeader?.content}</div>
          <div className="text-cyan-500">{newsHeader?.author}</div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="w-full laptop:flex flex-row justify-between items-center hidden">
          <div className="w-full font-bold text-2xl">Latest News</div>
          <div className="w-full flex flex-row gap-2 text-cyan-500 justify-end cursor-pointer" onClick={() => router('/all-news')}>See All</div>
        </div>

        <div className="w-full flex flex-col laptop:flex-row overflow-x-auto gap-5 overflow-y-hidden">
          {news?.data?.map((item, index) => {
            if (index > 0) {
              return (
                <div key={index} className="w-full laptop:w-1/5 flex-shrink-0 flex flex-col tablet:flex-row laptop:flex-col gap-5 cursor-pointer" onClick={() => router(`/all-news/${item?.id}`)}>
                  <div className="w-full h-[200px] max-h-[200px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
                    <img src={item?.urlToImage} alt="news" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="w-full flex flex-col gap-4 justify-center">
                    <div className="w-full h-fit flex flex-row gap-3 items-center">
                      <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
                        <IoPerson />
                      </div>
                      <span>{item?.source?.name}</span>
                    </div>
                    <div className="font-bold text-xl text-black line-clamp-1 overflow-hidden text-ellipsis">{item?.title}</div>
                    <div className="text-xs text-justify line-clamp-2 laptop:line-clamp-5 overflow-hidden text-ellipsis">{item?.content}</div>
                    <div className="text-cyan-500">{item.author}</div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>
      </div>

      <Alert
        show={errorAlert.show}
        title={errorAlert.title}
        message={errorAlert.message}
        type="warning"
        onCancel={() => setErrorAlert({ show: false, title: '', message: '' })}
      />

      <Loader show={news?.isLoading} />
    </div>
  )
}

export default Home