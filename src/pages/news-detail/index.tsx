import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { PageType } from "pages/PageType"
import { dataArticlesType } from "redux/slices/news-slices"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import moment from "moment"
import Header from "components/header"

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

  return (
    <div className="w-screen h-screen flex flex-col p-5 gap-5 laptop:gap-10 laptop:py-10 laptop:px-20 text-gray-600">
      <Header router={router} currentRouter={null} />

      {dataDetail ? (
        <div className="w-full flex flex-col gap-10">
          <div className="w-full min-h-[200px] max-h-[200px] tablet:min-h-[350px] tablet:max-h-[350px] flex flex-row bg-black rounded-lg border-[0.5px] border-gray-100 p-[0.5px]">
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
            <div className="text-xs">{dataDetail?.content} <a href={dataDetail.url} target="_blank" rel="noreferrer" className="text-cyan-500 cursor-pointer underline-none">Continue Reading...</a></div>
          </div>

          <div className="p-5 laptop:block hidden"></div>
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