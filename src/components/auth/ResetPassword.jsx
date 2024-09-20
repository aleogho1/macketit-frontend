/* eslint-disable no-irregular-whitespace */
import { Button, Input } from '@nextui-org/react'

import Logo from '../Logo'
import { ChevronRight, EyeIcon, EyeOffIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useResetPassword } from '../../api/auth'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import Loader from '../../pages/Loader'

export default function ResetPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm()
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleVisibility2 = () => setIsVisible2(!isVisible2)
  const { mutateAsync: handleResetPassword, isPending } = useResetPassword()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const token_code = params.get('token')

  const new_password = watch('new_password')
  const confirm_password = watch('confirm_password')
  const validatePassword = (value) => {
    const hasNumber = /[0-9]/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}_-|<>]/.test(value)
    return (hasNumber && hasSpecialChar) || ''
  }

  const onSubmit = async (data) => {
    try {
      if (new_password !== confirm_password) {
        toast.error('Passwords do not match', { duration: 3000 })
        return
      }
      const res = await handleResetPassword({
        data: { ...data, reset_token: token_code },
      })
      if (res?.data?.status) {
        toast.success(res.data.message)
        console.log(res)
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' min-h-screen md:h-[1024px] py-6 relative '>
            <div className='w-[96%]  md:w-[90%] mx-auto max-h-[6rem] flex justify-between items-center'>
              <Logo />

              <div className="text-center p-2 hidden  md:flex  text-[12.83px] font-bold font-['Manrope']">
                <Button onClick={() => navigate(-1)} variant='flat bg-none'>
                  Go Back
                </Button>
              </div>
              <div className="text-center p-2 md:hidden   text-[12.83px] font-bold font-['Manrope']">
                <Button variant='flat bg-none  '>
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <div className=' w-[20rem] my-8 md:w-[23rem] mx-auto  flex-col  items-center gap-6 '>
              <div className='self-stretch my-2 flex-col justify-start items-center gap-3 flex'>
                <div className="w-full text-primaryText text-center text-[64px] font-semibold font-['Manrope'] leading-[53.76px]">
                  Create New Password
                </div>
                <div className="w-80 text-center text-black text-base font-normal font-['Manrope']">
                  Your new password must be different from the previous used
                  password
                </div>
              </div>
              <div className='self-stretch  flex-col justify-start items-center gap-3 flex'>
                <Controller
                  name='new_password'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='md'
                      label='Create password'
                      labelPlacement='outside'
                      errorMessage={errors?.new_password?.message}
                      isInvalid={!!errors?.new_password}
                      required={true}
                      placeholder='Enter a password'
                      classNames={{
                        inputWrapper: [
                          'rounded-none py-2',
                          'border-2 border-transparent',
                          'focus-within:!border-red-500  ',
                          '!cursor-text',
                          'bg-zinc-700 bg-opacity-10',
                        ],
                      }}
                      className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                      endContent={
                        <button
                          className='focus:outline-none'
                          type='button'
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeIcon
                              size={20}
                              className='text-2xl text-[#B1B1B1] pointer-events-none'
                            />
                          ) : (
                            <EyeOffIcon
                              size={20}
                              className='text-2xl text-[#B1B1B1] pointer-events-none'
                            />
                          )}
                        </button>
                      }
                      type={isVisible ? 'text' : 'Password'}
                    />
                  )}
                  rules={{
                    minLength: {
                      value: 8,
                      message: '( Min 8characters with a letter and a number)',
                    },
                    required: true,
                    validate: validatePassword,
                  }}
                />
                <Controller
                  name='confirm_password'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='md'
                      errorMessage={errors?.confirm_password?.message}
                      isInvalid={!!errors?.confirm_password}
                      required={true}
                      label='Confirm password'
                      labelPlacement='outside'
                      placeholder='Confirm password'
                      classNames={{
                        inputWrapper: [
                          'rounded-none py-2',
                          'border-2 border-transparent',
                          'focus-within:!border-red-500  ',
                          '!cursor-text',
                          'bg-zinc-700 bg-opacity-10',
                        ],
                      }}
                      className="grow shrink basis-0 rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                      endContent={
                        <button
                          className='focus:outline-none'
                          type='button'
                          onClick={toggleVisibility2}
                        >
                          {isVisible2 ? (
                            <EyeIcon
                              size={20}
                              className='text-2xl text-[#B1B1B1] pointer-events-none'
                            />
                          ) : (
                            <EyeOffIcon
                              size={20}
                              className='text-2xl text-[#B1B1B1] pointer-events-none'
                            />
                          )}
                        </button>
                      }
                      type={isVisible2 ? 'text' : 'Password'}
                    />
                  )}
                  rules={{
                    minLength: {
                      value: 8,
                      message: '( Min 8characters with a letter and a number)',
                    },
                    required: true,
                    validate: validatePassword,
                  }}
                />
                <Button
                  type='submit'
                  className="w-[290px] px-6 py-3.5 mt-4 bg-primarybutton rounded-[100px] text-center text-white text-[12.83px] font-medium font-['Manrope']"
                >
                  {isPending ? <Loader /> : 'Proceed'}
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
    </>
  )
}
