/* eslint-disable react/prop-types */
// import { useGetAdvert } from '../../api/advertApi'
// import { format } from 'date-fns'

import Icons from '../../components/Icon'
import { useDisclosure } from '@nextui-org/react'
import AdvertPaymentModal from '../advertise/components/AdvertPaymentModal'
import {
  useCreateAdvert,
  useCreateAdvertPaymentWallet,
} from '../../api/advertApi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGetProfile } from '../../api/profileApis'

export default function TaskCard({
  goal,
  caption,
  when,
  status,
  onNextPage,
  platform,
  payment_status,
  account_link,
  // fee,
  fee_paid,
  engagements_count,
  posts_count,
  total_allocated,
  task_type,
  target_country,
  target_state,
  authorization_url,
  gender,
  religion,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const completePayment = () => {
    onOpen()
  }
  const [payLoading, setPayLoading] = useState(false)
  const amountPaid = Number(fee_paid)
  const [successView, setSuccessView] = useState()
  const [paymentError, setPaymentError] = useState()
  const { data: profile } = useGetProfile()
  const [media, setMedia] = useState(null)
  const { mutateAsync: createAdvert, isPending } = useCreateAdvert()
  const { mutateAsync: createAdvertWithWallet } = useCreateAdvertPaymentWallet()
  const handlePaymentSuccess = async () => {
    setPayLoading(true)
    try {
      // const data = watch()
      const formData = new FormData()
      // Append selected image to formData if available
      if (media) {
        formData.append('media', media)
      }
      // Append other form fields
      formData.append('task_type', task_type)
      formData.append('target_country', target_country)
      formData.append('target_state', target_state)

      formData.append('platform', platform)
      formData.append('amount', amountPaid)
      formData.append('engagements_count', engagements_count)
      formData.append('posts_count', posts_count)
      formData.append('gender', gender)
      formData.append('caption', caption)
      formData.append('religion', religion)
      formData.append('goal', goal)
      formData.append('account_link', account_link)
      const authorizationUrl = authorization_url
      if (authorizationUrl) {
        localStorage.setItem('paystack_redirect', window.location.pathname)
        const newTab = window.open(authorizationUrl) // Open the URL in a new tab
        newTab.opener = window
        window.addEventListener('message', (event) => {
          console.log('Received message in original tab:', event.data)
          if (event.data === 'closeOriginalTab') {
            console.log('Closing original tab...')
            window.close()
            // newTab.close()
          }
        })
      }
      // const res = await createAdvert(formData)
      // if (res?.data.status) {
      //   setSuccessView('initialized')
      //   setPayLoading(false)
      //   toast.success(res.data.message, {
      //     duration: 2000,
      //   })
      //   onClose()

      //   // if (authorization_url) {
      //   //   localStorage.setItem('paystack_redirect', window.location.pathname)
      //   //   openInNewTab(authorization_url) // Call the function to open in a new tab

      //   // }

      // }
    } catch (error) {
      setPaymentError(error.response?.data?.message ?? error.message)
      setPayLoading(false)
      toast.error(error.response?.data?.message ?? error.message, {
        position: 'top-right',
        duration: 2000,
      })
      console.error(error)
    }
  }

  const handlePaymentTenditSuccess = async () => {
    try {
      // const data = watch()
      const formData = new FormData()
      // Append selected image to formData if available
      if (media) {
        formData.append('media', media)
      }
      // Append other form fields
      formData.append('task_type', task_type)
      formData.append('target_country', target_country)
      formData.append('target_state', target_state)

      formData.append('platform', platform)
      formData.append('amount', amountPaid)
      formData.append('engagements_count', engagements_count)
      formData.append('posts_count', posts_count)
      formData.append('gender', gender)
      formData.append('caption', caption)
      formData.append('religion', religion)
      formData.append('goal', goal)
      formData.append('account_link', account_link)

      const res = await createAdvertWithWallet(formData)
      if (res?.data.status) {
        setSuccessView('procceed')
        toast.success(res.data.message, {
          duration: 2000,
        })
        //  navigate('dashboard/advertise-history')
      }
    } catch (error) {
      setPaymentError(error.response?.data?.message ?? error.message)
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 2000,
      })
    }
  }
  // ${appreance === 'dark' ? 'bg-[#2F2F2F6B] bg-opacity30' : 'bg-black'}
  return (
    <>
      <div
        className={`w-full cursor-pointer lg:py-4 p-0  bg-[#2F2F2F6B]  bg-opacity30 rounded-lg  justify-start items-start gap-2 inline-flex`}
      >
        <div className='flex inline-flex gap-y-2 w-full p-2 lg:flex lg:flex-row lg:items-start lg:justify-between w-11/12 lg:pl-4'>
          <div className='flex items-start'>
            <Icons type={platform} width={32} height={32} />
          </div>
          <div className='flex flex-col gap-y-2 text-sm ml-6 lg:mr-8 w-11/12 lg:w-5/12'>
            <p className={` 'text-white'}`}>{when}</p>
            <p className='font-bold text-sm'>
              {goal
                ? (goal === 'comment' &&
                    `Get Genuine People to Comment on your ${
                      platform.charAt(0).toUpperCase() + platform.slice(1)
                    } Post`) ||
                  (goal === 'follow and like' &&
                    'Get Genuine People to Follow and Like your Facebook Business Page') ||
                  (goal === 'follow' &&
                    `Get Genuine People to Follow your ${
                      platform.charAt(0).toUpperCase() + platform.slice(1)
                    } Page`) ||
                  (goal === 'like' &&
                    `Get Genuine People to Like your ${
                      platform.charAt(0).toUpperCase() + platform.slice(1)
                    } Post`)
                : `Get people to post your advert on ${
                    platform.charAt(0).toUpperCase() + platform.slice(1)
                  }`}
            </p>
            <div className='flex items-center gap-x-2'>
              <Icons type='wallet' fill={'#B1B1B1'} />
              <span className={`  text-white`}>Pricing: </span>
              <p className='font-bold text-xs'>
                {profile?.wallet?.currency_symbol}{' '}
                {(task_type === 'advert' &&
                  (platform === 'whatsapp'
                    ? '80 per Posts'
                    : '140 per Posts')) ||
                  (task_type === 'engagement' &&
                    ((goal === 'comment' && `40 per Comments`) ||
                      (goal === 'follow and like' &&
                        '20 per Followers and Likes') ||
                      (goal === 'follow' && `5 per Followers`) ||
                      (goal === 'like' && `5 per Likes`)))}
              </p>
            </div>
            <div className='flex items-start gap-x-4'>
              <p
                className={`flex flex-col gap-y-2 
                text-[#909090]
                `}
              >
                {(task_type === 'advert' && 'Numbers of Advert Post') ||
                  (task_type === 'engagement' &&
                    ((goal === 'comment' && `Number of Comments`) ||
                      (goal === 'follow and like' &&
                        'Number of Followers and Likes') ||
                      (goal === 'follow' && `Number of Followers`) ||
                      (goal === 'like' && `Number of Likes`)))}
                <span className='text-white font-bold'>
                  {engagements_count?.toLocaleString() ||
                    posts_count?.toLocaleString()}
                </span>
              </p>
              <p className={`flex flex-col gap-y-2`}>
                Amount Paid
                <span className='text-white font-bold'>
                  {profile?.wallet?.currency_symbol}
                  {amountPaid?.toLocaleString()}.00
                </span>
              </p>
            </div>

            {status !== 'declined' ? (
              payment_status === 'complete' ? (
                <div
                  className='bg-[#CB29BE] w-6/12 ml-[2px] text-white text-xs text-center py-2 px-4 rounded-lg font-semibold mt-4 ml-20 lg:hidden lg:mt-0 lg:ml-0'
                  onClick={onNextPage}
                >
                  View & Track Result
                </div>
              ) : (
                <div
                  className='bg-[#FF6B6B] w-6/12 ml-[2px] text-white text-xs text-center py-2 px-4 rounded-lg font-semibold mt-4 ml-20 lg:hidden lg:mt-0 lg:ml-0'
                  onClick={completePayment}
                >
                  Complete payment
                </div>
              )
            ) : (
              ''
            )}
            <div className='flex flex-col mt-4 gap-y-2'>
              {total_allocated <= 0 ? (
                <div
                  className={`flex items-center justify-center gap-x-2  ${
                    (status === 'pending' && 'bg-white text-black') ||
                    (status === 'declined' && 'bg-red-500') ||
                    (status === 'approved' && 'bg-[#13BF62] text-white')
                  } lg:hidden  w-6/12 py-2 rounded-lg`}
                >
                  <Icons type={status} />{' '}
                  {status.charAt(0).toUpperCase() + status?.slice(1)}
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center gap-x-2  bg-[#1877F2] text-white'} lg:hidden  w-6/12 py-2 rounded-lg`}
                >
                  <Icons type='active' /> Active
                </div>
              )}
            </div>
          </div>
          <div
            className={`text-xs w-4/12 hidden lg:flex lg:flex-col ${'text-[#D8D8D8]'}`}
          >
            {account_link ? (
              <div>
                <p className='text-white'>
                  Your Link:{' '}
                  <a
                    href={account_link}
                    target='_blank'
                    className='text-secondary font-bold'
                    rel='noreferrer'
                  >
                    Click to visit
                  </a>
                </p>
                {account_link}
              </div>
            ) : (
              ''
            )}
            <div
              className={`flex flex-col gap-y-2 ${account_link ? 'mt-4' : ''}`}
            >
              <p className='text-sm'>Status</p>
              {total_allocated <= 0 ? (
                <div
                  className={`flex items-center justify-center gap-x-2  ${
                    (status === 'pending' && 'bg-white text-black') ||
                    (status === 'declined' && 'bg-red-500') ||
                    (status === 'approved' && 'bg-[#13BF62] text-white')
                  } w-6/12 py-2 rounded-lg`}
                >
                  <Icons type={status} />{' '}
                  {status.charAt(0).toUpperCase() + status?.slice(1)}
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center gap-x-2  bg-[#1877F2] text-white'}  w-5/12 py-2 rounded-lg`}
                >
                  <Icons type='active' /> Active
                </div>
              )}
            </div>
          </div>
          {status !== 'declined' ? (
            payment_status === 'complete' ? (
              <div
                className='bg-[#CB29BE] hidden lg:flex text-white text-xs text-center py-2 px-4 rounded-lg font-semibold mt-4 ml-20 lg:mt-0 lg:ml-0'
                onClick={onNextPage}
              >
                View & Track Result
              </div>
            ) : (
              <div
                className='bg-[#FF6B6B] hidden lg:flex text-white text-xs text-center py-2 px-4 rounded-lg font-semibold mt-4 ml-20 lg:mt-0 lg:ml-0'
                onClick={completePayment}
              >
                Complete payment
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </div>
      {isOpen && (
        <AdvertPaymentModal
          isOpen={isOpen}
          onClose={onClose}
          amount={amountPaid}
          isLoading={payLoading}
          onSuccess={handlePaymentSuccess}
          onWalletPaymentSuccess={handlePaymentTenditSuccess}
          successView={successView}
          paymentError={paymentError}
          setPaymentError={setPaymentError}
          // isPending={isPending}
        />
      )}
    </>
  )
}
// onClick={onNextPage}
