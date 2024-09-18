import { Button, Input } from '@nextui-org/react'
import Logo from '../Logo'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { useVerifyEmailOtp, useVerifyEmailResendOtp } from '../../api/auth'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import useSignUpToken from '../../hooks/useSignUpToken'
import useCurrentUser from '../../hooks/useCurrentUser'
import OtpPinInput from './OtpPinInput'

export default function ConfirmOtp() {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm()
  const { mutateAsync: verifyUserEmail } = useVerifyEmailOtp()
  const { mutateAsync: resendOtp } = useVerifyEmailResendOtp()
  const navigate = useNavigate()

  // const [otp, setOtp] = useState(['', '', '', '', '', '']) // Array to store OTP digits
  // const otp2 = useRef()
  const { token } = useSignUpToken()
  const { setCurrentUser, userData } = useCurrentUser()
  const [currentMail, setCurrentMail] = useState()

  // const handleOtpChange = (index, value) => {
  //   const updatedOtp = [...otp]
  //   updatedOtp[index] = value
  //   setOtp(updatedOtp)
  //   // If all OTP digits are entered, submit the form
  //   if (updatedOtp.filter((digit) => digit !== '').length === 6) {
  //     otp2.current = updatedOtp
  //     onSubmit()
  //   }
  // }

  const onSubmit = async () => {
    try {
      // const code = otp2.current.join('')
      // const entered_code = parseInt(code)
      const otp = watch('otp')
      const entered_code = Number(otp)
      // const entered_code = parseInt(watch().entered_code)
      const res = await verifyUserEmail({
        data: { entered_code, signup_token: token },
      })
      if (res.data.status) {
        setCurrentUser(res.data.user_data)
        sessionStorage.removeItem('verify-email')
        toast.success(res.data.message)
        navigate('/signup')
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
      console.error(error)
    }
  }
  const handleResendOtp = async () => {
    toast.success('Requesting for new OTP')
    try {
      const res = await resendOtp({
        data: { signup_token: token },
      })
      if (res.data.status) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    setCurrentMail(sessionStorage.getItem('verify-email'))
    if (watch().otp?.length === 6) onSubmit()
  }, [watch().otp])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' min-h-screen md:h-[1024px] relative  overflow-x-clip'>
          <div className='w-[96%]  md:w-[90%] mx-auto max-h-[6rem] flex justify-between items-center'>
            <Logo />

            <div className="text-center p-2 hidden  md:flex  text-[12.83px] font-bold font-['Manrope']">
              <Button onClick={() => navigate(-1)} variant='flat bg-none '>
                Go Back
              </Button>
              <div className="text-center p-2 md:hidden   text-[12.83px] font-bold font-['Manrope']">
                <Button variant='flat bg-none  '>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
          <div className='  w-[23rem]  mx-auto my-32 flex-col justify-start items-center gap-6'>
            <div className='self-stretch  flex-col justify-start items-center gap-6 flex'>
              <div className="w-80 text-center text-[32px] font-semibold font-['Manrope'] leading-[26.88px]">
                Confirm your email
              </div>
              <div className="w-80 mb-4 text-center text-zinc-400 text-base font-normal font-['Manrope']">
                We have sent an email with a code to{' '}
                {currentMail ? currentMail : userData?.email}, please enter it
                below to create your MacketIT account.
              </div>
            </div>
            <div className=' w-[80%] md:w-full mx-auto  flex-col justify-start items-center gap-3.5 flex'>
              <div className='self-stretch justify-center items-center gap-3.5 flex'>
                <Input
                  type='number'
                  errorMessage={errors?.otp?.message}
                  {...register('otp', {
                    required: {
                      value: true,
                      message: 'OTP is required',
                    },
                    minLength: {
                      value: 6,
                      message: 'OTP should have only 6 characters',
                    },
                    maxLength: {
                      value: 6,
                      message: 'OTP should have only 6 characters',
                    },
                  })}
                  placeholder='Enter OTP'
                />
              </div>
              <div className='justify-start items-center inline-flex my-12'>
                <div className="text-center text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
                  Didn’t receive a code?
                </div>
                <div className='p-2 justify-center items-center gap-1 flex'>
                  <div
                    onClick={() => {
                      handleResendOtp()
                    }}
                    className="text-center cursor-pointer text-primaryText   text-[12.83px] font-bold font-['Manrope']"
                  >
                    Send new code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
