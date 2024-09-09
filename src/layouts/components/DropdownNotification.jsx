import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import API from '../../services/AxiosInstance';
import Loader from '../../pages/Loader';

const DropdownNotification = () => {
  const notifications = [
    {
      label: 'Notifications',
      param: 'notification'
    },
    {
      label: 'Activities',
      param: 'activity'
    },
    {
      label: 'Messages',
      param: 'message'
    },
  ]
  const [notificationType, setNotificationType] = useState(notifications[0])
  const [isLoading, setLoading] = useState(false)
  const [notificationData, setNotificationData] = useState()
  const [showUnread, setShowUnread] = useState(false)
  const [unread, setUnread] = useState(
   {
     message: {
        type: 'message',
        unReadMessage: 0
      },
      activity:  {
        type: 'activity',
        unReadActivity: 0,
      },
      notification: {
        type: 'notification',
        unReadNotification: 0
      }   
    }  
  )
  const ReadNotification = (id) => {
    API.patch(`/notifications/${id}`, {
      is_read: true
    })
    .then((response) => {
      setNotificationData(response.data?.notifications)
    })
    .catch((error) => console.error(error))
  }
  const FilterNotification = (type) => {
    setLoading(true)
    API.get(`/notifications?type=${type}`)
    .then((response) => {
      setNotificationData(response.data?.notifications)
      setLoading(false)
      for (const item of response.data?.notifications) {
        if(item?.read === false) {
          const readTime = setTimeout(() => {
          ReadNotification(item?.id)
        }, 5000)           
        }
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }
  const filterUnread = (type) => {
    API.get(`/notifications?type=${type}`)
    .then((response) => {
      for(const item of response.data?.notifications) {
        if(item?.type === 'notification' && item?.read === false) {
          setUnread((prevRead) =>( 
            {
              ...prevRead,
              notification: {
                unReadNotification: prevRead.notification?.unReadNotification + 1
              }
            }                        
          ))
        } else if(item?.type === 'message' && item?.read === false) {
          setUnread((prevRead) =>( 
            {
              ...prevRead,
              message: {
                unReadMessage: prevRead.message?.unReadMessage + 1
              }
            }                        
          ))
        }
        else if(item?.type === 'activity' && item?.read === false) {
          setUnread((prevRead) =>( 
            {
              ...prevRead,
              activity: {
                unReadActivity: prevRead.activity?.unReadActivity + 1
              }
            }                        
          ))
        }        
      }
    })
  }
  useEffect(() => {
    FilterNotification(notifications[0].param)
    filterUnread(notifications[0].param)
  }, [])
  useEffect(() => {
    filterUnread(notifications[2].param)
  }, [])
  useEffect(() => {
    filterUnread(notifications[1].param)
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUnread(true);
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-[#FFFFFF]">
      <div
        className={`sm:absolute z-[555]  mt-2.5 flex h-96 max-h-90 sm:w-5/12 flex-col rounded-sm bg-white shadow-default dark:bg-black sm:right-0 absolute`}
      >
        <div className="px-4 py-4 text-[12px] font-bold flex items-center justify-between">
          {
            notifications.map((item, index) => (
              <p key={index} onClick={() => (FilterNotification(item.param), setNotificationType(item))} className={`${notificationType.label === item.label ? 'text-secondary border-b-[1px] border-solid border-[#FF6DFB] ' : 'text-black dark:text-white'} pb-2`}>
                {item.label} <span className="absolute text-[10px] text-black dark:text-white">
                    { showUnread ? 
                      item.param === 'notification' && unread.notification?.unReadNotification ||
                      item.param === 'message' && unread.message?.unReadMessage ||
                      item.param === 'activity' && unread.activity?.unReadActivity : ''
                    }
                  </span></p>
            ))
          }
        </div>

        <ul className="flex h-auto flex-col gap-y-2 overflow-y-auto px-2">
        {
             isLoading ? 
             <div className='w-full flex justify-center'>
                <Loader /> 
             </div>
             :  notificationData?.map((item, index) => (
                          <li key={index} className={`flex flex-col gap-2.5 pl-2 py-4 text-black ${item?.read === false ? 'dark:bg-[#2F2F2F] dark:text-white bg-[#FF6DFB] bg-opacity-20' : ''} hover:bg-gray-2 dark:hover:bg-meta-4`}>
                            <p className="text-[14px] w-11/12 font-semibold font-RedHat dark:text-[#FFFFFF]">
                                {item?.body}
                            </p>            
                            <p className="text-xs dark:text-[#FFFFFF]">{format(new Date(item?.updated_at), 'dd-MM-yyyy')}</p>                     
                        </li>
                        ))
                    }   
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;
