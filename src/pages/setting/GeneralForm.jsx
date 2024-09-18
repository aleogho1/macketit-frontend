import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { genders, days, months, years } from '../../utilities/data'
import { Button } from '@nextui-org/button'
import DeleteAccountModal from '../../components/auth/DeleteAccountModal'
import { Avatar, useDisclosure } from '@nextui-org/react'
import { useGetProfile, useUserProfile } from '../../api/profileApis'
import { Controller, useForm } from 'react-hook-form'
import { useGetCountry, useGetLga, useGetState } from '../../api/locationApis'
import { useEffect, useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { setProfileContext, ProfileContext } from '../../context/Profile'
import API from '../../services/AxiosInstance'
import { format } from 'date-fns'

export default function GeneralForm() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const gender = genders.slice(1)

  const { data: profileDeatils } = useGetProfile()
  console.log(profileDeatils)
  const birthdayDate = new Date(profileDeatils?.birthday)

  // Get the day, month, and year from the birthday date
  const day = birthdayDate.getDate().toString() // Add leading zero if necessary
  const month = (birthdayDate.getMonth() + 1).toString().padStart(2, '0') // Add leading zero if necessary
  const year = birthdayDate.getFullYear().toString()

  const { mutateAsync: updateProfile, isPending } = useUserProfile()
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      firstname: profileDeatils?.firstname,
      lastname: profileDeatils?.lastname,
      email: profileDeatils?.email,
      username: profileDeatils?.username,
      profile_picture: profileDeatils?.profile_picture,
      local_government: profileDeatils?.local_government,
      country: profileDeatils?.country,
      gender: profileDeatils?.gender,
      state: profileDeatils?.state,
      phone: profileDeatils?.phone,
      day,
      month,
      year,
    },
  })

  const [selectedImage, setSelectedImage] = useState(null)
  const [updatedImage, setUpdatedImage] = useState(null)
  const setProfile = useContext(setProfileContext)
  const profile = useContext(ProfileContext)
  const [userName, setUserName] = useState()
  const [debouncedValue, setDebouncedValue] = useState()
  const [isExist, setExist] = useState()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(userName)
    }, 2000)
    return () => {
      clearTimeout(handler)
    }
  })
  const maxUserName = 16
  const checkUsername = (name) => {
    if (name.length <= maxUserName) {
      setUserName(name)
      setValue('username', name)
    }
  }
  useEffect(() => {
    if (debouncedValue) {
      API.post('/check-username', { username: debouncedValue })
        .then((response) => setExist(response.data?.message))
        .catch((error) =>
          setError('username', {
            type: 'manual',
            message: error?.response?.data?.message,
          })
        )
    }
  }, [debouncedValue])

  useEffect(() => {
    if (profileDeatils?.profile_picture) {
      setSelectedImage(profileDeatils.profile_picture)
    }
  }, [profileDeatils])

  const { data: countries, isLoading: isCountryLoading } = useGetCountry()
  const country = countries?.slice(1)

  const { data: states, isLoading: isStateLoading } = useGetState(
    watch().country
  )
  const state = states?.slice(1)

  const { data: lgas, isLoading: isLgaLoading } = useGetLga(watch().state)
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
    if (selectedDate > presentDate) {
      setError('day', 'Invalid date selection')
      setError('month', 'Invalid date selection')
      setError('year', 'Invalid date selection')
    }
  }

  const onSubmit = async (data) => {
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
      if (selectedImage && typeof selectedImage === 'object') {
        formData.append('profile_picture', selectedImage)
        console.log(selectedImage)
      } else if (profileDeatils?.profile_picture) {
        formData.append('profile_picture', profileDeatils?.profile_picture)
      }
      // Append other form fields
      formData.append('gender', data.gender)
      formData.append('firstname', data.firstname)
      formData.append('lastname', data.lastname)
      formData.append('birthday', selectedDate)
      formData.append('country', data.country)
      formData.append('state', data.state)
      formData.append('local_government', data.local_government)
      formData.append('phone', data.phone)
      formData.append('username', data.username)
      const res = await updateProfile(formData)
      if (res.data.status) {
        setProfile(data)
        // setSelectedImage(null)
        toast.success(res.data.message, {
          duration: 2000,
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        duration: 2000,
      })
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='self-stretch grow shrink w-full  basis-0 md:px-16 py-6 flex-col justify-start items-start gap-12 flex'>
            <div className='self-stretch flex-col w-full justify-start items-start gap-6 flex'>
              <div className="text-sm font-bold font-['Manrope']">Profile</div>
              <div className='flex-col justify-start items-center gap-6 flex'>
                <div className='flex-col justify-center items-center gap-2 flex'>
                  <div className='w-[66px] cursor-pointer h-[66px] relative'>
                    {selectedImage || updatedImage ? (
                      <div className='mt-4'>
                        <Avatar
                          // src={selectedImage}
                          name='profile_picture'
                          // src={URL.createObjectURL(selectedImage)}
                          src={
                            typeof selectedImage === 'object'
                              ? URL.createObjectURL(
                                  selectedImage ? selectedImage : updatedImage
                                )
                              : selectedImage
                              ? selectedImage
                              : updatedImage
                          }
                          alt='Selected'
                          className='w-[66px] h-[66px] -top-4 absolute rounded-[10px]'
                        />
                      </div>
                    ) : (
                      <div className='w-[66px] h-[66px] cursor-pointer left-0 top-0 absolute bg-primarybutton bg-opacity-40 rounded-[10px]' />
                    )}
                    <div className='w-6 h-6 cursor-pointer left-[21px] top-[21px] absolute'>
                      <input
                        type='file'
                        accept='image/*'
                        id='image-upload'
                        className='absolute  w-full h-full opacity-0 cursor-pointer'
                        {...register('profile_picture')}
                        onChange={(e) => (
                          setSelectedImage(e.target.files[0]),
                          setUpdatedImage(e.target.files[0])
                        )}
                      />
                      <label
                        htmlFor='image-upload'
                        className='w-full cursor-pointer h-full'
                      >
                        <div className='w-8 h-8 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M3 21H21'
                              className='dark:stroke-[#fff] stroke-[#CB29BE] '
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M7 17V13L17 3L21 7L11 17H7Z'
                              className='dark:stroke-[#fff] stroke-[#CB29BE]'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M14 6L18 10'
                              className='dark:stroke-[#fff] stroke-[#CB29BE] '
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="text-center text-zinc-400 text-[10px] font-normal font-['Manrope']">
                    Upload photo
                  </div>
                </div>
              </div>
              <div className='self-stretch  flex-col justify-start items-center gap-3.5 flex'>
                <div className='self-stretch justify-center items-start gap-3.5 inline-flex'>
                  <div className='grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                    <div className='px-2 justify-center items-center gap-2 inline-flex'>
                      <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                        Full Name
                      </div>
                    </div>
                    <div className='w-full flex flex-col gap-y-4 lg:flex lg:flex-row lg:gap-4'>
                      <div className='self-stretch w-full bg-opacity-10 rounded-lg justify-start items-center gap-2 inline-flex'>
                        <Controller
                          name='firstname'
                          control={control}
                          render={({ field }) => (
                            <Input
                              type='text'
                              size='sm'
                              placeholder='Adewale'
                              {...field}
                              errorMessage={errors?.firstname?.message}
                              isInvalid={!!errors?.firstname}
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
                                  'focus-within:!border-red-500  ',
                                ],
                              }}
                              className=" rounded  text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                            />
                          )}
                        />
                      </div>
                      <div className='self-stretch w-full bg-opacity-10 rounded-lg justify-start items-center gap-2 inline-flex'>
                        <Controller
                          name='lastname'
                          control={control}
                          render={({ field }) => (
                            <Input
                              type='text'
                              size='sm'
                              placeholder='Adewale'
                              {...field}
                              errorMessage={errors?.lastname?.message}
                              isInvalid={!!errors?.lastname}
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
                                  'focus-within:!border-red-500  ',
                                ],
                              }}
                              className=" rounded  text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                  <div className='px-2 justify-center items-center gap-2 inline-flex'>
                    <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                      Email address
                    </div>
                  </div>
                  <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field }) => (
                        <Input
                          type='text'
                          size='sm'
                          placeholder='adedamolamoses@gmail.com'
                          {...field}
                          errorMessage={errors?.email?.message}
                          isInvalid={!!errors?.email}
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
                              'focus-within:!border-red-500  ',
                            ],
                          }}
                          className=" rounded  text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                  <div className='px-2 justify-center items-center gap-2 inline-flex'>
                    <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                      Phone Number
                    </div>
                  </div>
                  <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                    <Controller
                      name='phone'
                      control={control}
                      render={({ field }) => (
                        <Input
                          type='text'
                          size='sm'
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
                              'focus-within:!border-red-500  ',
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
                  <div className='px-2 justify-center items-center gap-2 inline-flex'>
                    <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                      Username
                    </div>
                  </div>
                  <div className='self-stretch w-full hover:text-white bg-opacity-10 rounded justify-start items-start gap-2 flex flex-col'>
                    <Controller
                      name='username'
                      control={control}
                      render={({ field }) => (
                        <Input
                          type='text'
                          size='sm'
                          placeholder='@moski7'
                          {...field}
                          errorMessage={errors?.username?.message}
                          isInvalid={!!errors?.username}
                          onChange={(e) => checkUsername(e.target.value)}
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
                              'focus-within:!border-red-500  ',
                            ],
                          }}
                          className=" rounded  text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                        />
                      )}
                      rules={{ maxLength: 16 }}
                    />
                    {isExist ? <p className='text-green-500'>{isExist}</p> : ''}
                  </div>
                </div>
              </div>
            </div>
            <div className='self-stretch  flex-col justify-start items-start gap-6 flex'>
              <div className=" text-sm font-bold font-['Manrope']">Update</div>
              <div className='self-stretch flex-col justify-start items-center gap-3.5 flex'>
                <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                  <div className="text-center px-2 text-[12.83px] font-medium font-['Manrope']">
                    Select Gender
                  </div>
                  <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                    <Controller
                      name='gender'
                      control={control}
                      render={({ field }) => (
                        <Select
                          size='sm'
                          aria-labelledby='gender'
                          isInvalid={!!errors.gender}
                          errorMessage={errors?.gender?.message}
                          selectedKeys={field.value ? [field.value] : []}
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
                              'focus-within:!border-red-500  ',
                            ],
                          }}
                          {...field}
                          className="grow shrink basis-0 text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                        >
                          {gender.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className='self-stretch justify-center items-start gap-3.5 inline-flex'>
                  <div className='grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                    <div className='px-2 justify-center items-center gap-2 inline-flex'>
                      <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                        Birthday
                      </div>
                    </div>
                    <div className=' flex gap-4 w-full'>
                      <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                              className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
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
                                  'hover:bg-bg-white hover:bg-opacity-10',
                                  'dark:hover:bg-default/70',
                                  'group-data-[focused=true]:bg-default-200/50',
                                  'dark:group-data-[focused=true]:bg-default/60',
                                  '!cursor-text',
                                  'border-2 border-transparent',
                                  'focus-within:!border-red-500  ',
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
                            validate: validateDate,
                          }}
                        />
                      </div>
                      <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                              className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              placeholder='Mon'
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
                                  'focus-within:!border-red-500  ',
                                ],
                              }}
                              {...field}
                            >
                              {months.map((month) => (
                                <SelectItem
                                  key={month.value}
                                  value={month.value}
                                >
                                  {month.label}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                          rules={{
                            validate: validateDate,
                          }}
                        />
                      </div>
                      <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                              placeholder='year'
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
                                  'focus-within:!border-red-500  ',
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
                            validate: validateDate,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                  <div className='px-2 justify-center items-center gap-2 inline-flex'>
                    <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                      Select Country
                    </div>
                  </div>

                  <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                              'focus-within:!border-red-500  ',
                            ],
                          }}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setValue('state', '')
                            setValue('local_government', '')
                          }}
                        >
                          {country?.map((cou) => (
                            <SelectItem key={cou.name} value={cou.name}>
                              {cou.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className='self-stretch flex flex-col justify-center items-start gap-3.5 lg:inline-flex lg:flex-row'>
                  <div className='grow shrink basis-0 w-full flex-col justify-start items-start gap-[7px] inline-flex'>
                    <div className='px-2 justify-center items-center gap-2 inline-flex'>
                      <div className="text-center  text-[12.83px] font-medium font-['Manrope']">
                        State
                      </div>
                    </div>
                    <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                            className="grow shrink basis-0 rounded text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
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
                                'focus-within:!border-red-500  ',
                              ],
                            }}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setValue('local_government', '')
                            }}
                          >
                            {state?.map((cou) => (
                              <SelectItem key={cou.name} value={cou.name}>
                                {cou.name}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  <div className='grow shrink w-full basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                    <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                      {watch().country === 'Nigeria' && (
                        <div className='grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex'>
                          <label className="text-center px-2 text-[12.83px] font-medium font-['Manrope']">
                            LGA
                          </label>

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
                                className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                                placeholder='Select lga'
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
                                    'focus-within:!border-red-500  ',
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
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full justify-between'>
              <Button
                type='submit'
                isDisabled={isPending}
                className='md:w-[290px]  cursor-pointer px-6 py-6 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M5.01198 16.9639L5.96066 17.2801H5.96066L5.01198 16.9639ZM5.76117 14.7163L4.81248 14.4001H4.81248L5.76117 14.7163ZM6.53421 13.4655L7.24132 14.1726L7.24132 14.1726L6.53421 13.4655ZM14.0001 5.9997L13.2929 5.29259V5.29259L14.0001 5.9997ZM18 9.9997L18.7072 10.7068H18.7072L18 9.9997ZM10.5342 17.4655L9.8271 16.7584L9.8271 16.7584L10.5342 17.4655ZM9.2834 18.2386L9.59963 19.1873H9.59963L9.2834 18.2386ZM7.03584 18.9878L7.35206 19.9365L7.35206 19.9365L7.03584 18.9878ZM10.1242 17.8483L9.52193 17.0499L9.52192 17.05L10.1242 17.8483ZM9.8091 18.043L9.36439 17.1473L9.8091 18.043ZM18.9637 7.11167L18.0676 7.55568V7.55568L18.9637 7.11167ZM18.9637 8.88773L18.0676 8.44371V8.44371L18.9637 8.88773ZM15.112 5.03609L15.556 5.93211V5.93211L15.112 5.03609ZM16.8881 5.03609L16.4441 5.93211V5.93211L16.8881 5.03609ZM5.95676 14.1907L6.85244 14.6354L6.85244 14.6354L5.95676 14.1907ZM6.15148 13.8756L5.35317 13.2733L5.35317 13.2733L6.15148 13.8756ZM4.63928 18.7544L3.69738 19.0903L4.63928 18.7544ZM5.24531 19.3605L4.90943 20.3024L4.90943 20.3024L5.24531 19.3605ZM13.7072 6.29262C13.3166 5.9021 12.6835 5.9021 12.2929 6.29262C11.9024 6.68315 11.9024 7.31631 12.2929 7.70684L13.7072 6.29262ZM16.2929 11.7068C16.6835 12.0974 17.3166 12.0974 17.7072 11.7068C18.0977 11.3163 18.0977 10.6831 17.7072 10.2926L16.2929 11.7068ZM12 18.9997C11.4478 18.9997 11 19.4474 11 19.9997C11 20.552 11.4478 20.9997 12 20.9997V18.9997ZM19 20.9997C19.5523 20.9997 20 20.552 20 19.9997C20 19.4474 19.5523 18.9997 19 18.9997V20.9997ZM5.96066 17.2801L6.70985 15.0326L4.81248 14.4001L4.0633 16.6477L5.96066 17.2801ZM7.24132 14.1726L14.7072 6.7068L13.2929 5.29259L5.8271 12.7584L7.24132 14.1726ZM17.2929 9.29259L9.8271 16.7584L11.2413 18.1726L18.7072 10.7068L17.2929 9.29259ZM8.96717 17.2899L6.71961 18.0391L7.35206 19.9365L9.59963 19.1873L8.96717 17.2899ZM9.8271 16.7584C9.60902 16.9765 9.56482 17.0176 9.52193 17.0499L10.7264 18.6466C10.906 18.5111 11.061 18.353 11.2413 18.1726L9.8271 16.7584ZM9.59963 19.1873C9.84158 19.1066 10.0524 19.0387 10.2538 18.9387L9.36439 17.1473C9.31627 17.1712 9.25977 17.1924 8.96717 17.2899L9.59963 19.1873ZM9.52192 17.05C9.47254 17.0872 9.4198 17.1198 9.36439 17.1473L10.2538 18.9387C10.42 18.8561 10.5782 18.7584 10.7264 18.6466L9.52192 17.05ZM17.2929 6.7068C17.8953 7.30915 18.0131 7.4457 18.0676 7.55568L19.8597 6.66765C19.6227 6.18944 19.1953 5.78075 18.7072 5.29259L17.2929 6.7068ZM18.7072 10.7068C19.1953 10.2186 19.6227 9.80995 19.8597 9.33174L18.0676 8.44371C18.0131 8.55369 17.8953 8.69025 17.2929 9.29259L18.7072 10.7068ZM18.0676 7.55568C18.2063 7.83546 18.2063 8.16394 18.0676 8.44371L19.8597 9.33174C20.2756 8.49241 20.2756 7.50698 19.8597 6.66765L18.0676 7.55568ZM14.7072 6.7068C15.3095 6.10447 15.4461 5.98661 15.556 5.93211L14.668 4.14007C14.1898 4.37704 13.7811 4.80444 13.2929 5.29259L14.7072 6.7068ZM18.7072 5.29259C18.219 4.80443 17.8103 4.37704 17.3321 4.14007L16.4441 5.93211C16.554 5.98661 16.6906 6.10446 17.2929 6.7068L18.7072 5.29259ZM15.556 5.93211C15.8358 5.79346 16.1643 5.79346 16.4441 5.93211L17.3321 4.14007C16.4928 3.72414 15.5073 3.72414 14.668 4.14007L15.556 5.93211ZM6.70985 15.0326C6.80738 14.74 6.82854 14.6835 6.85244 14.6354L5.06108 13.7459C4.96106 13.9474 4.89313 14.1582 4.81248 14.4001L6.70985 15.0326ZM5.82711 12.7584C5.64676 12.9388 5.48862 13.0938 5.35317 13.2733L6.9498 14.4778C6.98215 14.4349 7.02323 14.3907 7.24132 14.1726L5.82711 12.7584ZM6.85244 14.6354C6.87995 14.5799 6.91254 14.5272 6.9498 14.4778L5.35317 13.2733C5.2414 13.4215 5.14362 13.5797 5.06108 13.7459L6.85244 14.6354ZM4.0633 16.6477C3.90675 17.1173 3.76644 17.5351 3.68656 17.875C3.61018 18.2001 3.53801 18.6434 3.69738 19.0903L5.58119 18.4186C5.6247 18.5406 5.57603 18.5772 5.63353 18.3325C5.68755 18.1026 5.79151 17.7876 5.96066 17.2801L4.0633 16.6477ZM6.71961 18.0391C6.21215 18.2082 5.89711 18.3122 5.66724 18.3662C5.42254 18.4237 5.45916 18.375 5.58119 18.4186L4.90943 20.3024C5.35634 20.4617 5.79968 20.3896 6.12475 20.3132C6.46465 20.2333 6.88243 20.093 7.35206 19.9365L6.71961 18.0391ZM3.69738 19.0903C3.89902 19.6558 4.34398 20.1007 4.90943 20.3024L5.58119 18.4186L5.58119 18.4186L3.69738 19.0903ZM12.2929 7.70684L16.2929 11.7068L17.7072 10.2926L13.7072 6.29262L12.2929 7.70684ZM12 20.9997H19V18.9997H12V20.9997Z'
                    fill='white'
                    className='  stroke-white'
                  />
                </svg>
                <div className="text-center text-white text-sm font-medium font-['Manrope']">
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
                    'Update'
                  )}
                </div>
              </Button>

              <div className='self-stretch  cursor-pointer justify-start items-center gap-[7px] inline-flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M7.06274 2.93726L7.76985 3.64437L7.76985 3.64437L7.06274 2.93726ZM2.93726 7.06274L2.23015 6.35563L2.23015 6.35564L2.93726 7.06274ZM2.93726 16.9373L3.64437 16.2302H3.64437L2.93726 16.9373ZM7.06274 21.0627L6.35563 21.7698H6.35564L7.06274 21.0627ZM21.0627 7.06274L21.7698 6.35564L21.0627 7.06274ZM16.9373 2.93726L16.2302 3.64437V3.64437L16.9373 2.93726ZM21.9447 8.36154L22.9171 8.12809V8.12809L21.9447 8.36154ZM21.7053 7.78343L22.5579 7.26093V7.26093L21.7053 7.78343ZM21.7053 16.2166L22.5579 16.7391V16.7391L21.7053 16.2166ZM21.9447 15.6385L22.9171 15.8719L22.9171 15.8719L21.9447 15.6385ZM15.6385 21.9447L15.8719 22.9171L15.8719 22.9171L15.6385 21.9447ZM16.2166 21.7053L16.7391 22.5579H16.7391L16.2166 21.7053ZM7.78343 21.7053L7.26093 22.5579H7.26093L7.78343 21.7053ZM8.36154 21.9447L8.12809 22.9171H8.12809L8.36154 21.9447ZM2.05526 15.6385L1.08289 15.8719L1.08289 15.8719L2.05526 15.6385ZM2.29472 16.2166L3.14736 15.6941L3.14736 15.6941L2.29472 16.2166ZM2.29472 7.78343L3.14736 8.30593L3.14736 8.30593L2.29472 7.78343ZM2.05526 8.36154L3.02763 8.59498V8.59498L2.05526 8.36154ZM8.36154 2.05526L8.59498 3.02763H8.59498L8.36154 2.05526ZM7.78343 2.29472L8.30593 3.14736V3.14736L7.78343 2.29472ZM15.6385 2.05526L15.8719 1.08289L15.8719 1.08289L15.6385 2.05526ZM16.2166 2.29472L15.6941 3.14736L15.6941 3.14736L16.2166 2.29472ZM11 16.01C11 16.5623 11.4477 17.01 12 17.01C12.5523 17.01 13 16.5623 13 16.01H11ZM13 11.01C13 10.4577 12.5523 10.01 12 10.01C11.4477 10.01 11 10.4577 11 11.01H13ZM11 8.01001C11 8.56229 11.4477 9.01001 12 9.01001C12.5523 9.01001 13 8.56229 13 8.01001H11ZM13 8.00001C13 7.44772 12.5523 7.00001 12 7.00001C11.4477 7.00001 11 7.44772 11 8.00001H13ZM14.6745 1H9.32548V3H14.6745V1ZM6.35564 2.23015L2.23015 6.35563L3.64437 7.76985L7.76985 3.64437L6.35564 2.23015ZM1 9.32548V14.6745H3V9.32548H1ZM2.23015 17.6444L6.35563 21.7698L7.76985 20.3556L3.64437 16.2302L2.23015 17.6444ZM9.32548 23H14.6745V21H9.32548V23ZM17.6444 21.7698L21.7698 17.6444L20.3556 16.2302L16.2302 20.3556L17.6444 21.7698ZM23 14.6745V9.32548H21V14.6745H23ZM21.7698 6.35564L17.6444 2.23015L16.2302 3.64437L20.3556 7.76985L21.7698 6.35564ZM23 9.32548C23 8.8839 23.0064 8.50012 22.9171 8.12809L20.9724 8.59498C20.9936 8.6833 21 8.7887 21 9.32548H23ZM20.3556 7.76985C20.7352 8.14941 20.8052 8.22848 20.8526 8.30593L22.5579 7.26093C22.358 6.93471 22.0821 6.66788 21.7698 6.35564L20.3556 7.76985ZM22.9171 8.12809C22.8436 7.82198 22.7224 7.52935 22.5579 7.26093L20.8526 8.30593C20.9075 8.3954 20.9479 8.49295 20.9724 8.59498L22.9171 8.12809ZM21.7698 17.6444C22.0821 17.3321 22.358 17.0653 22.5579 16.7391L20.8526 15.6941C20.8052 15.7715 20.7352 15.8506 20.3556 16.2302L21.7698 17.6444ZM21 14.6745C21 15.2113 20.9936 15.3167 20.9724 15.405L22.9171 15.8719C23.0064 15.4999 23 15.1161 23 14.6745H21ZM22.5579 16.7391C22.7224 16.4707 22.8436 16.178 22.9171 15.8719L20.9724 15.405C20.9479 15.5071 20.9075 15.6046 20.8526 15.6941L22.5579 16.7391ZM14.6745 23C15.1161 23 15.4999 23.0064 15.8719 22.9171L15.405 20.9724C15.3167 20.9936 15.2113 21 14.6745 21V23ZM16.2302 20.3556C15.8506 20.7352 15.7715 20.8052 15.6941 20.8526L16.7391 22.5579C17.0653 22.358 17.3321 22.0821 17.6444 21.7698L16.2302 20.3556ZM15.8719 22.9171C16.178 22.8436 16.4707 22.7224 16.7391 22.5579L15.6941 20.8526C15.6046 20.9075 15.5071 20.9479 15.405 20.9724L15.8719 22.9171ZM6.35564 21.7698C6.66788 22.0821 6.93471 22.358 7.26093 22.5579L8.30593 20.8526C8.22848 20.8052 8.14941 20.7352 7.76985 20.3556L6.35564 21.7698ZM9.32548 21C8.7887 21 8.6833 20.9936 8.59498 20.9724L8.12809 22.9171C8.50012 23.0064 8.8839 23 9.32548 23V21ZM7.26093 22.5579C7.52935 22.7224 7.82198 22.8436 8.12809 22.9171L8.59498 20.9724C8.49295 20.9479 8.3954 20.9075 8.30593 20.8526L7.26093 22.5579ZM1 14.6745C1 15.1161 0.993573 15.4999 1.08289 15.8719L3.02763 15.405C3.00643 15.3167 3 15.2113 3 14.6745H1ZM3.64437 16.2302C3.2648 15.8506 3.19482 15.7715 3.14736 15.6941L1.44208 16.7391C1.64199 17.0653 1.91791 17.3321 2.23015 17.6444L3.64437 16.2302ZM1.08289 15.8719C1.15638 16.178 1.27759 16.4707 1.44208 16.7391L3.14736 15.6941C3.09253 15.6046 3.05213 15.5071 3.02763 15.405L1.08289 15.8719ZM2.23015 6.35564C1.91791 6.66788 1.64199 6.93471 1.44208 7.26093L3.14736 8.30593C3.19482 8.22849 3.26481 8.14941 3.64437 7.76985L2.23015 6.35564ZM3 9.32548C3 8.7887 3.00643 8.6833 3.02763 8.59498L1.08289 8.12809C0.993573 8.50012 1 8.8839 1 9.32548H3ZM1.44208 7.26093C1.27759 7.52935 1.15638 7.82198 1.08289 8.12809L3.02763 8.59498C3.05213 8.49295 3.09253 8.3954 3.14736 8.30593L1.44208 7.26093ZM9.32548 1C8.8839 1 8.50012 0.993573 8.12809 1.08289L8.59498 3.02763C8.6833 3.00643 8.7887 3 9.32548 3V1ZM7.76985 3.64437C8.14941 3.2648 8.22849 3.19482 8.30593 3.14736L7.26093 1.44208C6.93471 1.64199 6.66788 1.91791 6.35563 2.23015L7.76985 3.64437ZM8.12809 1.08289C7.82198 1.15638 7.52935 1.27759 7.26093 1.44208L8.30593 3.14736C8.3954 3.09253 8.49295 3.05213 8.59498 3.02763L8.12809 1.08289ZM14.6745 3C15.2113 3 15.3167 3.00643 15.405 3.02763L15.8719 1.08289C15.4999 0.993573 15.1161 1 14.6745 1V3ZM17.6444 2.23015C17.3321 1.91791 17.0653 1.64199 16.7391 1.44208L15.6941 3.14736C15.7715 3.19482 15.8506 3.2648 16.2302 3.64437L17.6444 2.23015ZM15.405 3.02763C15.5071 3.05213 15.6046 3.09253 15.6941 3.14736L16.7391 1.44208C16.4707 1.27759 16.178 1.15638 15.8719 1.08289L15.405 3.02763ZM13 16.01V11.01H11V16.01H13ZM13 8.01001V8.00001H11V8.01001H13Z'
                    fill='#FF3D00'
                  />
                </svg>
                <div
                  onClick={onOpen}
                  className="text-center cursor-pointer text-orange-600 text-sm font-medium font-['Manrope']"
                >
                  Delete account
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {isOpen && <DeleteAccountModal isOpen={isOpen} onClose={onClose} />}
    </>
  )
}
