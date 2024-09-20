import { Button, Input } from '@nextui-org/react'
import Logo from '../Logo'
import { ChevronRight, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRegisterUser } from '../../api/auth'
import useCurrentUser from '../../hooks/useCurrentUser'
import useAccessToken from '../../hooks/useAccessToken'
import API from '../../services/AxiosInstance'
import Loader from '../../pages/Loader'

export default function Signup() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm()
  const { mutateAsync: handleReg, isPending } = useRegisterUser()
  const { userData } = useCurrentUser()
  const toggleVisibility = () => setIsVisible(!isVisible)
  const { setAccessToken } = useAccessToken()
  const [debouncedValue, setDebouncedValue] = useState()
  const [isExist, setExist] = useState()
  const username = watch('username')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(username)
    }, 1000)
    return () => {
      clearTimeout(handler)
    }
  })
  useEffect(() => {
    if (debouncedValue) {
      if (/[a-zA-Z]/.test(debouncedValue) && /[0-9]/.test(debouncedValue)) {
        API.post('/check-username', { username: debouncedValue })
          .then((response) => setExist(response.data?.message))
          .catch((error) =>
            setError('username', {
              type: 'manual',
              message: error?.response?.data?.message,
            })
          )
      } else if (/[a-zA-Z]/.test(debouncedValue)) {
        API.post('/check-username', { username: debouncedValue })
          .then((response) => setExist(response.data?.message))
          .catch((error) =>
            setError('username', {
              type: 'manual',
              message: error?.response?.data?.message,
            })
          )
      } else {
        setError('username', {
          type: 'manual',
          message: 'Numeric username is not allowed',
        })
      }
    }
  }, [debouncedValue])

  const validatePassword = (value) => {
    const hasNumber = /[0-9]/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}_|<>-]/g.test(value)
    if (hasSpecialChar && hasNumber) {
      return true
    }
    return 'Passowrd must contain as least on special character'
  }
  const validateUsername = (value) => {
    const containsLetters = /[a-zA-Z]/.test(value)
    const containsNumbers = /[0-9]/.test(value)
    if (containsLetters) {
      return true
    }
    if (containsLetters && containsNumbers) {
      return true
    }
    return 'Username cannot be Numeric'
  }
  const maxUserName = 16
  const checkUsername = (name) => {
    if (name.length <= maxUserName) {
      setValue('username', name)
    }
  }

  const onSubmit = async (data, e) => {
    e.preventDefault()
    const user_id = userData?.id
    try {
      const res = await handleReg({
        data: { ...data, user_id },
      })
      if (res.data.status) {
        setAccessToken(res?.data?.access_token)
        toast.success(res.data.message)
        navigate('/onboard')
        reset()
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' min-h-screen md:h-[1024px]  relative '>
          <div className=' mx-auto w-[20rem] md:w-[23rem] right-[10%] md:right-[38%] top-[200px] absolute  flex-col justify-start items-center gap-6 inlineflex'>
            <div className='self-stretch flex-col justify-start items-center gap-6 flex'>
              <div className="w-80 text-center  text-[32px] font-semibold font-['Manrope'] leading-[26.88px]">
                Tell us about you
              </div>
              <div className="w-[252px] text-center pt-2 pb-5 text-zinc-400 text-base font-normal font-['Manrope']">
                We need to know a few things to set up your account.
              </div>
            </div>
            <div className='self-stretch  flex-col justify-start items-center gap-3.5 flex'>
              <div className='grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                <div className="text-center px-2  text-[12.83px] font-medium font-['Manrope']">
                  Full Name
                </div>
                <div className='flex gap-2'>
                  <Controller
                    name='firstname'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder='First Name'
                        errorMessage={errors?.firstname?.message}
                        isInvalid={!!errors?.firstname}
                        required={true}
                        classNames={{
                          inputWrapper: [
                            'border-2 border-transparent',
                            'focus-within:!border-red-500  ',
                            '!cursor-text',
                            'bg-zinc-700 bg-opacity-10',
                          ],
                        }}
                        className="grow shrink basis-0 text-primaryText  rounded-none text-opacity-50 text-[16.83px] font-normal font-['Manrope']"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name='lastname'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        errorMessage={errors?.lastname?.message}
                        isInvalid={!!errors?.lastname}
                        required={true}
                        classNames={{
                          inputWrapper: [
                            'border-2 border-transparent',
                            'focus-within:!border-red-500  ',
                            '!cursor-text',
                            'bg-zinc-700 bg-opacity-10',
                          ],
                        }}
                        placeholder='Last Name'
                        className="grow shrink basis-0 text-primaryText  rounded text-opacity-50 text-[16.83px] font-normal font-['Manrope']"
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
              </div>
              <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                <label className="text-center px-2  text-[12.83px] font-medium font-['Manrope']">
                  Username
                </label>

                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={
                        isExist ? (
                          isExist ? (
                            <p className='text-green-500'>{isExist}</p>
                          ) : (
                            ''
                          )
                        ) : (
                          errors?.username?.message
                        )
                      }
                      isInvalid={!!errors?.username}
                      required={true}
                      onChange={(e) => checkUsername(e.target.value)}
                      classNames={{
                        inputWrapper: [
                          'border-2 border-transparent',
                          'focus-within:!border-red-500  ',
                          '!cursor-text',
                          'bg-zinc-700 bg-opacity-10',
                        ],
                      }}
                      placeholder='Enter a username'
                      className="grow shrink basis-0 text-primaryText  rounded text-opacity-50 text-[16.83px] font-normal font-['Manrope']"
                    />
                  )}
                  rules={{
                    required: true,
                    validate: validateUsername,
                    maxLength: 16,
                  }}
                />
                {/* {isExist ? <p className='text-green-500'>{isExist}</p> : ''} */}
              </div>
              <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                <label className="text-center px-2 inline-flex text-[12.83px] font-medium font-['Manrope']">
                  Create a password
                </label>

                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors?.password?.message}
                      isInvalid={!!errors?.password}
                      required={true}
                      placeholder='Enter a password'
                      className="grow shrink basis-0   rounded text-primaryText text-opacity-50 text-[16.83px] font-normal font-['Manrope']"
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
                      type={isVisible ? 'text' : 'password'}
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
                    minLength: {
                      value: 8,
                      message: 'min length is 8',
                    },
                    validate: validatePassword,
                  }}
                />

                <p
                  className={`${
                    errors?.password ? 'text-red-500' : 'text-zinc-400'
                  } text-left  text-[10px] font-normal font-['Manrope']`}
                >
                  (Min. 8 characters with a letter, special character and a
                  number) <br />
                </p>
              </div>
              <Button
                type='submit'
                isDisabled={isPending}
                className="w-[290px] text-center text-white text-[16.83px] font-medium font-['Manrope'] px-6 py-5 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex"
              >
                {isPending ? <Loader /> : 'Proceed'}
              </Button>
            </div>
          </div>
          <div className=' w-[100%] h-[80px] md:h-[116px] md:px-24 justify-between items-end inline-flex'>
            <div className='w-[132.27px] h-[51.91px] ml-4 md:ml-0 '>
              <Logo />
            </div>
            <div className='p-2 justify-center items-center gap-1 flex'>
              <div className="text-center p-2 hidden  md:flex  text-[12.83px] font-bold font-['Manrope']">
                <Button variant='flat bg-none '>Go Back</Button>
              </div>
              <div className="text-center p-2 md:hidden   text-[16.83px] font-bold font-['Manrope']">
                <Button variant='flat bg-none  '>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
