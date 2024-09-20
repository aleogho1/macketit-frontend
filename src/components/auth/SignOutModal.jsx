/* eslint-disable react/prop-types */
import { Modal, ModalContent, Button } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useLogoutUser } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'
import toast from 'react-hot-toast'
import Loader from '../../pages/Loader'

export default function SignOutModal({ isOpen, onClose }) {
  const { mutateAsync: logout, isPending } = useLogoutUser()
  const navigate = useNavigate()
  const { removeAccessToken, token } = useAccessToken()
  const handleLogout = async () => {
    try {
      const res = await logout({ access_token: token })
      if (res.data.status) {
        removeAccessToken(null)
        toast.success(res.data.message)
        navigate('/login')
        // localStorage.removeItem('appearance')
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }
  return (
    <>
      <Modal
        placement='center'
        size='md'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className='rounded-none '
      >
        <ModalContent className=' overflow-visible '>
          <div className=' p-12 rounded flex-col justify-center items-center gap-6 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 primaryBg top-[-20px] -right-4 absolute z-40 cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='flex-col justify-center items-center gap-3 flex'>
              <div className=" text-2xl font-bold font-['Manrope']">
                Sign out?
              </div>
              <div className=" text-center text-xs font-normal font-['Manrope']">
                Are you sure you want to sign out?
              </div>
            </div>
            <Button
              onClick={() => {
                handleLogout()
              }}
              isDisabled={isPending}
              className='w-[290px] px-6 py-6 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
            >
              <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                {isPending ? <Loader /> : 'Proceed'}
              </div>
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
