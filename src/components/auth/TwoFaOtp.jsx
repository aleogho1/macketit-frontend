import { Button } from '@nextui-org/react'
import Logo from '../Logo'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { useVerify2Fa } from '../../api/auth'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import useCurrentUser from '../../hooks/useCurrentUser'
import OtpPinInput from './OtpPinInput'
import useAccessToken from '../../hooks/useAccessToken'

export default function TwoFaOtp() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm()
  const { mutateAsync: verify2fa } = useVerify2Fa()
  const navigate = useNavigate()

  const { setAccessToken, token } = useAccessToken()
  const { setCurrentUser } = useCurrentUser()

  const onSubmit = async () => {
    try {
      const entered_code = parseInt(watch().entered_code)
      const res = await verify2fa({
        data: { entered_code, two_fa_token: token },
      })
      if (res.data.status) {
        setAccessToken(res?.data?.access_token)
        setCurrentUser(res.data.user_data)
        toast.success(res.data.message)
        navigate('/dashboard/home')
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    if (watch().entered_code?.length === 6) onSubmit()
  }, [watch().entered_code])

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
                2FA Check
              </div>
              <div className="w-80 mb-4 text-center text-zinc-400 text-base font-normal font-['Manrope']">
                A code has been sent to your prefered method, please enter it
                below to verify your MacketIT account.
              </div>
            </div>
            <div className=' w-[80%] md:w-full mx-auto  flex-col justify-start items-center gap-3.5 flex'>
              <div className='self-stretch justify-center items-center gap-3.5 flex'>
                <Controller
                  control={control}
                  name='entered_code'
                  rules={{
                    required: 'OTP is required',
                    minLength: {
                      value: 6,
                      message: 'OTP should have only 6 characters',
                    },
                  }}
                  render={({ field }) => (
                    <OtpPinInput
                      native
                      length={6}
                      ref={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors?.entered_code?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
