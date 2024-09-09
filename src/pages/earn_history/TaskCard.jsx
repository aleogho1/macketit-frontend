/* eslint-disable react/prop-types */
// import { useGetAdvert } from '../../api/advertApi'
// import { format } from 'date-fns'

import Icons from "../../components/Icon";
import { useGetProfile } from "../../api/profileApis";

export default function TaskCard({
  goal,
  when,
  status,
  onNextPage,
  platform,
  task_type,
  price,
  taskId,
}) {
  const {data: profile} = useGetProfile()
  const amount = Number(price)
  return (
    <>
      {/* {taskId} */}
      <div
        onClick={onNextPage}
        // onClick={() => onNextPage(taskId)}
        className='w-full cursor-pointer bg-[#2F2F2F6B] bg-opacity30 rounded-lg flex lg:flex-row lg:items-start lg:justify-between px-8 py-4'
      >
         <div className="flex flex-row gap-x-6">
            <Icons type={platform} width={32} height={32}/>
            <div className="flex flex-col gap-y-2">
                <h4 className="text-[14px] font-semibold">
                  {
                    task_type === 'advert' ?
                    `Post adverts on your ${platform} account` : (
                      goal ? (
                        goal === 'comment' && `Comment on ${platform.charAt(0).toUpperCase()+platform.slice(1)} Post` ||
                        goal === 'follow and like' && 'Follow and Like Facebook Business Page' ||
                        goal === 'follow' && `Follow ${platform.charAt(0).toUpperCase()+platform.slice(1)} Page` ||
                        goal === 'like' && `Like ${platform.charAt(0).toUpperCase()+platform.slice(1)} Post`     )
                        : ''
                    )
                  }</h4>
                  <p className="text-[12px] font-normal text-[#D8D8D8] w-10/12">
                      {
                        task_type === 'advert' ?
                        `Promote advertisements for different businesses and top brands on your ${platform.charAt(0).toUpperCase()+platform.slice(1)} page and earn ${platform === 'whatsapp' ? `${profile?.wallet?.currency_symbol}80` : `${profile?.wallet?.currency_symbol}110`} for each post.`
                        :  (
                          goal ? (
                            goal === 'comment' && `Post comment on peoples , businesses or organization pages or post on Social media platform like X, Instagram, Facebook, TikTok and others to earn ${profile?.wallet?.currency_symbol} 20 per comment.` ||
                            goal === 'follow and like' && 'Follow and Like your Peoples Facebook Business Page' ||
                            goal === 'follow' && `Follow people and pages on selected social media account like Facebook, Instagram, TikTok, and others and earn ${profile?.wallet?.currency_symbol}3.5 per follow` ||
                            goal === 'like' && `Like peoples post on selected social media account like Facebook, Instagram, TikTok, and others and earn ${profile?.wallet?.currency_symbol}3.5 per like`     )
                            : ''
                        )
                      }
                  </p>
                  <p className="text-[12px] font-normal text-[#D8D8D8]">{when}</p>
                  <div className="flex items-center">
                  <Icons type='wallet' /> 
                    <p className="font-bold text-[14px]">
                        <span className="text-[14px] text-gray-500 font-normal">Earning:</span>  
                         {
                            task_type === 'advert' && 
                            (
                                platform === 'whatsapp' ? `${profile?.wallet?.currency_symbol} 80 per Advert post` :
                                `${profile?.wallet?.currency_symbol} 110 per Advert post`                                 
                            )                            
                            ||
                            task_type === 'engagement' && (
                              goal === 'comment' && `${profile?.wallet?.currency_symbol}20 per Comments` ||
                              goal === 'follow and like' && `${profile?.wallet?.currency_symbol}3.5 per Follows and Likes` ||
                              goal === 'follow' && `${profile?.wallet?.currency_symbol}3.5 per Follows` ||
                              goal === 'like' && `${profile?.wallet?.currency_symbol}3.5 per Likes`     )
                        } 
                    </p>
                  </div>
                  <div className={`${status === 'pending' && 'bg-[#323232]' || status === 'completed' && 'bg-[#4CAF50]' || status === 'in_review' && 'bg-[#323232]' || status === 'cancelled' && 'bg-[#FF3D00]'|| status === 'rejected' && 'bg-[#FF3D00]'} lg:hidden flex items-center justify-center text-white text-xs text-center py-2 px-2 rounded font-semibold w-4/12 mt-2`} onClick={onNextPage}>
                      {status.charAt(0).toUpperCase()+status.slice(1)}
                  </div> 
              </div>
         </div>
         <div>
            <div className={`${status === 'pending' && 'bg-[#323232]' || status === 'completed' && 'bg-[#4CAF50]' || status === 'in_review' && 'bg-[#323232]' || status === 'cancelled' && 'bg-[#FF3D00]'|| status === 'rejected' && 'bg-[#FF3D00]'} hidden lg:flex text-white text-xs text-center py-2 px-4 rounded font-semibold mt-4 ml-20 lg:mt-0 lg:ml-0`} onClick={onNextPage}>
                {status.charAt(0).toUpperCase()+status.slice(1)}
            </div> 
         </div>
      </div>
    </>
  )
}
