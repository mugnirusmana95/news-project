import { PageType } from "pages/PageType"
import { useEffect, useState } from "react"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import { getNews, defaultNews, dataArticlesType } from "redux/slices/news-slices"
import Alert from "components/alert"
import Loader from "components/loader"

const News = ({ dispatch, state, router }: PageType) => {
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
    <div className="w-full h-full flex flex-col px-20 pt-10 pb-20 gap-10 text-gray-600">
      <div className="w-full flex flex-row">
        <div className="w-full min-h-[30px] flex flex-row items-center gap-5 text-gray-800">
        <span className="text-cyan-500 font-bold cursor-pointer" onClick={() => router('/')}>News App</span>
          <span>|</span>
          <span className={`text-cyan-500 font-bold`}>Home</span>
          <span className={`cursor-pointer`} onClick={() => router('/all-news')}>All News</span>
        </div>
        <div className="w-fit flex flex-row items-center gap-5">
          <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
            <IoPerson />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center p-5 rounded bg-gray-200 text-lg">
        <span className="mb-2">Welcome to News App</span>
        <div className="font-bold">
          Craft narrative that ignite <span className="text-cyan-500">inspiration</span>,
        </div>
        <div className="font-bold">
          <span className="text-cyan-500">Knowledge</span>, and <span className="text-cyan-500">entertainment</span>
        </div>
      </div>

      <div className="w-full flex flex-row gap-10 cursor-pointer" onClick={() => router(`/all-news/${newsHeader?.id}`)}>
        <div className="w-full min-h-[250px] max-h-[250px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
          <img src={newsHeader?.urlToImage} alt="news" className="rounded-lg w-full h-full object-cover"/>
        </div>
        <div className="w-full flex flex-col gap-4 justify-center">
          <div className="w-full h-fit flex flex-row gap-3 items-center">
            <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
              <IoPerson />
            </div>
            <span>{newsHeader?.source?.name}</span>
          </div>
          <div className="font-bold text-4xl text-black">{newsHeader?.title}</div>
          <div className="text-xs">{newsHeader?.content}</div>
          <div className="text-cyan-500">{newsHeader?.author}</div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-full font-bold text-2xl">Latest News</div>
          <div className="w-full flex flex-row gap-2 text-cyan-500 justify-end cursor-pointer" onClick={() => router('/all-news')}>See All</div>
        </div>

        <div className="w-full flex flex-row gap-5 overflow-x-auto overflow-y-hidden">
          {news?.data?.map((item, index) => {
            if (index > 0) {
              return (
                <div key={index} className="w-1/5 flex-shrink-0 flex flex-col gap-4 cursor-pointer" onClick={() => router(`/all-news/${item?.id}`)}>
                  <div className="w-full h-[200px] max-h-[200px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
                    <img src={item?.urlToImage} alt="news" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="w-full h-fit flex flex-row gap-3 items-center">
                    <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
                      <IoPerson />
                    </div>
                    <span>{item?.source?.name}</span>
                  </div>
                  <div className="font-bold text-xl text-black line-clamp-1 overflow-hidden text-ellipsis">{item?.title}</div>
                  <div className="text-xs text-justify line-clamp-5 overflow-hidden text-ellipsis">{item?.content}</div>
                  <div className="text-cyan-500">{item.author}</div>
                </div>
              )
            }
            return null
          })}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-full font-bold text-2xl">News Stories</div>
          <div className="w-full flex flex-row gap-2 text-cyan-500 justify-end">See All</div>
        </div>

        <div className="w-full flex flex-row gap-5 overflow-x-auto overflow-y-hidden min-h-[50px]">
          {news?.data?.map((item, index) => (
            <div key={index} className="w-[50px] h-[50px] flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-black">
                  <img src={item?.urlToImage} alt="news" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full min-h-[50px]"></div>

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

export default News