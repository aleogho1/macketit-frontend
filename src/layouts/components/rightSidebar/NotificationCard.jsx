/* eslint-disable no-irregular-whitespace */

import { useGetNotification } from '../../../api/notificationApi'

export default function NotificationCard() {
  const { data: notification } = useGetNotification()
  return (
    <div>
      {notification?.length ? (
        <div className='self-stretch p-3 bg-[#B0B0B0] dark:bg-neutral-900 bg-opacity-40 rounded-lg justify-start items-start gap-2 inline-flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='21'
            height='20'
            viewBox='0 0 21 20'
            fill='none'
          >
            <path
              d='M20.5 10C20.5 4.47719 16.0228 0 10.5 0C4.97719 0 0.5 4.47719 0.5 10C0.5 14.9912 4.15687 19.1284 8.9375 19.8785V12.8906H6.39844V10H8.9375V7.79687C8.9375 5.29062 10.4305 3.90625 12.7147 3.90625C13.8088 3.90625 14.9531 4.10156 14.9531 4.10156V6.5625H13.6922C12.4499 6.5625 12.0625 7.33336 12.0625 8.12422V10H14.8359L14.3926 12.8906H12.0625V19.8785C16.8431 19.1284 20.5 14.9913 20.5 10Z'
              fill='#1877F2'
            />
            <path
              d='M14.3926 12.8906L14.8359 10H12.0625V8.12422C12.0625 7.33328 12.4499 6.5625 13.6922 6.5625H14.9531V4.10156C14.9531 4.10156 13.8088 3.90625 12.7146 3.90625C10.4305 3.90625 8.9375 5.29063 8.9375 7.79688V10H6.39844V12.8906H8.9375V19.8785C9.45439 19.9595 9.9768 20.0001 10.5 20C11.0232 20.0002 11.5456 19.9595 12.0625 19.8785V12.8906H14.3926Z'
              fill='white'
            />
          </svg>
          <div className='grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex'>
            <div className="self-stretch text-white text-sm font-normal font-['Campton']">
              @anasahmed from Misau, Bauchi just earned ₦3 for following a page
              or account on Instagram
            </div>
          </div>
        </div>
      ) : (
        <div className="self-stretch text-white text-sm font-normal font-['Campton']">
          No Notification
        </div>
      )}
    </div>
  )
}
