import { useEffect, useState } from "react"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import { getNews, defaultNews } from "redux/slices/news-slices"
import { PageType } from "pages/PageType"
import Alert from "components/alert"
import Loader from "components/loader"

const AllNews = ({ dispatch, state, router }: PageType) => {
  const { news } = state
  const [category, setCategory] = useState<string>('all')
  const [errorAlert, setErrorAlert] = useState({
    show: false,
    title: '',
    message: ''
  })

  useEffect(() => {
    dispatch(getNews({ page: 1, pageSize: 10, category: category, isCombine: false }))
  }, [])

  useEffect(() => {
    if (news?.isSuccess || news?.isError) {
      dispatch(defaultNews())

      if (news?.isError) {
        setErrorAlert({
          show: true,
          title: 'Warning',
          message: news?.errorMessage ?? 'Something went wrong'
        })
      }
    }
  }, [news])

  useEffect(() => {
    dispatch(getNews({ page: 1, pageSize: 10, category: category, isCombine: false }))
  }, [category])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 1

    if (isBottom && !news.isLoading) {
      let currentPage = news?.page ?? 1
      dispatch(getNews({ page: currentPage + 1, pageSize: 10, category: 'all', isCombine: true }))
    }
  }

  return (
    <div className="w-full h-full flex flex-col px-20 pt-10 pb-20 gap-10 text-gray-600 overflow-y-auto" onScroll={handleScroll}>
      <div className="w-full flex flex-row">
        <div className="w-full min-h-[30px] flex flex-row items-center gap-5 text-gray-800">
          <span className="text-red-600 font-bold cursor-pointer" onClick={() => router('/')}>News App</span>
          <span>|</span>
          <span className={`cursor-pointer`} onClick={() => router('/news')}>Home</span>
          <span className={`text-red-600 font-bold`}>All News</span>
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
          Craft narrative that ignite <span className="text-red-600">inspiration</span>,
        </div>
        <div className="font-bold">
          <span className="text-red-600">Knowledge</span>, and <span className="text-red-600">entertainment</span>
        </div>
      </div>

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <span>Select Category:</span>
        <select
          className="outline-none border-[0.5px] border-gray-600 rounded p-2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="all">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      <div className="w-full flex flex-col h-fit gap-5">
        {news?.data?.map((item, index) => (
          <div key={index} className="w-full flex flex-row gap-10 cursor-pointer" onClick={() => router(`/all-news/${item?.id}`)}>
            <div className="w-full min-h-[250px] max-h-[250px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
              <img src={item?.urlToImage} alt="news" className="rounded-lg w-full h-full object-cover"/>
            </div>
            <div className="w-full flex flex-col gap-4 justify-center">
              <div className="w-full h-fit flex flex-row gap-3 items-center">
                <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
                  <IoPerson />
                </div>
                <span>{item?.source?.name}</span>
              </div>
              <div className="font-bold text-4xl text-black line-clamp-2 text-ellipsis">{item?.title}</div>
              <div className="text-xs line-clamp-2 text-ellipsis">{item?.content}</div>
              <div className="text-red-600">{item?.author}</div>
            </div>
          </div>
        ))}
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

export default AllNews