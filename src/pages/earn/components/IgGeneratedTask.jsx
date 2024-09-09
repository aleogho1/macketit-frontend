/* eslint-disable react/prop-types */

import Icons from "../../../components/Icon";
import { useNavigate } from "react-router-dom";

export default function IgGeneratedTask({ status ,caption, when, price, platform, task_id, task_type, goal}) {
  const navigate = useNavigate()
  return (     
        <div 
        onClick={() => navigate(`/dashboard/earn-advert-task-preview/${task_id}`)}
          className='md:w-[320px] 2xl:w-[360px] w-full  p-3 bg-[#2F2F2F] bg-opacity-30 rounded-lg flex-col justify-start items-start gap-2 inline-flex'
        >
          <div className='justify-start items-center gap-3 inline-flex'>
            <div className='h-5 justify-start items-start gap-2 flex'>
              <div className='w-5 h-5 justify-center items-center flex'>
                <Icons type={platform} width={20} height={20} />
              </div>
            </div>
            <div className='p-2 bg-white rounded justify-start items-start gap-[29px] flex'>
              <div className='justify-start items-center gap-2.5 flex'>
                <div className="text-stone-900 capitalize text-xs font-normal font-['Manrope']">
                  {status}
                </div>
              </div>
            </div>
          </div>
          <div className='flex-col justify-start items-start gap-3 flex'>
            <div className="text-white text-sm font-medium font-['Manrope']">
              {
                task_type === 'advert' && `Post an Advert on ${platform.charAt(0).toUpperCase()+platform.slice(1)}`
              }
              {
                task_type === 'engagement' && (
                  goal === 'comment' && `Comment on ${platform.charAt(0).toUpperCase()+platform.slice(1)} Post` ||
                  goal === 'follow and like' && 'Follow and Like Facebook Business Page' ||
                  goal === 'follow' && `Follow ${platform.charAt(0).toUpperCase()+platform.slice(1)} Page` ||
                  goal === 'like' && `Like ${platform.charAt(0).toUpperCase()+platform.slice(1)} Post`
                )
              }
            </div>
            <div className="self-stretch text-black dark:text-[#B1B1B1] text-[10px] font-normal font-['Manrope']">
              {when}
            </div>
            <div className='py-[4.50px] justify-start items-center gap-1.5 inline-flex'>
              <div className='justify-start items-center gap-[1.50px] flex'>
                   <Icons type='wallet' />
                <div className="opacity-50 text-black dark:text-[#B1B1B1] text-[10.50px] font-medium font-['Manrope']">
                  Earning:
                </div>
              </div>
              <div className="text-black dark:text-[#B1B1B1] text-[10.50px] font-bold font-['Manrope']">
                ₦{price} per Page Like and Follow
              </div>
            </div>
          </div>
        </div>
  )
}
