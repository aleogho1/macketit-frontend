/* eslint-disable no-irregular-whitespace */
import { Button, Input } from '@nextui-org/react'

import Logo from '../Logo'
import { ChevronRight, EyeIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useResetPassword } from '../../api/auth'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

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
            <div className='hidden xl:block left-0 top-0 absolute'>
              <div className='w-40 h-40 md:w-unit-8xl md:h-unit-8xl left-0 top-0 absolute opacity-30 md:opacity-10 bg-violet-500 rounded-full blur-3xl z-10 ' />
              <div className='w-40 h-40 md:w-unit-8xl md:h-unit-8xl left-[13rem] md:left-[942.84px] top-[30rem] md:top-[427.55px] absolute opacity-20 md:opacity-10 bg-fuchsia-600 rounded-full blur-3xl z-10' />
            </div>
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
                <div className="w-full text-center text-[64px] font-semibold font-['Manrope'] leading-[53.76px]">
                  Create New Password
                </div>
                <div className="w-80 text-center text-zinc-400 text-base font-normal font-['Manrope']">
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
                          'focus-within:!border-fuchsia-600  ',
                          '!cursor-text',
                        ],
                      }}
                      className="grow shrink basis-0  rounded text-stone-900 text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
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
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='15'
                              viewBox='0 0 14 15'
                              fill='none'
                            >
                              <path
                                d='M12.4067 5.85509C12.2375 5.58676 12.0567 5.33592 11.87 5.10259C11.6542 4.82842 11.2459 4.80509 11.0009 5.05009L9.25086 6.80009C9.3792 7.18509 9.40253 7.62842 9.28586 8.08926C9.0817 8.91176 8.4167 9.57676 7.5942 9.78092C7.13336 9.89759 6.69003 9.87426 6.30503 9.74592C6.30503 9.74592 5.47086 10.5801 4.87003 11.1809C4.57836 11.4726 4.6717 11.9859 5.06253 12.1376C5.6867 12.3768 6.3342 12.4993 6.9992 12.4993C8.03753 12.4993 9.0467 12.1959 9.96836 11.6301C10.9075 11.0468 11.7534 10.1893 12.4359 9.09842C12.99 8.21759 12.9609 6.73592 12.4067 5.85509Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M8.1787 6.32179L5.82203 8.67845C5.52453 8.37512 5.33203 7.95512 5.33203 7.50012C5.33203 6.58429 6.0787 5.83179 7.00036 5.83179C7.45536 5.83179 7.87536 6.02429 8.1787 6.32179Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M10.6471 3.85407L8.66963 5.83157C8.2438 5.3999 7.65464 5.14323 7.0013 5.14323C5.69464 5.14323 4.64464 6.19907 4.64464 7.4999C4.64464 8.15323 4.90714 8.7424 5.33297 9.16823L3.3613 11.1457H3.35547C2.70797 10.6207 2.11297 9.9499 1.60547 9.15657C1.02214 8.24073 1.02214 6.75323 1.60547 5.8374C2.28214 4.77573 3.11047 3.94157 4.03214 3.3699C4.9538 2.8099 5.96297 2.50073 7.0013 2.50073C8.30214 2.50073 9.56214 2.97907 10.6471 3.85407Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M8.66984 7.50005C8.66984 8.41588 7.92318 9.16838 7.00151 9.16838C6.96651 9.16838 6.93734 9.16838 6.90234 9.15671L8.65818 7.40088C8.66984 7.43588 8.66984 7.46505 8.66984 7.50005Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M12.6976 1.80093C12.5226 1.62593 12.2367 1.62593 12.0617 1.80093L1.29922 12.5693C1.12422 12.7443 1.12422 13.0301 1.29922 13.2051C1.38672 13.2868 1.49755 13.3334 1.61422 13.3334C1.73089 13.3334 1.84172 13.2868 1.92922 13.1993L12.6976 2.43093C12.8784 2.25593 12.8784 1.97593 12.6976 1.80093Z'
                                fill='#B1B1B1'
                              />
                            </svg>
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
                          'focus-within:!border-fuchsia-600  ',
                          '!cursor-text',
                        ],
                      }}
                      className="grow shrink basis-0 rounded text-stone-900 text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
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
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='15'
                              viewBox='0 0 14 15'
                              fill='none'
                            >
                              <path
                                d='M12.4067 5.85509C12.2375 5.58676 12.0567 5.33592 11.87 5.10259C11.6542 4.82842 11.2459 4.80509 11.0009 5.05009L9.25086 6.80009C9.3792 7.18509 9.40253 7.62842 9.28586 8.08926C9.0817 8.91176 8.4167 9.57676 7.5942 9.78092C7.13336 9.89759 6.69003 9.87426 6.30503 9.74592C6.30503 9.74592 5.47086 10.5801 4.87003 11.1809C4.57836 11.4726 4.6717 11.9859 5.06253 12.1376C5.6867 12.3768 6.3342 12.4993 6.9992 12.4993C8.03753 12.4993 9.0467 12.1959 9.96836 11.6301C10.9075 11.0468 11.7534 10.1893 12.4359 9.09842C12.99 8.21759 12.9609 6.73592 12.4067 5.85509Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M8.1787 6.32179L5.82203 8.67845C5.52453 8.37512 5.33203 7.95512 5.33203 7.50012C5.33203 6.58429 6.0787 5.83179 7.00036 5.83179C7.45536 5.83179 7.87536 6.02429 8.1787 6.32179Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M10.6471 3.85407L8.66963 5.83157C8.2438 5.3999 7.65464 5.14323 7.0013 5.14323C5.69464 5.14323 4.64464 6.19907 4.64464 7.4999C4.64464 8.15323 4.90714 8.7424 5.33297 9.16823L3.3613 11.1457H3.35547C2.70797 10.6207 2.11297 9.9499 1.60547 9.15657C1.02214 8.24073 1.02214 6.75323 1.60547 5.8374C2.28214 4.77573 3.11047 3.94157 4.03214 3.3699C4.9538 2.8099 5.96297 2.50073 7.0013 2.50073C8.30214 2.50073 9.56214 2.97907 10.6471 3.85407Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M8.66984 7.50005C8.66984 8.41588 7.92318 9.16838 7.00151 9.16838C6.96651 9.16838 6.93734 9.16838 6.90234 9.15671L8.65818 7.40088C8.66984 7.43588 8.66984 7.46505 8.66984 7.50005Z'
                                fill='#B1B1B1'
                              />
                              <path
                                d='M12.6976 1.80093C12.5226 1.62593 12.2367 1.62593 12.0617 1.80093L1.29922 12.5693C1.12422 12.7443 1.12422 13.0301 1.29922 13.2051C1.38672 13.2868 1.49755 13.3334 1.61422 13.3334C1.73089 13.3334 1.84172 13.2868 1.92922 13.1993L12.6976 2.43093C12.8784 2.25593 12.8784 1.97593 12.6976 1.80093Z'
                                fill='#B1B1B1'
                              />
                            </svg>
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
                  className="w-[290px] px-6 py-3.5 mt-4 bg-fuchsia-600 rounded-[100px] text-center text-white text-[12.83px] font-medium font-['Manrope']"
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
                  className="text-center cursor-pointer py-6 text-[#CB29BE] text-xs font-normal font-['Manrope'] tracking-wide"
                >
                  Back to Home
                </div>
              </div>
            </div>

            <div className='w-[24rem] mx-auto mt-16'>
              <div className='w-full h-0.5 bg-gradient-to-r from-[#fff]  dark:from-[#000] !via-[#FF6DFB] to-[#fff] dark:to-[#000]'></div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
