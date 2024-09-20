/* eslint-disable react/prop-types */
import { Modal, ModalContent, Button } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDeleteAcc } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'
import toast from 'react-hot-toast'
import Loader from '../../pages/Loader'

export default function DeleteAccountModal({ isOpen, onClose }) {
  const { mutateAsync: deleteAcc, isPending } = useDeleteAcc()
  const navigate = useNavigate()
  const { removeAccessToken, token } = useAccessToken()

  const handleDelAcc = async () => {
    try {
      const res = await deleteAcc({ access_token: token })
      if (res.data.status) {
        removeAccessToken(null)
        toast.success(res.data.message)
        navigate('/')
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
        className='rounded-none w-[23rem] md:w-[28rem]'
        hideCloseButton={true}
      >
        <ModalContent className='overflow-visible '>
          <div className=' p-12 rounded flex-col justify-center items-center gap-6 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 bg-primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='flex-col justify-center items-center gap-3 flex'>
              <div className=" text-2xl font-bold font-['Manrope']">
                Delete Account
              </div>
              <div className=" text-center text-xs font-normal font-['Manrope']">
                Are you sure you want to delete your account,? By pressing this
                button you no longer have an account on MacketIT.
              </div>
            </div>
            <Button
              onClick={() => {
                handleDelAcc()
              }}
              isDisabled={isPending}
              className='w-[290px] px-6 py-6 bg-[#FF3D00] rounded-[100px] justify-center items-center gap-2 inline-flex'
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
