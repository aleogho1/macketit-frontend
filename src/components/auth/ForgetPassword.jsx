/* eslint-disable no-irregular-whitespace */
import { Button, Input, useDisclosure } from '@nextui-org/react'

import Logo from '../Logo'
import { ChevronRight } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useForgetPassword } from '../../api/auth'
import toast from 'react-hot-toast'
import ConfirmPasswordResetModal from './ConfirmPasswordResetModal'
import useResetToken from '../../hooks/useResetToken'

export default function ForgetPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const { mutateAsync: handleLogin, isPending } = useForgetPassword()
  const { setResetToken } = useResetToken()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = async (data) => {
    try {
      const res = await handleLogin({
        data,
      })
      if (res?.data?.status) {
        setResetToken(res?.data?.reset_token)
        toast.success(res.data.message)
        onOpen()
        // setTimeout(() => {
        //   navigate('/reset_password')
        // }, 3000)
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='min-h-screen  md:h-[1024px] py-6 relative '>
            <div className='w-[96%]  md:w-[90%] mx-auto max-h-[6rem] flex justify-between items-center'>
              <Logo />

              <div className="text-center text-primaryText p-2 hidden  md:flex text-[12.83px] font-bold font-['Manrope']">
                <Button onClick={() => navigate(-1)} variant='flat bg-none'>
                  Go Back
                </Button>
              </div>
              <div className="text-center p-2 md:hidden text-primaryText  text-[12.83px] font-bold font-['Manrope']">
                <Button variant='flat bg-none  '>
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <div className=' w-[20rem] my-8 md:w-[23rem] mx-auto  flex-col  items-center gap-6 '>
              <div className='self-stretch my-2 flex-col justify-start items-center gap-3 flex'>
                <div className="w-full text-center  text-primaryText text-[64px] font-semibold font-['Manrope'] leading-[53.76px]">
                  Reset Your Password
                </div>
                <div className="w-80 text-center text-zinc-400 text-base font-normal font-['Manrope']">
                  Please enter your MacketIT email address, as instructions
                  would be sent to help reset your password
                </div>
              </div>
              <div className='self-stretch  flex-col justify-start items-center gap-3 flex'>
                <Controller
                  name='email_username'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='sm'
                      type='email'
                      errorMessage={errors?.email_username?.message}
                      isInvalid={!!errors?.email_username}
                      required={true}
                      classNames={{
                        inputWrapper: [
                          'border-2 border-transparent',
                          'focus-within:!border-red-500  ',
                          '!cursor-text',
                        ],
                      }}
                      placeholder='Enter a valid email'
                      className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                    />
                  )}
                  rules={{ required: true }}
                />

                <Button
                  type='submit'
                  isDisabled={isPending}
                  className="w-[290px] px-6 py-3.5 mt-4 bg-primarybutton rounded-[100px] text-center text-white text-[12.83px] font-medium font-['Manrope']"
                >
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
                </Button>
              </div>
              <div className='self-stretch mt-16 flex-col justify-start items-center gap-2 flex'>
                <div
                  onClick={() => navigate('/')}
                  className="text-center cursor-pointer py-6 text-primaryText text-xs font-normal font-['Manrope'] tracking-wide"
                >
                  Back to Home
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <ConfirmPasswordResetModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
