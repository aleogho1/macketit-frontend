/* eslint-disable react/no-unescaped-entities */

import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import {
  genders,
  generateVideoThumbnail,
  ytplatforms,
} from '../../../../utilities/data'
import AdvertPaymentModal from '../AdvertPaymentModal'
import IgPageHeader from '../IgPageHeader'
import { Controller, useForm } from 'react-hook-form'
import {
  useGetCountry,
  useGetReligion,
  useGetState,
} from '../../../../api/locationApis'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import {
  useCreateAdvert,
  useCreateAdvertPaymentWallet,
} from '../../../../api/advertApi'
import YoutubeIcon from '../../../../assets/logos_youtube-icon.svg'
import Loader from '../../../Loader'
import { useNavigate } from 'react-router'
import Icons from '../../../../components/Icon'
export default function CreateYtAdvertTask() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageUrl, setImageUrl] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [media, setMedia] = useState(null)
  const [count, setCount] = useState(1)
  const mediaType = ['Photo', 'Video']
  const [isMediaType, setMediaType] = useState(mediaType[0])
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { amount: 140, platform: 'youtube' },
  })
  const { data: countries, isLoading: isCountryLoading } = useGetCountry()

  const { data: states, isLoading: isStateLoading } = useGetState(
    watch().country
  )
  const { data: religions, isLoading: isReligionLoading } = useGetReligion()
  const { mutateAsync: createAdvert, isPending } = useCreateAdvert()
  const { mutateAsync: createAdvertWithWallet } = useCreateAdvertPaymentWallet()
  const calculatedAmount = +watch().posts_count * +watch().amount
  const handleChange = async ({ target }) => {
    const { name } = target

    if (name === 'media') {
      const file = target.files[0]

      if (!file) {
        return // No file selected, do nothing
      }

      const allowedTypes = ['image/*', 'video/*']
      const maxFileSize = 20 * 1024 * 1024 // 20 MB in bytes

      if (
        !allowedTypes.some((type) =>
          file.type.startsWith(type.replace('*', ''))
        )
      ) {
        return toast.error(
          `Invalid file type! Please select an image or video.`,
          {
            duration: 5000,
          }
        )
      }

      if (file.size > maxFileSize) {
        return toast.error(
          `File size exceeds the limit (20MB). Please choose a smaller file.`,
          {
            duration: 5000,
          }
        )
      }

      // If the file is valid, set the image URL, log the file, and set the image state
      // setImageUrl(URL.createObjectURL(file))
      setMedia(file)
      console.log(media, 'media')
      const files = Array.from(target.files)
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
      setImageUrl((prevSelectedMedia) => [...prevSelectedMedia, ...files])
      setPreviewUrls((prevPreviewUrls) => [
        ...prevPreviewUrls,
        ...newPreviewUrls,
      ])

      console.log(media, 'media')
      console.log(imageUrl, 'imageUrl')

      if (file.type.startsWith('video/')) {
        try {
          const videoThumbnail = await generateVideoThumbnail(file)
          setImageUrl(videoThumbnail)
          console.log(videoThumbnail, 'videoThumbnail')

          // Use videoThumbnail to display the video thumbnail
        } catch (error) {
          console.error('Error generating video thumbnail:', error)
        }
      }
    }
  }

  const handleDelete = (index) => {
    setPreviewUrls((prevPreviewUrls) =>
      prevPreviewUrls.filter((_, i) => i !== index)
    )
    setImageUrl((prevImageUrl) => prevImageUrl.filter((_, i) => i !== index))
  }

  useEffect(() => {
    setValue('target_state', '')
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
    //  setValue('local_government', '')
  }, [watch().target_country, setValue])

  const onSubmit = async () => {
    onOpen()
  }

  // // const navigate = useNavigate()

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const handlePaymentSuccess = async () => {
    try {
      const data = watch()
      const formData = new FormData()
      // Append selected image to formData if available
      if (media) {
        formData.append('media', media)
      }
      // Append other form fields
      formData.append('task_type', 'advert')
      formData.append('target_country', data.target_country)
      formData.append('platform', data.platform)
      formData.append('amount', calculatedAmount)
      formData.append('engagements_count', data.posts_count)
      formData.append('posts_count', data.posts_count)
      formData.append('gender', data.gender)
      formData.append('caption', data.caption)
      formData.append('religion', data.religion)
      formData.append('goal', data.phone)
      formData.append('account_link', data.phone)

      const res = await createAdvert(formData)
      if (res?.data.status) {
        toast.success(res.data.message, {
          duration: 20000,
        })
        // navigate('dashboard/advertise-history')
        const authorizationUrl = res?.data?.authorization_url
        if (authorizationUrl) {
          localStorage.setItem('paystack_redirect', window.location.pathname)
          openInNewTab(authorizationUrl) // Call the function to open in a new tab
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 20000,
      })
    }
  }

  const handlePaymentTenditSuccess = async () => {
    try {
      const data = watch()
      const formData = new FormData()
      // Append selected image to formData if available
      if (media) {
        formData.append('media', media)
      }
      // Append other form fields
      formData.append('task_type', 'advert')
      formData.append('target_country', data.target_country)
      formData.append('platform', data.platform)
      formData.append('amount', calculatedAmount)
      formData.append('engagements_count', data.posts_count)
      formData.append('posts_count', data.posts_count)
      formData.append('gender', data.gender)
      formData.append('caption', data.caption)
      formData.append('religion', data.religion)
      formData.append('goal', data.phone)
      formData.append('account_link', data.phone)

      const res = await createAdvertWithWallet(formData)
      if (res?.data.status) {
        toast.success(res.data.message, {
          duration: 20000,
        })
        // navigate('dashboard/advertise-history')
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 20000,
      })
    }
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='p-3 bg-white dark:bg-zinc-900 flex-col justify-start items-start gap-3 inline-flex'>
            <div className=' flex-col justify-start items-start gap-4 flex'>
              <div className='w-full'>
              <div
                    onClick={() => navigate('/dashboard/advertise/?tab=advert-task')}
                    className='justify-start cursor-pointer items-center gap-[7px] inline-flex'
                  >
                    <div className='cursor-pointer'>
                      <Icons type='arrow-back' />
                    </div>
                    <div className="text-center text-fuchsia-400 text-sm font-medium font-['Manrope']">
                      Go back
                    </div>
              </div>
                <IgPageHeader
                  title={'Get People to Post Your Advert on Youtube'}
                  frame={YoutubeIcon}
                  descp={`Get real people to post your advert on their Youtube account having atleast 1000 active followers each on their account to post your
advert to their followers. This will give your advert massive views within a short period of time. You can indicate any number of people you 
want to post your advert.`}
                  price={`₦140 per Advert Post`}
                />
              </div>
              <div className='self-stretch  md:mt-8 grow shrink basis-0 flex-col justify-start items-start gap-4 flex'>
                <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                  <div className=" text-xl md:text-2xl font-medium font-['Manrope']">
                    Create Advert Task
                  </div>
                </div>
                <div className='self-stretch grow shrink basis-0 md:px-16 py-6 flex-col justify-start items-start gap-12 flex'>
                  <div className='self-stretch grow shrink basis-0 flex-col justify-start items-start gap-6 flex'>
                    <div className='self-stretch  flex-col justify-start items-center gap-3.5 flex'>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className="text-center  text-[12.83px] font-medium font-['Manrope']">
                          Select Platform
                        </div>

                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='platform'
                            control={control}
                            render={({ field }) => (
                              <Select
                                placeholder='Select'
                                aria-labelledby='platform'
                                size='sm'
                                selectedKeys={field.value ? [field.value] : []}
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
                                  ],
                                }}
                                className="grow shrink rounded basis-0 text-black dark:text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                                {...field}
                              >
                                {ytplatforms?.map((platform) => (
                                  <SelectItem
                                    key={platform.value}
                                    value={platform.value}
                                  >
                                    {platform.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                            rules={{required: true}}
                          />
                        </div>
                        <div className='justify-center items-center gap-2 inline-flex'>
                          <div className="text-[10px] font-normal font-['Manrope']">
                            Please select the social media or App Store platform
                            where you want to perform this action
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                            Select Location
                          </div>
                        </div>
                        <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                          <Controller
                            name='target_country'
                            control={control}
                            rules={{required: true}}
                            aria-labelledby='target_country'
                            render={({ field }) => (
                              <Select
                                aria-labelledby='target_country'
                                isInvalid={!!errors.target_country}
                                errorMessage={errors?.target_country?.message}
                                isLoading={isCountryLoading}
                                selectedKeys={field.value ? [field.value] : []}
                                className="grow shrink basis-0  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
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
                                  ],
                                }}
                                {...field}
                              >
                                {countries?.map((cou) => (
                                  <SelectItem key={cou.name} value={cou.name}>
                                    {cou.name}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>

                        <div className='justify-center items-center gap-2 inline-flex'>
                          <div className="text-[10px] font-normal font-['Manrope']">
                            You can target a particular location where your
                            Advert task will be mostly shown. Select “All over
                            Nigeria” if you want to target every location within
                            the country.
                          </div>
                        </div>
                      </div>
                      {watch().target_country !== 'All Countries' && (
                        <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                          <div className='px-2 justify-center items-center gap-2 inline-flex'>
                            <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                              State
                            </div>
                          </div>
                          <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                            <Controller
                              name='target_state'
                              aria-labelledby='target_state'
                              rules={{required: true}}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  aria-labelledby='target_state'
                                  isInvalid={!!errors.target_state}
                                  errorMessage={errors?.target_state?.message}
                                  isLoading={isStateLoading}
                                  selectedKeys={
                                    field.value ? [field.value] : []
                                  }
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
                                  {states?.map((cou) => (
                                    <SelectItem key={cou.name} value={cou.name}>
                                      {cou.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                              )}
                            />
                          </div>

                          <div className='justify-center items-center gap-2 inline-flex'>
                            <div className="text-[10px] font-normal font-['Manrope']">
                              You can target a particular location where your
                              Advert task will be mostly shown. Select “All over
                              Nigeria” if you want to target every location
                              within the country.
                            </div>
                          </div>
                        </div>
                      )}

                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                            Number of Youtube Advert Post you want
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='posts_count'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.posts_count?.message}
                                isInvalid={!!errors?.posts_count}
                                required={true}
                                value={count}
                                type='number'
                                onChange={(e) => {
                                  setCount(e.target.value)
                                }}
                                placeholder='No. of views'
                                {...field}
                                className="grow shrink basis-0  rounded text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true, min: 0,
                              validate: {
                                invalidInput: (fieldValue) => {
                                  return (
                                    fieldValue > 0 || 'invalid input' 
                                  )
                                },
                                isMinimum: (fieldValue) => {
                                  return (
                                    fieldValue * +watch().amount >= 1000 || `The total amount of #${+watch().posts_count * +watch().amount} is below our minimum order. Please note that the minimum order amount is #1,000. Kindly adjust your orer accordingly.`
                                  )
                                },
                                isMaximum: (fieldValue) => {
                                  return (
                                    fieldValue * +watch().amount <= 500000 || `Your order total amount of #${(+watch().posts_count * +watch().amount).toLocaleString()} exceeds the maximum allowed amount. Please review your order and adjust the total accordingly.`
                                  )
                                }
                              } }}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-[10px] font-normal font-['Manrope']">
                            Enter the desired Number of Youtube Advert Post you
                            want Us to get for you.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                            Select Gender
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='gender'
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => (
                              <Select
                                {...field}
                                aria-labelledby='gender'
                                isInvalid={!!errors.gender}
                                errorMessage={errors?.gender?.message}
                                selectedKeys={field.value ? [field.value] : []}
                                className="grow shrink basis-0  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
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
                                  ],
                                }}
                              >
                                {genders.map((gender) => (
                                  <SelectItem
                                    key={gender.value}
                                    value={gender.value}
                                  >
                                    {gender.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink text-[10px] font-normal font-['Manrope']">
                            You can select the kind of gender whether male or
                            female that you want to see your task. For example,
                            if you are selling women fashion items, you can
                            select the Female gender so your task will be shown
                            to only females. Select 'All Gender' if you want to
                            target all genders
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                            Select Religion
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='religion'
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => (
                              <Select
                                aria-labelledby='religion'
                                isInvalid={!!errors.religion}
                                errorMessage={errors?.religion?.message}
                                selectedKeys={field.value ? [field.value] : []}
                                className="grow shrink basis-0 rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                                placeholder='Select Religion'
                                isLoading={isReligionLoading}
                                {...field}
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
                                  ],
                                }}
                              >
                                {religions?.map((religion) => (
                                  <SelectItem key={religion} value={religion}>
                                    {religion}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink  basis-0 text-[10px] font-normal font-['Manrope']">
                            You can target people of a particular religion or
                            belief. Your advert and task will be shown to the
                            particular religion you select. Select 'All
                            Religion' if you want to target all religion
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch rounded-md flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                            Enter Advert Task or Caption
                          </div>
                        </div>

                        <Textarea
                          {...register('caption', {
                            required: true
                          })}
                          isInvalid={!!errors.caption}
                          errorMessage={errors?.caption?.message}
                          placeholder='Caption'
                          className=" self-stretch grow shrink basis-0 px2 py3.5  bg-opacity-30 rounded justify-start items-start gap-2 inline-flex text-[12.83px] font-normal font-['Manrope']"
                        />

                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0  text-[10px] font-normal font-['Manrope']">
                            Please enter the advert text or caption. The advert
                            text or caption should be well detailed. You can
                            also include a link to your site, a phone number for
                            people to contact you or any information you want
                            people to see on your advert
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='self-stretch  flex-col justify-start items-start gap-3 flex'>
                      <div className='px-2 justify-center items-center gap-2 inline-flex'>
                        <div className="text-center text-[12.83px] font-medium font-['Manrope']">
                          Choose one of the Advert Media Upload Below:
                        </div>
                      </div>
                      <div className='justify-start items-center gap-[11px] inline-flex'>
                        {mediaType.map((media, index) => (
                          <p
                            onClick={() => setMediaType(media)}
                            key={index}
                            className={` flex flex-row items-center gap-x-2 px-2 py-1 bg-zinc-400 bg-opacity-30 w-28 ${
                              isMediaType === media
                                ? 'border border-fuchsia-400 text-fuchsia-400'
                                : ''
                            }`}
                          >
                            {media === 'Photo' && (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                              >
                                <path
                                  d='M2.50466 6.66667C2.5 7.01051 2.5 7.39635 2.5 7.83333V12.1667C2.5 14.0335 2.5 14.9669 2.86331 15.68C3.18289 16.3072 3.69282 16.8171 4.32003 17.1367C5.03307 17.5 5.96649 17.5 7.83333 17.5H12.1667C12.6037 17.5 12.9895 17.5 13.3333 17.4953M2.50466 6.66667C2.51991 5.54158 2.58504 4.86616 2.86331 4.32003C3.18289 3.69282 3.69282 3.18289 4.32003 2.86331C5.03307 2.5 5.96649 2.5 7.83333 2.5H12.1667C14.0335 2.5 14.9669 2.5 15.68 2.86331C16.3072 3.18289 16.8171 3.69282 17.1367 4.32003C17.5 5.03307 17.5 5.96649 17.5 7.83333V12.1667C17.5 13.4282 17.5 14.2635 17.3879 14.8925M2.50466 6.66667L6.67133 10.8333M13.3333 17.4953C14.4584 17.4801 15.1338 17.415 15.68 17.1367C16.3072 16.8171 16.8171 16.3072 17.1367 15.68C17.2545 15.4488 17.3341 15.1944 17.3879 14.8925M13.3333 17.4953L6.67133 10.8333M6.67133 10.8333L7.73726 9.7674C8.52929 8.97537 8.92531 8.57935 9.38197 8.43097C9.78365 8.30046 10.2163 8.30046 10.618 8.43097C11.0747 8.57935 11.4707 8.97537 12.2627 9.7674L17.3879 14.8925M14.175 5.83333H14.1583'
                                  // stroke='#FF6DFB'
                                  stroke={
                                    isMediaType === 'Photo'
                                      ? '#FF6DFB'
                                      : '#B1B1B1'
                                  }
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                />
                              </svg>
                            )}
                            {media === 'Video' && (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                              >
                                <path
                                  d='M15.0001 6.66683L17.298 6.09236C17.8239 5.96087 18.3334 6.35867 18.3334 6.90081V13.0995C18.3334 13.6417 17.8239 14.0395 17.298 13.908L15.0001 13.3335M7.00008 16.6668H9.66675C11.5336 16.6668 12.467 16.6668 13.1801 16.3035C13.8073 15.9839 14.3172 15.474 14.6368 14.8468C15.0001 14.1338 15.0001 13.2003 15.0001 11.3335V8.66683C15.0001 6.79999 15.0001 5.86657 14.6368 5.15353C14.3172 4.52632 13.8073 4.01639 13.1801 3.69681C12.467 3.3335 11.5336 3.3335 9.66675 3.3335H7.00008C5.13324 3.3335 4.19982 3.3335 3.48678 3.69681C2.85957 4.01639 2.34964 4.52632 2.03006 5.15353C1.66675 5.86657 1.66675 6.79999 1.66675 8.66683V11.3335C1.66675 13.2003 1.66675 14.1338 2.03006 14.8468C2.34964 15.474 2.85957 15.9839 3.48678 16.3035C4.19982 16.6668 5.13324 16.6668 7.00008 16.6668Z'
                                  stroke={
                                    isMediaType === 'Video'
                                      ? '#FF6DFB'
                                      : '#B1B1B1'
                                  }
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                />
                              </svg>
                            )}
                            {media}
                          </p>
                        ))}
                      </div>
                      <div className='md:w-[559px] h-6 text-[10px] font-normal font-Manrope'>
                        Upload a Photo of the Advert You want people to post on
                        their social media post accounts like Whatsapp,
                        Facebook, Instagram, Twitter etc
                      </div>

                      {imageUrl ? (
                        <div className='flex flex-row items-center gap-x-4'>
                          {previewUrls?.map((url, index) => (
                            <div key={index} className='relative group'>
                              {isMediaType === 'Photo' ? (
                                <Image src={url} className='w-24' alt='' />
                              ) : (
                                <video width='240' height='180' controls>
                                  <source src={url} type='video/mp4' />
                                </video>
                              )}
                              <button
                                type='button'
                                className='absolute top-0 z-20 right-0 h-6 w-6 bg-red-500 text-white py-0 rounded-full opacity-0 group-hover:opacity-100'
                                onClick={() => handleDelete(index)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div onClick={() => setError('media', {
                            type: 'manual',
                            message: ''
                          })} className='w-[243px] h-[148.59px] opacity-40 dark:bg-white bg-stone-900 justify-center items-center inline-flex'>
                        <input
                          type='file'
                          multiple
                          id='image-upload'
                          name='media'
                          className='absolute bg-red-800 w-full opacity-0 cursor-pointer'
                          {...register('media')}
                          onChange={handleChange}
                        />
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='25'
                          height='24'
                          viewBox='0 0 25 24'
                          fill='none'
                        >
                          <path
                            d='M12.252 4V20M20.252 12L4.25195 12'
                            stroke='#FFD0FE'
                            strokeWidth='2'
                            strokeLinecap='round'
                          />
                        </svg>
                      </div>
                      {errors.media?.message ? 
                      <p className='text-red-800 text-sm'>{errors.media?.message}</p>
                      : ''
                    }
                    </div>
                  </div>
                  <div className='w-full px-3 py-6 bg-zinc-400 bg-opacity-30 rounded justify-between itemscenter flex flex-col'>
                    <div className="px-2 text-[12.83px] font-medium font-['Manrope']">
                      Total Pay
                    </div>
                    <div className='self-stretch px-2 md:justify-between items-center gap-2 inline-flex'>
                      <div className="w-40 text-3xl font-medium font-['Manrope']">
                      {calculatedAmount > 0 ? ` ₦${calculatedAmount?.toLocaleString()}` : '0'}
                      </div>
                      <Button
                        type='submit'
                        isDisabled={isPending}
                        className='md:w-[290px] text-white cursor-pointer px-6 py-6 bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex'
                      >
                        {isPending ? <Loader /> : 'Submit and Pay'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {isOpen && (
        <AdvertPaymentModal
          isOpen={isOpen}
          onClose={onClose}
          amount={calculatedAmount}
          onSuccess={handlePaymentSuccess}
          onWalletPaymentSuccess={handlePaymentTenditSuccess}
          isPending={isPending}
        />
      )}
    </>
  )
}
