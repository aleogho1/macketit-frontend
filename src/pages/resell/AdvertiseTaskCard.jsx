/* eslint-disable no-irregular-whitespace */
// import { Button } from '@nextui-org/button'

import { Button } from '@nextui-org/button'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
// import imgplaceholder from '../../assets/Rectangle5.svg'
import { useFetchItems, useFetchSingleItems } from '../../api/resellApi'
import DetailsModal from './components/DetailsModal'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'

export default function AdvertiseTaskCard() {
  const { data: fetchItems } = useFetchItems()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState(null)
  const { data: fetchSingleItem } = useFetchSingleItems()

  console.log(fetchItems)
  console.log(fetchSingleItem)
  const handlePreview = async (item) => {
    setSelectedItem(item)
    onOpen()
  }
  return (
    <>
      {fetchItems?.length === 0 ? (
        <div className='text-center bg-gray-200 dark:bg-zinc-900'>
          No Item in the market
        </div>
      ) : (
        fetchItems?.map((item, index) => (
          <div key={index} onClick={() => handlePreview(item)}>
            <Card className=' p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg flex-col justify-start items-start gap-2 inline-flex'>
              <div className='relative bg-neutral-800'>
                <Image
                  className='w-[365px] rounded-none h-[15rem] opacity-50'
                  src={item?.item_img}
                />
                <div className=' w-full flex p-3 z-10 right[11px] top-[6.5rem] lg:top-[10rem] 2xl:top-[12rem] absolute justify-between items-center inlineflex'>
                  <div className='justify-start items-start gap-0.5 flex'>
                    <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                      <div className='justify-start items-center gap-2.5 flex'>
                        <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                          #Cars
                        </div>
                      </div>
                    </div>
                    <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                      <div className='justify-start items-center gap-2.5 flex'>
                        <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                          #Cars
                        </div>
                      </div>
                    </div>
                    <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                      <div className='justify-start items-center gap-2.5 flex'>
                        <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                          #Cars
                        </div>
                      </div>
                    </div>
                    <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                      <div className='justify-start items-center gap-2.5 flex'>
                        <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                          #Cars
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='justify-start items-start gap-[2.50px] flex'>
                    <div className='w-[6.50px] h-[6.50px] bg-zinc-300 rounded-full' />
                    <div className='w-[6.50px] h-[6.50px] bg-white bg-opacity-25 rounded-full' />
                    <div className='w-[6.50px] h-[6.50px] bg-white bg-opacity-25 rounded-full' />
                  </div>
                </div>
              </div>
              <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                <div className='grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex'>
                  <div className='self-stretch justify-between items-start inline-flex'>
                    <div className="w-[221px] text-black dark:text-white text-sm font-medium font-['Manrope']">
                      {item?.name} on sales @ {item?.phone}
                      {item?.phone === undefined ? '0905799809' : null}
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='17'
                      height='17'
                      viewBox='0 0 17 17'
                      fill='none'
                    >
                      <path
                        d='M3.33331 3.92334V14.4477C3.33331 14.8193 3.72447 15.0611 4.05692 14.8949L7.77222 13.0372C8.33527 12.7557 8.99802 12.7557 9.56107 13.0372L13.2764 14.8949C13.6088 15.0611 14 14.8193 14 14.4477V3.92334C14 2.81877 13.1045 1.92334 12 1.92334H5.33331C4.22874 1.92334 3.33331 2.81877 3.33331 3.92334Z'
                        className='dark:stroke-white stroke-black'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                  <div className='self-stretch h[45px] flex-col justify-start items-start flex'>
                    <div className='py-1.5 justify-start items-center gap-2 inline-flex'>
                      <div className='justify-start items-center gap-0.5 flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='17'
                          height='18'
                          viewBox='0 0 17 18'
                          fill='none'
                        >
                          <g clipPath='url(#clip0_2723_11819)'>
                            <path
                              d='M4.95831 12.6317L12.0416 5.54834M5.40085 5.991H5.9321M5.40085 6.52225H5.9321M11.0675 11.6577H11.5988M11.0675 12.1889H11.5988M16.2916 9.09001C16.2916 13.3932 12.8032 16.8817 8.49998 16.8817C4.19676 16.8817 0.708313 13.3932 0.708313 9.09001C0.708313 4.78679 4.19676 1.29834 8.49998 1.29834C12.8032 1.29834 16.2916 4.78679 16.2916 9.09001ZM6.37498 6.25667C6.37498 6.64787 6.05785 6.96501 5.66665 6.96501C5.27544 6.96501 4.95831 6.64787 4.95831 6.25667C4.95831 5.86547 5.27544 5.54834 5.66665 5.54834C6.05785 5.54834 6.37498 5.86547 6.37498 6.25667ZM12.0416 11.9233C12.0416 12.3145 11.7245 12.6317 11.3333 12.6317C10.9421 12.6317 10.625 12.3145 10.625 11.9233C10.625 11.5321 10.9421 11.215 11.3333 11.215C11.7245 11.215 12.0416 11.5321 12.0416 11.9233Z'
                              stroke='#B1B1B1'
                              strokeLinecap='round'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_2723_11819'>
                              <rect
                                width='17'
                                height='17'
                                fill='white'
                                transform='translate(0 0.589844)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="opacity-50 text-zinc-400 text-sm font-medium font-['Manrope']">
                          Commission
                        </div>
                      </div>
                      <div className="text-black dark:text-white text-sm font-bold font-['Manrope']">
                        ₦{item?.price} {''}per sale
                      </div>
                    </div>
                    <div className='self-stretch justify-between items-center inline-flex'>
                      <div className="opacity-50 text-zinc-400 text-sm font-medium font-['Manrope'] line-through">
                        30% off
                      </div>
                      <Button
                        onClick={() => handlePreview(item)}
                        className='justify-start bg-gray-200 dark:bg-zinc-900 items-center gap-2 flex'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='17'
                          height='17'
                          viewBox='0 0 17 17'
                          fill='none'
                        >
                          <path
                            d='M14.1666 5.92318C14.1666 6.19932 14.3905 6.42318 14.6666 6.42318C14.9428 6.42318 15.1666 6.19932 15.1666 5.92318H14.1666ZM11.3333 2.08984C11.0572 2.08984 10.8333 2.3137 10.8333 2.58984C10.8333 2.86599 11.0572 3.08984 11.3333 3.08984V2.08984ZM8.31307 8.23629C8.11781 8.43155 8.11781 8.74814 8.31307 8.9434C8.50834 9.13866 8.82492 9.13866 9.02018 8.9434L8.31307 8.23629ZM14.6303 2.77185L14.1848 2.99884L14.1848 2.99884L14.6303 2.77185ZM14.4846 2.62617L14.2576 3.07168V3.07168L14.4846 2.62617ZM8.66663 4.42318C8.94277 4.42318 9.16663 4.19932 9.16663 3.92318C9.16663 3.64703 8.94277 3.42318 8.66663 3.42318V4.42318ZM13.8333 8.58984C13.8333 8.3137 13.6094 8.08984 13.3333 8.08984C13.0572 8.08984 12.8333 8.3137 12.8333 8.58984H13.8333ZM4.12265 14.2992L4.34965 13.8537L4.12265 14.2992ZM2.95728 13.1338L2.51177 13.3608L2.95728 13.1338ZM11.8773 14.2992L11.6503 13.8537L11.8773 14.2992ZM13.0426 13.1338L12.5971 12.9068L13.0426 13.1338ZM2.95728 5.3792L2.51177 5.15221H2.51177L2.95728 5.3792ZM4.12265 4.21383L3.89566 3.76832L3.89566 3.76832L4.12265 4.21383ZM15.1666 5.92318V3.12318H14.1666V5.92318H15.1666ZM14.1333 2.08984H11.3333V3.08984H14.1333V2.08984ZM14.2154 2.33392L8.31307 8.23629L9.02018 8.9434L14.9225 3.04103L14.2154 2.33392ZM15.1666 3.12318C15.1666 3.03809 15.167 2.9442 15.1604 2.86353C15.1534 2.77702 15.1359 2.66274 15.0758 2.54485L14.1848 2.99884C14.1611 2.95226 14.1617 2.9203 14.1637 2.94496C14.1647 2.95699 14.1656 2.97601 14.1661 3.00741C14.1666 3.03879 14.1666 3.07536 14.1666 3.12318H15.1666ZM14.1333 3.08984C14.1811 3.08984 14.2177 3.08986 14.2491 3.09035C14.2805 3.09084 14.2995 3.09174 14.3115 3.09272C14.3362 3.09474 14.3042 3.09541 14.2576 3.07168L14.7116 2.18067C14.5937 2.12061 14.4794 2.10311 14.3929 2.09605C14.3123 2.08945 14.2184 2.08984 14.1333 2.08984V3.08984ZM15.0758 2.54486C15.0359 2.46645 14.984 2.39537 14.9225 2.33392L14.2154 3.04103C14.2032 3.02874 14.1928 3.01452 14.1848 2.99884L15.0758 2.54486ZM14.9225 2.33392C14.8611 2.27247 14.79 2.22062 14.7116 2.18067L14.2576 3.07168C14.242 3.06369 14.2277 3.05331 14.2154 3.04103L14.9225 2.33392ZM9.06663 14.0898H6.93329V15.0898H9.06663V14.0898ZM3.16663 10.3232V8.18984H2.16663V10.3232H3.16663ZM6.93329 4.42318H8.66663V3.42318H6.93329V4.42318ZM12.8333 8.58984V10.3232H13.8333V8.58984H12.8333ZM6.93329 14.0898C6.17831 14.0898 5.64214 14.0895 5.22255 14.0552C4.8088 14.0214 4.55263 13.9571 4.34965 13.8537L3.89566 14.7447C4.26311 14.9319 4.66552 15.013 5.14112 15.0519C5.61087 15.0902 6.19481 15.0898 6.93329 15.0898V14.0898ZM2.16663 10.3232C2.16663 11.0617 2.16624 11.6456 2.20462 12.1154C2.24348 12.5909 2.32455 12.9934 2.51177 13.3608L3.40278 12.9068C3.29935 12.7038 3.2351 12.4477 3.2013 12.0339C3.16701 11.6143 3.16663 11.0782 3.16663 10.3232H2.16663ZM4.34965 13.8537C3.94196 13.646 3.6105 13.3145 3.40278 12.9068L2.51177 13.3608C2.81537 13.9567 3.29981 14.4411 3.89566 14.7447L4.34965 13.8537ZM9.06663 15.0898C9.80511 15.0898 10.389 15.0902 10.8588 15.0519C11.3344 15.013 11.7368 14.9319 12.1043 14.7447L11.6503 13.8537C11.4473 13.9571 11.1911 14.0214 10.7774 14.0552C10.3578 14.0895 9.82161 14.0898 9.06663 14.0898V15.0898ZM12.8333 10.3232C12.8333 11.0782 12.8329 11.6143 12.7986 12.0339C12.7648 12.4477 12.7006 12.7038 12.5971 12.9068L13.4881 13.3608C13.6754 12.9934 13.7564 12.5909 13.7953 12.1154C13.8337 11.6456 13.8333 11.0617 13.8333 10.3232H12.8333ZM12.1043 14.7447C12.7001 14.4411 13.1845 13.9567 13.4881 13.3608L12.5971 12.9068C12.3894 13.3145 12.058 13.646 11.6503 13.8537L12.1043 14.7447ZM3.16663 8.18984C3.16663 7.43486 3.16701 6.89869 3.2013 6.4791C3.2351 6.06535 3.29935 5.80918 3.40278 5.6062L2.51177 5.15221C2.32455 5.51966 2.24348 5.92207 2.20462 6.39767C2.16624 6.86742 2.16663 7.45136 2.16663 8.18984H3.16663ZM6.93329 3.42318C6.19481 3.42318 5.61087 3.42279 5.14112 3.46117C4.66552 3.50003 4.26311 3.5811 3.89566 3.76832L4.34965 4.65933C4.55263 4.55591 4.8088 4.49165 5.22255 4.45785C5.64214 4.42357 6.17831 4.42318 6.93329 4.42318V3.42318ZM3.40278 5.6062C3.6105 5.19851 3.94196 4.86706 4.34965 4.65933L3.89566 3.76832C3.29981 4.07192 2.81537 4.55636 2.51177 5.15221L3.40278 5.6062Z'
                            fill='#FF6DFB'
                          />
                        </svg>
                        <div className=" text-primaryText   text-sm font-medium font-['Manrope']">
                          More details
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div className='self-stretch justify-start items-center gap-3 inline-flex'>
                    <Button className='grow shrink basis-0  p-2 bg-white rounded-sm border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex'>
                      <div className="text-center text-black text-[10px] font-medium font-['Manrope']">
                        Buy this product
                      </div>
                    </Button>
                    <Button className='grow shrink basis-0 p-2 primaryBg rounded-sm border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex'>
                      <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                        Resell this product
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))
      )}

      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        // selectedItem={selectedItem}
        fetchSingleItem={selectedItem}
      />
    </>
  )
}
