/* eslint-disable no-irregular-whitespace */
import { Button, Input } from '@nextui-org/react'

import Logo from '../Logo'
// import { ChevronRight } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useGoogleSignu, useVerifyEmail } from '../../api/auth'
import toast from 'react-hot-toast'
import useSignUpToken from '../../hooks/useSignUpToken'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'
import Loader from '../../pages/Loader'

export default function VerifyEmail() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm()
  const { mutateAsync: verifyUserEmail, isPending } = useVerifyEmail()
  const { mutateAsync: handleGoogleLogin, isPending: loadingAuth } =
    useGoogleSignu()
  const [searchParams] = useSearchParams()
  const { setAccessToken } = useAccessToken()

  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const referral_code = params.get('referral')
  useEffect(() => {
    referral_code !== null ? setValue('referral_code', referral_code) : ''
  }, [])
  const { setSignUpToken } = useSignUpToken()

  const onSubmit = async (data) => {
    try {
      const res = await verifyUserEmail({ data })
      if (res.data.status) {
        setSignUpToken(res.data.signup_token)
        toast.success(res.data.message)
        navigate('/confirm-otp')
        sessionStorage.setItem('verify-email', data?.email)
        reset()
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }
  const handleGgLogin = async () => {
    try {
      const res = await handleGoogleLogin()
      if (res?.data?.status) {
        window.location.href = res?.data?.authorization_url
        setSignUpToken(res?.data?.access_token)
        toast.success(res.data.message)
        // navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  const access_token = searchParams.get('access_token')
  const access_error = searchParams.get('error')

  useEffect(() => {
    // Retrieve the trxref from the URL
    if (access_error) {
      toast.error(access_error, {
        duration: 2000,
      })
    }
    if (access_token) {
      try {
        // Use the retrieved trxref to call verifyPayment
        setAccessToken(access_token)
        navigate('/dashboard/settings')

        // You can perform further actions after successful verification
      } catch (error) {
        console.error({ error })
        // Handle error if verification fails
      }
    } else {
      console.error('access_token not found in URL.')
      // Handle case when access_token is not found in the URL
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' min-h-screen md:h-[1024px] py-6 relative'>
          <div className='w-[96%]  md:w-[90%] mx-auto max-h-[6rem] flex justify-between items-center'>
            <Logo />
          </div>

          <div className=' w-[20rem] my-8 md:w-[23rem] mx-auto  flex-col  items-center gap-6 '>
            <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
              <div className="w-80 text-center text-primaryText  text-[40px] md:text-[64px] font-semibold font-['Manrope'] leading-10 md:leading-[53.76px]">
                Welcome to MacketIT
              </div>
              <div className="w-[18rem] py-2 text-center  text-black  text-base font-normal font-['Manrope']">
                Turn Daily Tasks into Payslip! Get Paid for your Time.
              </div>
            </div>
            <div className='self-stretch  flex-col justify-start items-center gap-3 flex'>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size='sm'
                    placeholder='Enter a valid email'
                    className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                    errorMessage={errors?.email?.message}
                    isInvalid={!!errors?.email}
                    required={true}
                    classNames={{
                      inputWrapper: [
                        'border-2 border-transparent',
                        'focus-within:!border-red-500  ',
                        '!cursor-text',
                        'bg-zinc-700 bg-opacity-10',
                      ],
                    }}
                  />
                )}
                rules={{
                  required: true,
                  pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message: 'Invalid email',
                  },
                }}
              />
              <div className='flex items-center w-full pr-2'>
                <Controller
                  name='referral_code'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='sm'
                      placeholder='Enter referral code'
                      className="grow shrink basis-0 -mr-[58px]  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                      errorMessage={errors?.referral_code?.message}
                      isInvalid={!!errors?.referral_code}
                      classNames={{
                        inputWrapper: [
                          'border-2 border-transparent',
                          'focus-within:!border-red-500  ',
                          '!cursor-text',
                          'bg-zinc-700 bg-opacity-10',
                        ],
                      }}
                    />
                  )}
                />
                <span className='z-10 text-[12px]'>Optional</span>
              </div>
              <Button
                type='submit'
                className="w-[290px] px-6 py-3.5 bg-primarybutton rounded-[100px] text-center text-white text-[12.83px] font-medium font-['Manrope']"
              >
                {isPending ? <Loader /> : 'Proceed'}
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
                <div className="text-center py-6 text-[#B1B1B1] dark:text-zinc-400 text-xs font-normal font-['Manrope'] tracking-wide">
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
                  className="p-2 bg-[#B0B0B0] rounded dark:bg-white text-center  text-black dark:text-zinc-400 text-[12.83px] font-bold font-['Manrope'] bg-opacity-10 border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex"
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
                  {loadingAuth ? <Loader /> : 'Sign up with Google'}
                </Button>
              </div>
            </div>
          </div>

          <div className=' w-[18rem] flex justify-center mx-auto  items-center mt-24 z-20'>
            <div className="text-center text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
              Already have an account?
            </div>
            <div className='p-2 justify-center items-center gap-1 flex'>
              <div
                onClick={() => {
                  navigate('/login')
                  console.log(10)
                }}
                className="text-center cursor-pointer z-20 text-primaryText  text-[12.83px] font-bold font-['Manrope']"
              >
                Sign in
              </div>
            </div>
          </div>
          <div className='w-[24rem] mx-auto my-4'>
            <div className=' flex p-2 bordert border[#CB29BE]  justify-center items-center'>
              <div className="text-center cursor-pointer text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
                By signing up, you agree to our
              </div>
              <a
                href='https://MacketIT3.com/privacy-policy'
                target='_blank'
                className='p-2 justify-center items-center gap-1 flex py-3'
                rel='noreferrer'
                // onClick={() => navigate('/terms')}
              >
                <span className="text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
                  {' '}
                </span>
                <span className="text-black text-[12.83px] font-bold font-['Manrope']">
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
