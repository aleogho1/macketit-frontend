/* eslint-disable react/prop-types */
import { ChevronRight } from 'lucide-react'
import { AiTwotoneEdit } from 'react-icons/ai'
import {
  Button,
  Select,
  SelectItem,
  useDisclosure,
  Input,
} from '@nextui-org/react'
import Logo from '../Logo'
import { days, genders, months, years } from '../../utilities/data'
import AuthModal from './AuthModal'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useGetCountry, useGetLga, useGetState } from '../../api/locationApis'
import toast from 'react-hot-toast'
import { useUserProfile } from '../../api/profileApis'
import useCurrentUser from '../../hooks/useCurrentUser'
import { format } from 'date-fns'

export default function OnBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const gender = genders.slice(0)

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
    setError
  } = useForm({})
  const { userData } = useCurrentUser()

  const { data: countries, isLoading: isCountryLoading } = useGetCountry()

  const { data: states, isLoading: isStateLoading } = useGetState(
    watch().country
  )
  const { data: lgas, isLoading: isLgaLoading } = useGetLga(watch().state)

  const { mutateAsync: updateProfile, isPending } = useUserProfile()
  useEffect(() => {
    setValue('state', '')
    setValue('local_government', '')
  }, [watch().country, setValue])

  useEffect(() => {
    setValue('local_government', '')
  }, [watch().state, setValue])

  const validateDate = () => {
    const day = watch('day')
    const month = watch('month')
    const year = watch('year')
    const date = new Date()
    const dayDate = format(new Date(date), 'dd')
    const monthDate = format(new Date(date), 'MM')
    const yearDate = format(new Date(date), 'yyyy') 
    const selectedDate = new Date(year, month, day).getTime()
    const presentDate = new Date(yearDate, monthDate, dayDate).getTime()
    if(selectedDate > presentDate) {
      setError('day', 'Invalid date selection')
      setError('month', 'Invalid date selection')   
      setError('year', 'Invalid date selection')   
    }
  }

  const onSubmit = async (data) => {
    if(data) {
    const day = watch('day')
    const month = watch('month')
    const year = watch('year')

    const selectedDate = `${year}-${month?.padStart(2, '0')}-${day?.padStart(
      2,
      '0'
    )}`
    data = { ...data, birthday: selectedDate }
    try {
      const formData = new FormData()
      // Append selected image to formData if available
      if (selectedImage) {
        formData.append('profile_picture', selectedImage)
      }
      // Append other form fields
      formData.append('gender', data.gender)
      formData.append('birthday', selectedDate)
      formData.append('country', data.country)
      formData.append('state', data.state)
      formData.append('local_government', data.local_government)
      formData.append('phone', data.phone)

      const res = await updateProfile(formData)
      if (res.data.status) {
        toast.success(res.data.message, {
          duration: 2000,
        })
        onOpen()
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 2000,
      })
    }
  }

  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' min-h-screen h[1024px] h-[1054px] relative '>
            <div className='hidden xl:block left-0 top-0 absolute'>
              <div className='w-40 h-40 md:w-unit-8xl md:h-unit-8xl left-0 top-0 absolute opacity-30 md:opacity-10 bg-violet-500 rounded-full blur-3xl z-10 ' />
              <div className='w-40 h-40 md:w-unit-8xl md:h-unit-8xl left-[13rem] md:left-[942.84px] top-[30rem] md:top-[427.55px] absolute opacity-20 md:opacity-10 bg-fuchsia-600 rounded-full blur-3xl z-10' />
            </div>
            <div className=' w-[20rem] md:w-[23rem] left-[10%] md:left-[40%] top-[189px] absolute flex-col justify-start items-center gap-6 inline-flex'>
              <div className='flex-col justify-start items-center gap-6 flex'>
                <div className="w-80 text-center text-[32px] font-semibold font-['Manrope'] leading-[26.88px]">
                  Welcome onboard!
                </div>
                <div className="self-stretch text-center text-zinc-400 text-base font-normal font-['Manrope']">
                  Hi {userData?.email}, we are excited to have you onboard!
                  Finish up your profile set up.
                </div>
                <div className='flex-col justify-center items-center gap-2 flex'>
                  <div className='w-[66px] h-[66px] cursor-pointer relative'>
                    {selectedImage ? (
                      <div className='mt-4'>
                        <img
                          // src={selectedImage}
                          src={URL.createObjectURL(selectedImage)}
                          alt='Selected'
                          className='w24 h24 w-[66px] h-[66px] -top-4 absolute rounded-[10px]'
                        />
                      </div>
                    ) : (
                      <div className='w-[66px] h-[66px] cursor-pointer left-0 top-0 absolute bg-fuchsia-600 bg-opacity-40 rounded-[10px]' />
                    )}
                    {/* Invisible input field */}

                    <input
                      type='file'
                      accept='image/*'
                      id='image-upload'
                      className='absolute w-full h-full opacity-0 cursor-pointer'
                      {...register('profile_picture')}
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    {/* Pencil icon */}
                    <label
                      htmlFor='image-upload'
                      className='w-full cursor-pointer h-full'
                    >
                      <div className='w-8 h-8 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <AiTwotoneEdit
                          className='text-white w-full h-full'
                          size={40}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="text-center text-zinc-400 text-[10px] font-normal font-['Manrope']">
                    Upload photo
                  </div>
                </div>
              </div>
              <div className='self-stretch  flex-col justify-start items-center gap-3.5 flex'>
                <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                  <label className="text-center px-2 textblack dark:textwhite  text-[12.83px] font-medium font-['Manrope']">
                    Select Gender
                  </label>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        aria-labelledby='gender'
                        isInvalid={!!errors.gender}
                        errorMessage={errors?.gender?.message}
                        selectedKeys={field.value ? [field.value] : []}
                        className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                        placeholder='Select Gender'
                        classNames={{
                          listbox: [
                            'bg-transparent',
                            'text-black/90 dark:text-white/90',
                            'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                          ],
                          trigger: [
                            'bg-zinc-700 bg-opacity-10',
                            'dark:bg-white dark:bg-opacity-10',
                            'hover:bg-bg-white hover:bg-opacity-10',
                            'dark:hover:bg-default/70',
                            'group-data-[focused=true]:bg-default-200/50',
                            'dark:group-data-[focused=true]:bg-default/60',
                            '!cursor-text',
                            'border-2 border-transparent',
                            'focus-within:!border-fuchsia-600  ',
                            '!cursor-text',
                          ],
                        }}
                      >
                        {gender?.slice(1)?.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </div>
                <div className='self-stretch flex-col justify-center items-start gap-3.5 inline-flex'>
                  <label className="text-center px-2 text-[12.83px] font-medium font-['Manrope']">
                    Birthday
                  </label>
                  <div className=' flex justify-between items-center gap-3 md:gap-6'>
                    <div className='grow w-28 md:w-20 shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                      <Controller
                        name='day'
                        control={control}
                        aria-labelledby='day'
                        render={({ field }) => (
                          <Select
                            aria-labelledby='day'
                            isInvalid={!!errors.day}
                            errorMessage={errors?.day?.message}
                            selectedKeys={field.value ? [field.value] : []}
                            className="grow shrink basis-0  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                            placeholder='Day'
                            classNames={{
                              listbox: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                              ],
                              trigger: [
                                'bg-zinc-700 bg-opacity-10',
                                'dark:bg-white dark:bg-opacity-10',
                                'focus:border-fuchsia-600',
                                'dark:hover:bg-default/70',
                                'group-data-[focused=true]:bg-default-200/50',
                                'dark:group-data-[focused=true]:bg-default/60',
                                '!cursor-text',
                                'border-2 border-transparent',
                                'focus-within:!border-fuchsia-600  ',
                                '!cursor-text',
                              ],
                            }}
                            {...field}
                          >
                            {days.map((day) => (
                              <SelectItem key={day} value={String(day)}>
                                {String(day)}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                        rules={{
                          validate:  validateDate
                        }}
                      />
                    </div>
                    <div className='grow shrink w-32 md:w-28 basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                      <Controller
                        name='month'
                        control={control}
                        aria-labelledby='month'
                        render={({ field }) => (
                          <Select
                            aria-labelledby='month'
                            isInvalid={!!errors.month}
                            errorMessage={errors?.month?.message}
                            selectedKeys={field.value ? [field.value] : []}
                            className="grow shrink basis-0rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                            placeholder='Month'
                            classNames={{
                              listbox: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                              ],
                              trigger: [
                                'bg-zinc-700 bg-opacity-10',
                                'dark:bg-white dark:bg-opacity-10',
                                'hover:bg-bg-white hover:bg-opacity-10',
                                'dark:hover:bg-default/70',
                                'group-data-[focused=true]:bg-default-200/50',
                                'dark:group-data-[focused=true]:bg-default/60',
                                '!cursor-text',
                                'border-2 border-transparent',
                                'focus-within:!border-fuchsia-600  ',
                                '!cursor-text',
                              ],
                            }}
                            {...field}
                          >
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                        rules={{
                          validate:  validateDate
                        }}
                      />
                    </div>
                    <div className='grow md:w-32 shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                      <Controller
                        name='year'
                        control={control}
                        aria-labelledby='year'
                        render={({ field }) => (
                          <Select
                            aria-labelledby='year'
                            isInvalid={!!errors.year}
                            errorMessage={errors?.year?.message}
                            selectedKeys={field.value ? [field.value] : []}
                            className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                            placeholder='Year'
                            classNames={{
                              listbox: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                              ],
                              trigger: [
                                'bg-zinc-700 bg-opacity-10',
                                'dark:bg-white dark:bg-opacity-10',
                                'hover:bg-bg-white hover:bg-opacity-10',
                                'dark:hover:bg-default/70',
                                'group-data-[focused=true]:bg-default-200/50',
                                'dark:group-data-[focused=true]:bg-default/60',
                                '!cursor-text',
                                'border-2 border-transparent',
                                'focus-within:!border-fuchsia-600  ',
                                '!cursor-text',
                              ],
                            }}
                            {...field}
                          >
                            {years.map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {String(year)}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                        rules={{
                          validate: validateDate
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                  <div className='px-2 justify-center items-center gap-2 inline-flex'>
                    <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                      Phone
                    </div>
                  </div>
                  <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                    <Controller
                      name='phone'
                      control={control}
                      render={({ field }) => (
                        <Input
                          type='number'
                          size='sm'
                          // pattern='^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
                          placeholder='phone'
                          {...field}
                          errorMessage={errors?.phone?.message}
                          isInvalid={!!errors?.phone}
                          classNames={{
                            input: [
                              'bg-transparent',
                              'text-black/90 dark:text-white/90',
                              'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                            ],
                            innerWrapper: 'bg-transparent',
                            inputWrapper: [
                              'bg-zinc-700 bg-opacity-10',
                              'dark:bg-white dark:bg-opacity-10',
                              'hover:bg-bg-white hover:bg-opacity-10',
                              'dark:hover:bg-default/70',
                              'group-data-[focused=true]:bg-default-200/50',
                              'dark:group-data-[focused=true]:bg-default/60',
                              '!cursor-text',
                              'border-2 border-transparent',
                              'focus-within:!border-fuchsia-600  ',
                            ],
                          }}
                          className=" rounded  text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                        />
                      )}
                      rules={{
                        pattern: {
                          value:
                            /^\+?[1-9]\d{1,14}$|^\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
                          message: 'This is not a valid phone number',
                        },
                      }}
                    />
                  </div>
                </div>
                <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                  <label className="text-center px-2 text-[12.83px] font-medium font-['Manrope']">
                    Select Country
                  </label>

                  <Controller
                    name='country'
                    control={control}
                    aria-labelledby='country'
                    render={({ field }) => (
                      <Select
                        aria-labelledby='country'
                        isInvalid={!!errors.country}
                        errorMessage={errors?.country?.message}
                        isLoading={isCountryLoading}
                        selectedKeys={field.value ? [field.value] : []}
                        className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                        placeholder='Select country'
                        classNames={{
                          listbox: [
                            'bg-transparent',
                            'text-black/90 dark:text-white/90',
                            'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                          ],
                          trigger: [
                            'bg-zinc-700 bg-opacity-10',
                            'dark:bg-white dark:bg-opacity-10',
                            'hover:bg-bg-white hover:bg-opacity-10',
                            'dark:hover:bg-default/70',
                            'group-data-[focused=true]:bg-default-200/50',
                            'dark:group-data-[focused=true]:bg-default/60',
                            '!cursor-text',
                            'border-2 border-transparent',
                            'focus-within:!border-fuchsia-600  ',
                            '!cursor-text',
                          ],
                        }}
                        {...field}
                      >
                        {countries?.slice(1)?.map((cou) => (
                          <SelectItem key={cou.name} value={cou.name}>
                            {cou.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </div>
                <div className='self-stretch justify-center items-start gap-3.5 inline-flex'>
                  <div className='grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                    <label className="text-center px-2  text-[12.83px] font-medium font-['Manrope']">
                      State
                    </label>
                    <Controller
                      name='state'
                      aria-labelledby='state'
                      control={control}
                      render={({ field }) => (
                        <Select
                          aria-labelledby='state'
                          isInvalid={!!errors.state}
                          errorMessage={errors?.state?.message}
                          isLoading={isStateLoading}
                          selectedKeys={field.value ? [field.value] : []}
                          className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                          placeholder='Select state'
                          classNames={{
                            listbox: [
                              'bg-transparent',
                              'text-black/90 dark:text-white/90',
                              'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                            ],
                            trigger: [
                              'bg-zinc-700 bg-opacity-10',
                              'dark:bg-white dark:bg-opacity-10',
                              'hover:bg-bg-white hover:bg-opacity-10',
                              'dark:hover:bg-default/70',
                              'group-data-[focused=true]:bg-default-200/50',
                              'dark:group-data-[focused=true]:bg-default/60',
                              '!cursor-text',
                              'border-2 border-transparent',
                              'focus-within:!border-fuchsia-600  ',
                              '!cursor-text',
                            ],
                          }}
                          {...field}
                        >
                          {states?.slice(1)?.map((cou) => (
                            <SelectItem key={cou.name} value={cou.name}>
                              {cou.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                  {watch().country === 'Nigeria' && (
                    <div className='grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                      <labl className="text-center px-2 text-[12.83px] font-medium font-['Manrope']">
                        LGA
                      </labl>

                      <Controller
                        name='local_government'
                        control={control}
                        aria-labelledby='local_government'
                        render={({ field }) => (
                          <Select
                            aria-labelledby='local_government'
                            isInvalid={!!errors.local_government}
                            errorMessage={errors?.local_government?.message}
                            isLoading={isLgaLoading}
                            selectedKeys={field.value ? [field.value] : []}
                            className="grow shrink basis-0 capitalize rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                            placeholder='Select Lga'
                            classNames={{
                              listbox: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                              ],
                              trigger: [
                                'bg-zinc-700 bg-opacity-10',
                                'dark:bg-white dark:bg-opacity-10',
                                'hover:bg-bg-white hover:bg-opacity-10',
                                'dark:hover:bg-default/70',
                                'group-data-[focused=true]:bg-default-200/50',
                                'dark:group-data-[focused=true]:bg-default/60',
                                '!cursor-text',
                                'border-2 border-transparent',
                                'focus-within:!border-fuchsia-600  ',
                                '!cursor-text',
                              ],
                            }}
                            {...field}
                          >
                            {lgas?.map((lga) => (
                              <SelectItem key={lga} value={lga}>
                                {lga}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                  )}
                </div>
                <Button
                  type='submit'
                  isDisabled={isPending}
                  className="w-[290px] px-6 py-6 text-center text-white text-[12.83px] font-medium font-['Manrope'] bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex"
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
                <div className='justify-start items-center inline-flex'>
                  <div className="text-center text-zinc-400 text-[12.83px] font-normal font-['Manrope']">
                    I will do this later
                  </div>

                  <div
                    onClick={() => {
                      navigate(`/dashboard/home`)
                    }}
                    className="text-center cursor-pointer p-2 text-[#FF6DFB] dark:text-fuchsia-400 text-[12.83px] font-bold font-['Manrope']"
                  >
                    Skip
                  </div>
                </div>
              </div>
            </div>
            <div className=' w-full h-[80px] md:h-[116px] md:px-24 left-0 top-0 absolute justify-between items-end inline-flex'>
              <div className='w-[132.27px] h-[51.91px] relative'>
                <Logo />
              </div>
              <div className='p-2 justify-center items-center gap-1 flex'>
                <div className="text-center p-2 hidden  md:flex text-white text-[12.83px] font-bold font-['Manrope']">
                  <Button onClick={() => navigate(-1)} variant='flat bg-none '>
                    Go Back
                  </Button>
                </div>
                <div className="text-center p-2 md:hidden  text-white text-[12.83px] font-bold font-['Manrope']">
                  <Button onClick={() => navigate(-1)} variant='flat bg-none  '>
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
