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
  platforms,
} from '../../../utilities/data'
import AdvertPaymentModal from './AdvertPaymentModal'
import IgPageHeader from './IgPageHeader'
import { Controller, useForm } from 'react-hook-form'
import { useGetCountry, useGetReligion } from '../../../api/locationApis'
import toast from 'react-hot-toast'
import { useState } from 'react'
import {
  useCreateAdvert,
  useCreateAdvertPaymentWallet,
} from '../../../api/advertApi'
import { useNavigate } from 'react-router-dom'

export default function CreateIgEngageTask() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageUrl, setImageUrl] = useState('')
  const [media, setMedia] = useState(null)

  const base = 150

  const [amount, setAmount] = useState(base)
  const [count, setCount] = useState(1)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    // watch,
    // setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({})
  const { data: countries, isLoading: isCountryLoading } = useGetCountry()
  const { data: religions, isLoading: isReligionLoading } = useGetReligion()
  const { mutateAsync: createAdvert, isPending } = useCreateAdvert()
  const { mutateAsync: createAdvertWithWallet } = useCreateAdvertPaymentWallet()
  const calculatedAmount = watch().posts_count * base
  const handleChange = async ({ target }) => {
    const { name } = target

    if (name === 'media') {
      const file = target.files[0]

      if (!file) {
        return // No file selected, do nothing
      }

      const allowedTypes = ['image/*', 'video/*']
      const maxFileSize = 20 * 1024 * 1024 // 10 MB in bytes

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
          `File size exceeds the limit (10MB). Please choose a smaller file.`,
          {
            duration: 5000,
          }
        )
      }

      // If the file is valid, set the image URL, log the file, and set the image state
      setImageUrl(URL.createObjectURL(file))
      setMedia(file)

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

  const onSubmit = async () => {
    onOpen()
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
      formData.append('amount', amount)
      formData.append('engagements_count', data.posts_count)
      formData.append('posts_count', data.posts_count)
      formData.append('gender', data.gender)
      formData.append('caption', data.caption)
      formData.append('religion', data.religion)
      formData.append('goal', data.phone)
      formData.append('account_link', data.phone)

      // Update the amount state
      setAmount(calculatedAmount)
      data.amount = calculatedAmount
      console.log(data, 'data')
      const res = await createAdvert(formData)
      console.log(res, 'res')
      if (res?.data.status) {
        toast.success(res.data.message, {
          position: 'top-right',
          duration: 20000,
        })
        const authorizationUrl = res?.data?.authorization_url
        if (authorizationUrl) {
          localStorage.setItem('paystack_redirect', window.location.pathname)
          window.open(authorizationUrl) // Open the URL in a new tab
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        position: 'top-right',
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
      formData.append('amount', amount)
      formData.append('engagements_count', data.posts_count)
      formData.append('posts_count', data.posts_count)
      formData.append('gender', data.gender)
      formData.append('caption', data.caption)
      formData.append('religion', data.religion)
      formData.append('goal', data.phone)
      formData.append('account_link', data.phone)

      // Update the amount state
      setAmount(calculatedAmount)
      data.amount = calculatedAmount
      console.log(data, 'data')
      const res = await createAdvertWithWallet(formData)
      console.log(res, 'res')
      if (res?.data.status) {
        toast.success(res.data.message, {
          position: 'top-right',
          duration: 20000,
        })
        navigate('dashboard/advertise-history')
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        position: 'top-right',
        duration: 20000,
      })
    }
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='p-3 bg-white dark:bg-zinc-900 flex-col justify-start items-start gap-3 inline-flex'>
            <div className='self-stretch grow shrink basis-0 flex-col justify-start items-start gap-4 flex'>
              <div className='w-full'>
                <IgPageHeader />
              </div>
              <div className='self-stretch  mt-8 grow shrink basis-0 flex-col justify-start items-start gap-4 flex'>
                <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                  <div className="dark:text-white text-stone-900 text-2xl font-medium font-['Manrope']">
                    Create Advert Task
                  </div>
                </div>
                <div className='self-stretch grow shrink basis-0 px-16 py-6 flex-col justify-start items-start gap-12 flex'>
                  <div className='self-stretch grow shrink basis-0 flex-col justify-start items-start gap-6 flex'>
                    <div className='self-stretch  flex-col justify-start items-center gap-3.5 flex'>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                            Select Platform
                          </div>
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
                                  popoverContent: [
                                    'dark:bg-zinc-700',
                                    'bg-white ',
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
                                {platforms.map((platform) => (
                                  <SelectItem
                                    key={platform.value}
                                    value={platform.value}
                                  >
                                    {platform.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
                        <div className='justify-center items-center gap-2 inline-flex'>
                          <div className="text-center dark:text-white text-stone-900 text-[10px] font-normal font-['Manrope']">
                            Please select the social media or App Store platform
                            where you want to perform this action
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                            Select Location
                          </div>
                        </div>
                        <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                          <Controller
                            name='target_country'
                            control={control}
                            aria-labelledby='target_country'
                            render={({ field }) => (
                              <Select
                                aria-labelledby='target_country'
                                isInvalid={!!errors.target_country}
                                errorMessage={errors?.target_country?.message}
                                isLoading={isCountryLoading}
                                selectedKeys={field.value ? [field.value] : []}
                                className="grow shrink basis-0 dark:text-white text-black  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                                placeholder='Select country'
                                classNames={{
                                  listbox: [
                                    'bg-transparent',
                                    'text-black/90 dark:text-white/90',
                                    'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                                  ],
                                  popoverContent: [
                                    'dark:bg-zinc-700',
                                    'bg-white ',
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
                          <div className="text-center dark:text-white text-stone-900 text-[10px] font-normal font-['Manrope']">
                            This is the desired Number of Whatsapp Status Advert
                            Posts you want us to get for you.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                            Number of WhatsApp Status post you want
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                                onChange={(e) => {
                                  setCount(e.target.value)
                                }}
                                placeholder='Enter the number of view you want'
                                {...field}
                                className="grow shrink basis-0  rounded text-stone-900 text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink dark:text-white basis-0 text-stone-900 text-[10px] font-normal font-['Manrope']">
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
                          <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                            Select Gender
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
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
                                className="grow shrink basis-0 dark:text-white text-black  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                                placeholder='Select Gender'
                                classNames={{
                                  listbox: [
                                    'bg-transparent',
                                    'text-black/90 dark:text-white/90',
                                    'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                                  ],
                                  popoverContent: [
                                    'dark:bg-zinc-700',
                                    'bg-white ',
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
                          <div className="grow shrink dark:text-white basis-0 text-stone-900 text-[10px] font-normal font-['Manrope']">
                            You can target and select a particular location
                            where your task or advert will be mostly shown.
                            Select 'All Nigeria' if you want to target every
                            location in Nigeria
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                            Select Religion
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='religion'
                            control={control}
                            render={({ field }) => (
                              <Select
                                aria-labelledby='religion'
                                isInvalid={!!errors.religion}
                                errorMessage={errors?.religion?.message}
                                selectedKeys={field.value ? [field.value] : []}
                                className="grow shrink basis-0 dark:text-white text-black  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                                placeholder='Select Religion'
                                isLoading={isReligionLoading}
                                {...field}
                                classNames={{
                                  listbox: [
                                    'bg-transparent',
                                    'text-black/90 dark:text-white/90',
                                    'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                                  ],
                                  popoverContent: [
                                    'dark:bg-zinc-700',
                                    'bg-white ',
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
                          <div className="grow shrink dark:text-white basis-0 text-stone-900 text-[10px] font-normal font-['Manrope']">
                            You can target people of a particular religion or
                            belief. Your advert and task will be shown to the
                            particular religion you select. Select 'All
                            Religion' if you want to target all religion
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch rounded-md flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                            Enter Advert Task or Caption
                          </div>
                        </div>

                        <Textarea
                          {...register('caption')}
                          placeholder='Caption'
                          className="text-black  self-stretch grow shrink basis-0 px2 py3.5  bg-opacity-30 rounded justify-start items-start gap-2 inline-flex text-[12.83px] font-normal font-['Manrope']"
                        />

                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-stone-900 text-[10px] font-normal font-['Manrope']">
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
                        <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                          Choose one of the Advert Media Upload Below:
                        </div>
                      </div>
                      <div className='justify-start items-center gap-[11px] inline-flex'>
                        <div className='px-2 py-1 bg-zinc-400 bg-opacity-30 border border-fuchsia-400 justify-center items-center gap-1 flex'>
                          <input
                            type='file'
                            // accept='image/*'
                            id='image-upload'
                            name='media'
                            className='absolute hidden w-full opacity-0 cursor-pointer'
                            {...register('media')}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor='image-upload'
                            className="text-center dark:text-white cursor-pointer text-zinc-400 text-[10px] font-normal font-['Manrope']"
                          >
                            Photo
                          </label>
                        </div>
                        <div className='px-2 py-1 dark:text-white bg-zinc-400 bg-opacity-30 border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex'>
                          <input
                            type='file'
                            id='video-upload'
                            className='absolute w-full hidden opacity-0 cursor-pointer'
                            {...register('media')}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor='video-upload'
                            className="text-center cursor-pointer dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']"
                          >
                            Video
                          </label>
                        </div>
                      </div>
                      <div className="w-[559px] h-6 dark:text-white text-stone-900 text-[10px] font-normal font-['Manrope']">
                        Upload a Photo of the Advert You want people to post on
                        their social media post accounts like Whatsapp,
                        Facebook, Instagram, Twitter etc
                      </div>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          className=' w-36 objectcontain'
                          alt=''
                        />
                      ) : <div className='mt-4'>
                          <video width='240' height='180' controls>
                            <source src={imageUrl} type='video/mp4' />
                          </video>
                        </div> ? (
                        <div className='w-[243px] h-[148.59px] dark:bg-white opacity-50 bg-stone-900 justify-center items-center inline-flex'></div>
                      ) : null}
                    </div>
                  </div>
                  <div className='self-stretch px-3 py-2  bg-zinc-400 bg-opacity-30 rounded flex-col justify-center items-center gap-2 flex'>
                    <div className='w[68px] grow shrink basis-0 px-2 flex-col justify-center items-center gap-2 flex'>
                      <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                        Total Pay
                        {calculatedAmount}
                      </div>
                      {/* <Input
                        disabled
                        value={amount}
                        {...register('amount')}
                        className="text-stone-900 wfull text-3xl font-medium font-['Manrope']"
                      /> */}
                    </div>
                    <Button
                      type='submit'
                      // onClick={onOpen}
                      className='w-[290px]  cursor-pointer px-6 py-6 bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex'
                    >
                      <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                        {isPending ? 'Submiting....' : 'Submit and Pay'}
                      </div>
                    </Button>
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
        />
      )}
    </>
  )
}
