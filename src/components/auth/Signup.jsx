import { Button, Input } from '@nextui-org/react'
import Logo from '../Logo'
import { ChevronRight, EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRegisterUser } from '../../api/auth'
import useCurrentUser from '../../hooks/useCurrentUser'
import useAccessToken from '../../hooks/useAccessToken'
import API from '../../services/AxiosInstance'

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
                      type={isVisible ? 'text' : 'password'}
                      classNames={{
                        inputWrapper: [
                          'border-2 border-transparent',
                          'focus-within:!border-red-500  ',
                          '!cursor-text',
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
