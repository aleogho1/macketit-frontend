import Icons from '../../components/Icon'
import { useGetDeleteLinks } from '../../api/verifySocialApi'
import Loader from '../Loader'
import { useDisclosure } from '@nextui-org/react'
import SocialLinkOption from '../components/SocialLinkOption'
import { useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { SocialAccountContext, setSocialAcccountContext } from '../../context/SocialAccount'
import API from '../../services/AxiosInstance'

export default function SocialAccount() {
  const { mutateAsync: deleteLinks} = useGetDeleteLinks()
  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure()
  const [socialLinks, setSocialLinks] = useState()
  const socialAccount = useContext(SocialAccountContext)
  const setAccount = useContext(setSocialAcccountContext)
  
  const GetVerified = () => {
    API.get(`/users/social-profiles`)
    .then((response) => {
      console.log(response)
      setSocialLinks(response.data?.social_profiles)
      setAccount(response.data?.social_profiles)
    })
    .catch((error) => toast.error(error.response?.data?.message ?? error.message))
  }
  const handleDelete = async(platform) => {
    toast.success(`Deleting ${platform} accounts....`)
    try {
      const res = await deleteLinks(platform)
      if(res.data) {
        API.get(`/users/social-profiles`)
        .then((response) => (setAccount(response.data?.social_profiles), setSocialLinks(response.data?.social_profiles),  toast.success(res.data.message)))
        .catch((error) => toast.error(error.response?.data?.message ?? error.message))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)      
    }
  }
  const socialMedia = socialAccount || socialLinks

  useEffect(() => {
    GetVerified()
  }, [])
  
  const openModal = () => {
    onOpenVerify()
  }
  return (
    <>
      <div className='md:px-16'>
        <div className='text-zinc-400 dark:text-white text-sm font-bold font-Manrope'>
          Social Media accounts
        </div>
        {
          socialAccount || socialLinks ? 
        <div className='flex flex-col gap-y-4 mt-8'>
          {socialMedia?.map((social, index) => (
            <div key={index} className='flex items-center lg:items-center lg:flex-row justify-between bg-[#E5E7EB] dark:bg-zinc-700 py-3 px-2'>
             
              <div className='flex items-center gap-x-4'>
                  <Icons type={social?.platform} width={25} height={25}/>                  
                    {social?.link != null ? 
                      <a href={social?.link} target='_blank' className='text-black dark:text-white text-[12px] md:text-[14px]'>{social?.link?.length > 30 ? social?.link?.substring(0, 30) + '(...)' : social?.link  }</a> : (social?.status) 
                    }                  
              </div>
              <p className={`flex items-center justify-between text-[12px] md:text-[14px] font-bold gap-x-2 ${social?.status === 'pending' && 'text-yellow-400' || social?.status === 'verified' && 'text-green-500' || social?.status === 'idle' && 'text-[#FF3D00]' || social?.status === 'rejected' && 'text-[#FF3D00]'}`}>
               {social?.status?.charAt(0).toUpperCase()+social?.status?.slice(1)}
                {
                  social?.status === 'idle' ? '' : 
                    <span onClick={() => handleDelete(social?.platform)}>
                        <Icons type='delete' />
                    </span>
                 }
              </p>
            </div>
          ))}
          <div className='flex items-center gap-x-2 mt-4' onClick={() => openModal()}>
             <Icons type='edit' />
             Add New
           </div>
        </div>
        : <div className='flex items-center w-full'>
         <Loader />
         </div>
        }
      </div>
      {isOpenVerify && (
        <SocialLinkOption isOpen={isOpenVerify}
        onClose={onCloseVerify}/>       
      )}
    </>
  )
}
