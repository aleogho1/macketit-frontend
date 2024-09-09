/* eslint-disable no-irregular-whitespace */
import { Button, Input } from '@nextui-org/react'

import Logo from '../Logo'
import { ChevronRight, EyeIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useGoogleLogin, useLoginUser } from '../../api/auth'
import toast from 'react-hot-toast'
import useAccessToken from '../../hooks/useAccessToken'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../pages/Loader'

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const { mutateAsync: handleLogin, isPending } = useLoginUser()
  const { mutateAsync: handleGoogleLogin, isPending: loadingAuth } =
    useGoogleLogin()
  // const { mutateAsync: handleFbLogin, isPending: isPendingFb } =
  //   useFacebookLogin()
  const [searchParams] = useSearchParams()

  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    setFocus('email_username')
  }, [setFocus])

  const { setAccessToken } = useAccessToken()

  const onSubmit = async (data) => {
    try {
      const res = await handleLogin({ data })

      if (res?.data?.status) {
        if (res?.data?.two_fa_token) {
          setAccessToken(res?.data?.two_fa_token)
          toast.success(res.data.message)
          navigate('/login/2fa_auth')
        } else {
          setAccessToken(res?.data?.access_token)
          toast.success(res.data.message)
          navigate('/dashboard/home')
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }
  // social logins
  // const handleFaceBookLogin = async () => {
  //   try {
  //     const res = await handleFbLogin()
  //     if (res?.data?.status) {
  //       window.open(res?.data?.authorization_url)
  //       setAccessToken(res?.data?.access_token)
  //       toast.success(res.data.message)
  //       // navigate('/dashboard')
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.message ?? error.message)
  //   }
  // }
  const handleGgLogin = async () => {
    try {
      const res = await handleGoogleLogin()
      if (res?.data?.status) {
        window.location.href = res?.data?.authorization_url
        setAccessToken(res?.data?.access_token)
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.message ?? error.message)
    }
  }

  const access_token = searchParams.get('access_token')
  const access_error = searchParams.get('error')

  useEffect(() => {
    // Retrieve the trxref from the URL
    if (access_error) {
      toast.error(access_error, {
        duration: 20000,
      })
    }
    if (access_token) {
      try {
        // Use the retrieved trxref to call verifyPayment
        setAccessToken(access_token)
        navigate('/dashboard/home')

        // You can perform further actions after successful verification
      } catch (error) {
        console.error('Error verifying user:', error)
        // Handle error if verification fails
      }
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='min-h-screen  md:h-[1024px] py-6 relative'>
          <div className='hidden xl:block left-0 top-0 absolute z-0'>
            <div className='w-40 h-40 md:w-unit-8xl md:h-unit-8xl left-0 top-0 absolute opacity-30 md:opacity-10 bg-violet-500 rounded-full blur-3xl z-0 ' />
            <div className='w-40 h-40 md:w-unit-8xl md:h-unit-8xl left-[13rem] md:left-[942.84px] top-[30rem] md:top-[427.55px] absolute opacity-20 md:opacity-10 bg-fuchsia-600 rounded-full blur-3xl z-0' />
          </div>
          <div className='w-[96%]  md:w-[90%] mx-auto max-h-[6rem] flex justify-between items-center'>
            <Logo />

            <div className="text-center p-2 hidden  md:flex text-[12.83px] font-bold font-['Manrope']">
              <Button onClick={() => navigate(-1)} variant='flat bg-none'>
                Go Back
              </Button>
            </div>
            <div className="text-center p-2 md:hidden  text-[12.83px] font-bold font-['Manrope']">
              <Button variant='flat bg-none  '>
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className=' w-[20rem] my-8 md:w-[23rem] mx-auto  flex-col  items-center gap-6 '>
            <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
              <div className="w-80 text-center  text-[64px] font-semibold font-['Manrope'] leading-[53.76px]">
                Welcome Back
              </div>
              <div className="w-[273px] pb-4 text-center text-zinc-400 text-base font-normal font-['Manrope']">
                Turn Daily Social Tasks into Paychecks! Get Paid for your
                Engagements.
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
                    errorMessage={errors?.email_username?.message}
                    isInvalid={!!errors?.email_username}
                    required={true}
                    placeholder='Enter a valid email'
                    type='email'
                    classNames={{
                      inputWrapper: [
                        'border-2 border-transparent',
                        'focus-within:!border-fuchsia-600  ',
                        '!cursor-text',
                      ],
                    }}
                    className={`grow shrink basis-0 focus:ring focus:ring-fuchsia-600 focus:border-2 focus:border-fuchsia-600  rounded text-stone-900 text-opacity-50 text-[16.83px] font-normal font-['Manrope']`}
                  />
                )}
                rules={{
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                }}
              />

              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size='sm'
                    errorMessage={errors?.password?.message}
                    isInvalid={!!errors?.password}
                    required={true}
                    placeholder='Password'
                    className={` grow shrink basis-0  rounded text-stone-900 text-opacity-50 text-[16.83px] font-normal font-['Manrope']`}
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
                    classNames={{
                      inputWrapper: [
                        'border-2 border-transparent',
                        'focus-within:!border-fuchsia-600  ',
                        '!cursor-text',
                      ],
                    }}
                    type={isVisible ? 'text' : 'Password'}
                  />
                )}
                rules={{
                  required: true,
                }}
              />

              <div className='w-full md:w-[365px] h-[15px] flex justify-end itemscenter gap-2'>
                <div
                  onClick={() => navigate('/forgot_password')}
                  className="text-center cursor-pointer text-[12.83px] font-bold font-['Manrope']"
                >
                  Forgot password
                </div>
              </div>
              <Button
                type='submit'
                isDisabled={isPending}
                className="w-[290px] px-6 py-3.5  bg-fuchsia-600 rounded-[100px] text-center text-white text-[16.83px] font-medium font-['Manrope']"
              >
                {isPending ? <Loader /> : 'Continue'}
              </Button>
            </div>
            <div className='self-stretch  flex-col justify-start items-center gap-2 flex'>
              <div className='flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='41'
                  height='2'
                  viewBox='0 0 41 2'
                  fill='none'
                >
                  <path
                    d='M0.5 1H41'
                    stroke='white'
                    strokeOpacity='0.2'
                    strokeWidth='0.5'
                  />
                </svg>
                <div className="text-center py-6 text-zinc-400 text-xs font-normal font-['Manrope'] tracking-wide">
                  OR SIGN UP WITH
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='41'
                  height='2'
                  viewBox='0 0 41 2'
                  fill='none'
                >
                  <path
                    d='M0 1H40.5'
                    stroke='white'
                    strokeOpacity='0.2'
                    strokeWidth='0.5'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-1.5 inline-flex'>
                <Button
                  onClick={handleGgLogin}
                  isDisabled={loadingAuth}
                  className="p-2 bg-[#B0B0B0] rounded dark:bg-white text-center  text-black dark:text-zinc-400 text-[16.83px] font-bold font-['Manrope'] bg-opacity-10 border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex"
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'
                  >
                    <path
                      d='M18.6713 8.36792H18V8.33334H10.5V11.6667H15.2096C14.5225 13.6071 12.6763 15 10.5 15C7.73877 15 5.50002 12.7613 5.50002 10C5.50002 7.23875 7.73877 5 10.5 5C11.7746 5 12.9342 5.48084 13.8171 6.26625L16.1742 3.90917C14.6858 2.52209 12.695 1.66667 10.5 1.66667C5.89794 1.66667 2.16669 5.39792 2.16669 10C2.16669 14.6021 5.89794 18.3333 10.5 18.3333C15.1021 18.3333 18.8333 14.6021 18.8333 10C18.8333 9.44125 18.7758 8.89584 18.6713 8.36792Z'
                      fill='#FFC107'
                    />
                    <path
                      d='M3.1275 6.12126L5.86542 8.12917C6.60625 6.29501 8.40042 5.00001 10.5 5.00001C11.7746 5.00001 12.9342 5.48084 13.8171 6.26626L16.1742 3.90917C14.6858 2.52209 12.695 1.66667 10.5 1.66667C7.29917 1.66667 4.52334 3.47376 3.1275 6.12126Z'
                      fill='#FF3D00'
                    />
                    <path
                      d='M10.5 18.3333C12.6525 18.3333 14.6083 17.5096 16.0871 16.17L13.5079 13.9875C12.6431 14.6452 11.5864 15.0009 10.5 15C8.33249 15 6.49207 13.6179 5.79874 11.6892L3.08124 13.7829C4.4604 16.4817 7.26124 18.3333 10.5 18.3333Z'
                      fill='#4CAF50'
                    />
                    <path
                      d='M18.6712 8.36791H18V8.33333H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.9879L13.5079 13.9871L16.0871 16.1696C15.9046 16.3354 18.8333 14.1667 18.8333 10C18.8333 9.44125 18.7758 8.89583 18.6712 8.36791Z'
                      fill='#1976D2'
                    />
                  </svg>
                  {loadingAuth ? <Loader /> : 'Sign in with Google'}
                </Button>
              </div>
            </div>
          </div>

          <div className=' w-[18rem] flex justify-center mx-auto  items-center mt-24 z-10'>
            <div className="text-center text-zinc-400 text-[16.83px] font-normal font-['Manrope']">
              You don’t have an account?
            </div>
            <div className='p-2 justify-center items-center gap-1 flex'>
              <div
                onClick={() => {
                  navigate('/ ')
                }}
                className="text-center cursor-pointer z-20 text-fuchsia-400 text-[12.83px] font-bold font-['Manrope']"
              >
                Sign Up
              </div>
            </div>
          </div>
          <div className='md:w-[24rem] mx-auto my-4'>
            <div className='w-full h-0.5 bg-gradient-to-r  from-[#fff]  dark:from-[#000] !via-[#FF6DFB] to-[#fff] dark:to-[#000]'></div>
            <div className=' flex flex-col sm:flex-row p-2 bordert border[#CB29BE]  justify-center items-center'>
              <div className="text-center text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
                By signing up, you agree to our
              </div>
              <a
                href='https://trendit3.com/privacy-policy'
                target='_blank'
                rel='noreferrer'
                className='p-2 justify-center items-center gap-1 flex py-3'
              >
                <span className="text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
                  {' '}
                </span>
                <span className="text-[12.83px] font-bold font-['Manrope']">
                  Terms and Privacy Policy
                </span>
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
