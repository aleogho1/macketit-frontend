/* eslint-disable react/prop-types */
import { Modal, ModalContent, Button } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDeleteAcc } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'
import toast from 'react-hot-toast'

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
              className='p-2 bg-fuchsia-400 top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='flex-col justify-center items-center gap-3 flex'>
              <div className=" text-2xl font-bold font-['Manrope']">
                Delete Account
              </div>
              <div className=" text-center text-xs font-normal font-['Manrope']">
                Are you sure you want to delete your account,? By pressing this
                button you no longer have an account on Trendit.
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
                {isPending ? (
                  <svg
                    className='animate-spin h-5 w-5 text-current'
                    fill='none'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      fill='currentColor'
                    />
                  </svg>
                ) : (
                  'Continue'
                )}
              </div>
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
