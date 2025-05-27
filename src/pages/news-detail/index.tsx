import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { PageType } from "pages/PageType"
import { dataArticlesType } from "redux/slices/news-slices"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import moment from "moment"

const NewsDetail = ({ router, state }: PageType) => {
  const params = useParams()
  const { news } = state
  const [dataDetail, setDataDetail] = useState<dataArticlesType | undefined | null>(null)

  useEffect(() => {
    if (news?.data) {
      const data = news?.data?.find((item: dataArticlesType) => item?.id === params.id)
      setDataDetail(data)
    }
  }, [news])

  console.log('dataDetail ', dataDetail?.content?.split(' … ')[0])

  return (
    <div className="w-full h-full flex flex-col px-20 pt-10 pb-20 gap-10 text-gray-600 overflow-y-auto">
      <div className="w-full flex flex-row">
        <div className="w-full min-h-[30px] flex flex-row items-center gap-5 text-gray-800">
          <span className="text-cyan-500 font-bold cursor-pointer" onClick={() => router('/')}>News App</span>
          <span>|</span>
          <span className={`cursor-pointer`} onClick={() => router('/news')}>Home</span>
          <span className={`cursor-pointer`} onClick={() => router('/all-news')}>All News</span>
        </div>
        <div className="w-fit flex flex-row items-center gap-5">
          <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
            <IoPerson />
          </div>
        </div>
      </div>

      {dataDetail ? (
        <div className="w-full flex flex-col gap-10">
          <div className="w-full min-h-[500px] max-h-[500px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
            <img src={dataDetail?.urlToImage} alt="news" className="rounded-lg w-full h-full object-cover" />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-fit flex flex-row gap-3 items-center">
              <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
                <IoPerson />
              </div>
              <span>{dataDetail?.source?.name}</span>
              <span>|</span>
              <span className="text-cyan-500">{dataDetail?.author}</span>
              <span>|</span>
              <span>{moment(dataDetail?.publishedAt).format('DD MMM YYYY, HH:mm')}</span>
            </div>
            <div className="font-bold text-4xl text-black line-clamp-2 text-ellipsis">{dataDetail?.title}</div>
            <div className="text-xs pl-1 border-l-4 border-cyan-500">{dataDetail?.description}</div>
            <div className="text-xs">{dataDetail?.content?.split(' … ')[0]} <a href={dataDetail.url} target="_blank" rel="noreferrer" className="text-cyan-500 cursor-pointer underline-none">Continue Reading...</a></div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <span>News Not Found</span>
        </div>
      )}
    </div>
  )
}

export default NewsDetail