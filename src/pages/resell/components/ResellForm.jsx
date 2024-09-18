/* eslint-disable react/no-unescaped-entities */

import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
  // useDisclosure,
} from '@nextui-org/react'

import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
// import {
//   useCreateAdvert,
//   useCreateAdvertPaymentWallet,
// } from '../../../api/advertApi'
import IgPageHeader from '../../advertise/components/IgPageHeader'
// import AdvertPaymentModal from '../../advertise/components/AdvertPaymentModal'
import { catigories, return_Policies } from './data'
import { useSellProduct } from '../../../api/resellApi'

export default function ResellForm() {
  const [imageUrl, setImageUrl] = useState('')
  const [media, setMedia] = useState(null)

  const [count, setCount] = useState(1)

  const {
    handleSubmit,
    control,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({})
  const { mutateAsync: createProduct, isPending } = useSellProduct()
  const handleChange = async ({ target }) => {
    const { name } = target

    if (name === 'item_img') {
      const file = target.files[0]
      if (!file) {
        return // No file selected, do nothing
      }
      const allowedTypes = ['image/*']
      if (
        !allowedTypes.some((type) =>
          file.type.startsWith(type.replace('*', ''))
        )
      ) {
        return toast.error(`Invalid file type! Please select an image.`, {
          duration: 5000,
        })
      }
      // If the file is valid, set the image URL, log the file, and set the image state
      setImageUrl(URL.createObjectURL(file))
      setMedia(file)
    }
  }

  const onSubmit = async () => {
    try {
      const data = watch()
      const formData = new FormData()
      // Append selected image to formData if available
      if (media) {
        formData.append('item_img', media)
      }
      // Append other form fields
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data?.price)
      formData.append('category', data.category)
      formData.append('size', data.size)
      formData.append('color', data.color)
      formData.append('phone', data.phone)
      formData.append('material', data.material)
      formData.append('brand_name', data.brand_name)

      const res = await createProduct(formData)
      if (res?.data.status) {
        reset()
        toast.success(res.data.message, {
          position: 'top-right',
          duration: 20000,
        })
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
                  <div className="text-primaryText text-2xl font-medium font-['Manrope']">
                    Post your product
                  </div>
                </div>
                <div className='self-stretch grow shrink basis-0 px-16 py-6 flex-col justify-start items-start gap-12 flex'>
                  <div className='self-stretch grow shrink basis-0 flex-col justify-start items-start gap-6 flex'>
                    <div className='self-stretch  flex-col justify-start items-center gap-3.5 flex'>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Name
                          </div>
                        </div>

                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='name'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.name?.message}
                                isInvalid={!!errors?.name}
                                required={true}
                                placeholder='name'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </div>
                      </div>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Return Policy
                          </div>
                        </div>

                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='return_policy'
                            control={control}
                            render={({ field }) => (
                              <Select
                                placeholder='Return Policy'
                                aria-labelledby='return_policy'
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
                                {return_Policies.map((platform) => (
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
                      </div>
                      <div className='self-stretch  flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Category
                          </div>
                        </div>
                        <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                          <Controller
                            name='category'
                            control={control}
                            render={({ field }) => (
                              <Select
                                aria-labelledby='category'
                                isInvalid={!!errors.category}
                                errorMessage={errors?.category?.message}
                                selectedKeys={field.value ? [field.value] : []}
                                className="grow shrink basis-0 dark:text-white text-black  rounded  text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                                placeholder='category'
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
                                {catigories?.map((cou) => (
                                  <SelectItem key={cou.value} value={cou.value}>
                                    {cou.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Phone
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.phone?.message}
                                isInvalid={!!errors?.phone}
                                required={true}
                                placeholder='phone'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Please enter the available phone number you want
                            your buyers to call you on. Make sure you enter the
                            right number.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Enter Brand Name
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='brand_name'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.brand_name?.message}
                                isInvalid={!!errors?.brand_name}
                                placeholder='brand name'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Please enter the available colours you want your
                            buyers to choose from. Make sure you enter a comma
                            after each option. You can leave this field empty if
                            this does not apply to you.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Enter Available Colours
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='color'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.color?.message}
                                isInvalid={!!errors?.color}
                                placeholder='color'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Please enter the available colours you want your
                            buyers to choose from. Make sure you enter a comma
                            after each option. You can leave this field empty if
                            this does not apply to you.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Enter Available Sizes
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='size'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.posts_count?.message}
                                isInvalid={!!errors?.posts_count}
                                placeholder='size'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Please enter the available sizes you want your
                            buyers to choose from. Make sure you enter a comma
                            after each option. You can leave this field empty if
                            this does not apply to you.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Price
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='price'
                            control={control}
                            render={({ field }) => (
                              <Input
                                size='sm'
                                errorMessage={errors?.price?.message}
                                isInvalid={!!errors?.price}
                                required={true}
                                placeholder='Enter the number of view you want'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Please make sure your price is very affordable and
                            competitive. Good Products with Great prices get
                            massive sales within a short period of time.
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Quantities Left
                          </div>
                        </div>
                        <div className='self-stretch w-full bg-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                          <Controller
                            name='quntity_left'
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
                                placeholder='Quntity Left'
                                {...field}
                                className="grow shrink basis-0  rounded text-primaryText text-opacity-50 text-[12.83px] font-normal font-['Manrope']"
                              />
                            )}
                            rules={{ required: true }}
                          />
                        </div>
                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Please enter valid number of product quantities you
                            have left in your stock. You can update this value
                            frequently so buyers will know what you have in
                            stock.
                          </div>
                        </div>
                      </div>

                      <div className='self-stretch rounded-md flex-col justify-start items-start gap-[7px] flex'>
                        <div className='px-2 justify-center items-center gap-2 inline-flex'>
                          <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                            Description
                          </div>
                        </div>

                        <Textarea
                          {...register('description')}
                          placeholder='description'
                          className="text-black  self-stretch grow shrink basis-0 px2 py3.5  bg-opacity-30 rounded justify-start items-start gap-2 inline-flex text-[12.83px] font-normal font-['Manrope']"
                        />

                        <div className='self-stretch justify-center items-center gap-2 inline-flex'>
                          <div className="grow shrink basis-0 text-primaryText text-[10px] font-normal font-['Manrope']">
                            Your product description should be in paragraphs
                            (although it may include key points) and should
                            describe all the important details of the product.
                            It should include the USPs (unique selling points)
                            of the product and why people should buy it.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='self-stretch  flex-col justify-start items-start gap-3 flex'>
                      <div className='px-2 justify-center items-center gap-2 inline-flex'>
                        <div className="text-center text-primaryText text-[12.83px] font-medium font-['Manrope']">
                          Choose one of the Advert Media Upload Below:
                        </div>
                      </div>
                      <div className='justify-start items-center gap-[11px] inline-flex'>
                        <div className='px-2 py-1 bg-zinc-400 bg-opacity-30 border border-fuchsia-400 justify-center items-center gap-1 flex'>
                          <input
                            type='file'
                            // accept='image/*'
                            id='image-upload'
                            name='item_img'
                            className='absolute hidden w-full opacity-0 cursor-pointer'
                            {...register('item_img')}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor='image-upload'
                            className="text-center cursor-pointer text-zinc-400 text-[10px] font-normal font-['Manrope']"
                          >
                            Photo
                          </label>
                        </div>
                      </div>
                      <div className="w-[559px] h-6 text-primaryText text-[10px] font-normal font-['Manrope']">
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
                      ) : (
                        <div className='mt-4'>
                          <div className='w-[243px] h-[148.59px] opacity-50 bg-stone-900 justify-center items-center inline-flex'></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='self-stretch px-3 py-2 bg-zinc-400 bg-opacity-30 rounded flex-col justify-center items-center gap-2 flex'>
                    <Button
                      type='submit'
                      className='w-[290px]  cursor-pointer px-6 py-6 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
                    >
                      <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                        {isPending ? 'Submiting....' : 'Submit'}
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
