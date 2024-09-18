/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import { Button, Image, Input, Link, Snippet } from '@nextui-org/react'
import Icons from '../../../components/Icon'
import Igframe from '../../../assets/IGFrame131.svg'
import {
  useCalcelTask,
  usePerformTask,
  useSubmitPerformTask,
  usePreviewPerformTask,
} from '../../../api/earnApi'
import DownloadImageButton from '../../../components/DownloadButton'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import Timer from './Timer'
import { useQueryClient } from '@tanstack/react-query'
import trLogo from '../../../assets/tr-lg.svg'
import Loader from '../../Loader'
import { useParams } from 'react-router-dom'

export default function EarnAdvertTask() {
  const param = useParams()
  const taskId = param.taskId
  const { data: fetchTask } = usePreviewPerformTask(taskId)
  const [imageUrls, setImageUrls] = useState([])
  const [media, setMedia] = useState(null)
  const { mutateAsync: submitPerformTask, isPending } = useSubmitPerformTask()
  const { mutateAsync: calcelTask } = useCalcelTask()
  const [cancelLoading, setCancelLoading] = useState(false)

  const queryClient = useQueryClient()
  const {
    handleSubmit,

    watch,
    register,
    formState: { errors },
  } = useForm({})
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await Promise.all(
          fetchTask?.map(async (image) => {
            const response = await fetch(image.task.media_path)
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            return url
          })
        )
        setImageUrls(urls)
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchImages()
  }, [])

  const downloadAdvertImage = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    ;(link.download = filename), document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleChange = async ({ target }) => {
    const { name } = target

    if (name === 'screenshot') {
      const file = target.files[0]
      if (!file) {
        return // No file selected, do nothing
      }
      // If the file is valid, set the image URL, log the file, and set the image state
      setMedia(file)
      console.log(media, 'media')
    }
  }

  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      const data = watch()
      const formData = new FormData()
      // Append selected image to formData if available
      if (media) {
        formData.append('screenshot', media)
      }
      // fetchTask?.forEach((task) => {
      // Append reward_money and task_id_key for each task
      formData.append(`reward_money`, fetchTask?.reward_money)
      formData.append(`task_id_key`, fetchTask?.task?.task_key)
      // })
      data?.profile ? formData.append('account_name', data?.profile) : ''
      data?.link ? formData.append('post_link', data?.link) : ''
      // Append other form fields
      const res = await submitPerformTask(formData)
      console.log(res, 'form ress')
      if (res?.data.status) {
        queryClient.invalidateQueries(['perform_task', 'pending'])
        toast.success(res.data.message, {
          duration: 1000,
        })
        // navigate('/dashboard/earn-advert_fb-task')
        navigate('/dashboard/earn-history')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 1000,
      })
    }
  }

  const onCancel = async (id) => {
    setCancelLoading(true)
    try {
      const res = await calcelTask(id)
      if (res?.data.status) {
        queryClient.invalidateQueries(['perform_task', 'loading'])
        setCancelLoading(false)
        toast.success(res.data.message, {
          duration: 1000,
        })
        navigate('/dashboard/earn-history')
        // navigate('/dashboard/earn-advert_fb-task')
      }
    } catch (error) {
      console.log(error)
      setCancelLoading(false)
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 1000,
      })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' min-h-screen w-full p-3 flex-col justify-start items-start gap-3 inline-flex'>
          <div
            onClick={() => navigate(-1)}
            className='justify-start cursor-pointer items-center gap-[7px] inline-flex'
          >
            <div className='cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M18.9998 12H5.99985M10.9998 6L5.70696 11.2929C5.31643 11.6834 5.31643 12.3166 5.70696 12.7071L10.9998 18'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <div className='text-center text-primaryText text-sm font-medium font-Manrope'>
              Go back
            </div>
          </div>

          <>
            <div className='self-stretch relative pb-10 border border-white flex-col justify-start items-start flex'>
              <div className='self-stretch  p-6 bg-opacity-40  rounded-tl-lg rounded-tr-lg flex-col justify-start items-start gap-2 flex'>
                <div className='flex-col justify-start items-start gap-1.5 flex'>
                  <div className='self-stretch text-zinc-400 text-[10px] font-normal font-Manrope'>
                    {fetchTask?.task?.date_created}
                  </div>
                  <div className='capitalize text-3xl font-medium font-Manrope'>
                    {fetchTask?.task?.task_type === 'advert'
                      ? `Post advert on your ${fetchTask?.task?.platform} Page`
                      : (fetchTask?.task?.goal === 'comment' &&
                          `Comment on ${fetchTask?.task?.platform} Post`) ||
                        (fetchTask?.task?.goal === 'follow and like' &&
                          `Follow and Like ${fetchTask?.task?.platform} Page`) ||
                        (fetchTask?.task?.goal === 'follow' &&
                          `Follow ${fetchTask?.task?.platform} Page`) ||
                        (fetchTask?.task?.goal === 'like' &&
                          `Like ${fetchTask?.task?.platform} Post`)}
                  </div>
                  <div className='py-1.5 justify-start items-center gap-2 inline-flex'>
                    <div className='justify-start items-center gap-0.5 flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='17'
                        height='17'
                        viewBox='0 0 17 17'
                        fill='none'
                      >
                        <path
                          d='M14.168 7.0835H11.6888C11.4932 7.0835 11.3346 7.24206 11.3346 7.43766V10.271C11.3346 10.4666 11.4932 10.6252 11.6888 10.6252H14.168M14.168 7.0835H15.2305C15.4261 7.0835 15.5846 7.24206 15.5846 7.43766V10.271C15.5846 10.4666 15.4261 10.6252 15.2305 10.6252H14.168M14.168 7.0835V5.10016C14.168 4.30675 14.168 3.91005 14.0136 3.60701C13.8777 3.34045 13.661 3.12372 13.3945 2.9879C13.0914 2.8335 12.6947 2.8335 11.9013 2.8335H3.68464C2.89123 2.8335 2.49452 2.8335 2.19148 2.9879C1.92492 3.12372 1.7082 3.34045 1.57238 3.60701C1.41797 3.91005 1.41797 4.30675 1.41797 5.10016V11.9002C1.41797 12.6936 1.41797 13.0903 1.57238 13.3933C1.7082 13.6599 1.92492 13.8766 2.19148 14.0124C2.49452 14.1668 2.89123 14.1668 3.68464 14.1668H11.9013C12.6947 14.1668 13.0914 14.1668 13.3945 14.0124C13.661 13.8766 13.8777 13.6599 14.0136 13.3933C14.168 13.0903 14.168 12.6936 14.168 11.9002V10.6252'
                          // stroke='black'
                          className='stroke-gray-400'
                        />
                      </svg>
                      <div className='opacity-50 capitalize text-[12px] font-medium font-Manrope'>
                        earning
                      </div>
                    </div>
                    <div className=' text-sm font-bold font-Manrope'>
                      {fetchTask?.task?.task_type === 'advert'
                        ? fetchTask?.task?.platform === 'whatsapp'
                          ? '#60 per Advert post'
                          : ` ₦110 per Advert post`
                        : (fetchTask?.task?.goal === 'comment' &&
                            ` ₦20 per comment`) ||
                          (fetchTask?.task?.goal === 'follow and like' &&
                            ` ₦3.5 per follow and like`) ||
                          (fetchTask?.task?.goal === 'follow' &&
                            `₦3.5 per follow`) ||
                          (fetchTask?.task?.goal === 'like' && `₦3.5 per like`)}
                    </div>
                  </div>
                  {/* <div className='self-stretch justify-start items-start gap-3 inline-flex'>
                      <div className='text-[#FFA2A2] text-[9px] font-normal font-Manrope uppercase tracking-tight'>
                        Note: That you must have at Least 500 followers to be
                        able to Generate this task
                    </div>
                  </div> */}
                  {/* <div className='w-40 hidden md:w-[304.97px] origin-top-left  absolute right-0 top-0 justify-start items-start gap-[115.18px] md:inline-flex'>
                    <Image
                      src={trLogo}
                      alt='igFrme'
                      className='h- md:h-[10.1rem]'
                    />
                  </div> */}
                </div>
                <div className='self-stretch p-3 bg-sky-100 justify-start items-start gap-[29px] inline-flex'>
                  <div className='grow shrink basis-0 justify-start items-center gap-2.5 flex'>
                    <div className='grow shrink basis-0 text-blue-600 text-xs font-normal font-Manrope'>
                      {fetchTask?.task?.task_type === 'advert'
                        ? 'You must not delete the post after posting. Your MacketIT³ account will be suspended once you delete the post'
                        : ` You must NOT UNLIKE, UNFOLLOW or DELETE comment on the ${fetchTask?.task?.platform}{' '}
                      page or post after you have liked and followed the page or commented on the post. Your
                      MacketIT³ account will be suspended once you UNLIKE or
                      UNFOLLOW the ${fetchTask?.task?.platform} Page `}
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <path
                        d='M10.0013 13.3413V9.17464M10.0013 6.67464V6.66631M18.3346 9.99984C18.3346 14.6022 14.6037 18.3332 10.0013 18.3332C5.39893 18.3332 1.66797 14.6022 1.66797 9.99984C1.66797 5.39746 5.39893 1.6665 10.0013 1.6665C14.6037 1.6665 18.3346 5.39746 18.3346 9.99984Z'
                        stroke='#1877F2'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='w-full m-auto'>
                <Timer
                  onDone={() => onCancel(fetchTask?.key)}
                  started_at={fetchTask?.started_at}
                />
              </div>
              <div className='w-full flex flex-col gap-y-4 lg:flex-row items-center justify-around mb-10'>
                {fetchTask?.task?.task_type === 'advert' ? (
                  <div className='bg-zinc-800 bg-opacity-40 sm:h-[678px] flex flex-col gap-y-6 py-10 items-center lg:w-6/12 w-11/12'>
                    <h1 className='text-[24px]'>Task</h1>
                    <div className='text-[12px] font-semibold flex flex-col gap-y-6 px-4'>
                      Please follow the step-by-step instructions below to do
                      your task:
                      <p>
                        Step 1: Open {fetchTask?.task?.platform} on your Mobile
                        App or browser
                      </p>
                      <p>
                        Step 2: Create a post, copy the information below on the
                        description of the advert which you are meant to post on
                        your page.
                      </p>
                      <p>
                        Step 3: Add the image or video provided for the advert.
                        Make sure it's high-quality and visually appealing and
                        post it on your page
                      </p>
                      <p>
                        Step 4: After you have created the new post, then you
                        will comeback to this page and upload the proof of work,
                        which is the link to your profile on{' '}
                        {fetchTask?.task?.platform} and the link to the{' '}
                        {fetchTask?.task?.platformn} post which you have created
                      </p>
                    </div>
                    <div className='flex flex-col text-[12px] gap-y-4 px-4'>
                      <h2 className='font-bold'>Advert Image/Video</h2>
                      <p className='text-black dark:text-[#B1B1B1] w-11/12'>
                        Download the advert image or videos using the download
                        button below and also copy the advert test as seen below
                        and upload it to your{' '}
                        {fetchTask?.task?.platform?.charAt(0).toUpperCase() +
                          fetchTask?.task?.platform?.slice(1)}{' '}
                        Page
                      </p>
                      <div
                        className='bg-[#FF6DFB] w-[136px] rounded-lg text-center py-2 px-4'
                        onClick={() =>
                          fetchTask?.task?.media_path
                            ? downloadAdvertImage(
                                fetchTask?.task?.media_path,
                                'advert-file.png'
                              )
                            : toast.error('No media path provided')
                        }
                      >
                        Download Advert
                      </div>
                    </div>
                    <span className='self-start px-4'>Advert text</span>
                    <div className='flex items-center justify-between text-[#B1B1B1] bg-[#FFFFFF] dark:bg-opacity-10 py-4 px-4 w-full'>
                      <div className='text-[10px] text-black dark:text-[#B1B1B1] font-semibold w-9/12'>
                        {fetchTask?.task?.caption}
                      </div>
                      <p
                        className='flex items-center gap-x-2 text-[10px] font-bold text-primaryText'
                        onClick={() => (
                          navigator.clipboard.writeText(
                            fetchTask?.task?.caption
                          ),
                          toast.success('Caption copied')
                        )}
                      >
                        <Icons type='copy' stroke='#FF6DFB' />
                        <span className='sm:flex hidden font-bold'>
                          Copy text
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='bg-zinc-800 bg-opacity-40 sm:h-[478px] flex flex-col gap-y-6 py-10 items-center lg:w-6/12 w-11/12'>
                    <h1 className='text-[24px]'>Task</h1>
                    <div className='text-[12px] font-semibold flex flex-col gap-y-6 px-4'>
                      Please follow the step-by-step instructions below to do
                      your task:
                      <p>
                        Step 1: Open the Task Link below on your{' '}
                        {fetchTask?.task?.platform} Mobile App or browser
                      </p>
                      <p>
                        Step 2: The link will direct you to a{' '}
                        {fetchTask?.task?.platform} Page or Post which you are
                        meant to
                        {fetchTask?.task?.goal === 'comment' && 'comment'}
                        {fetchTask?.task?.goal === 'like' && 'like'}
                        {fetchTask?.task?.goal === 'follow' && 'follow'}
                        {fetchTask?.task?.goal === 'follow and like' &&
                          'like andd follow'}
                      </p>
                      <p>
                        Step 3:
                        {fetchTask?.task?.goal !== 'comment'
                          ? `
                                      Click on the Like or Follow button on the ${fetchTask?.task?.platform} Page to like or follow the page. You MUST NOT Unfollow the account after you have followed the account.
                                    `
                          : `Click on the comment icon or button to comment on the ${fetchTask?.task?.platform} post. You mut not delete the comment after you have commented on the post`}
                      </p>
                      <p>
                        Step 4:
                        {fetchTask?.task?.goal !== 'comment'
                          ? `Create a screenshot of the page that shows you have liked or followed the page and upload the screenshot under the Proof of Work Form. You are also required to enter your ${fetchTask?.task?.platform} Username or Name which you used to perform the task`
                          : `Create a screenshot of the post that shows you have commented on the post and upload the screenshot under the Proof of Work Form below. You are also required to enter your ${fetchTask?.tak?.platform} Username or Name which you used to perform the task`}
                      </p>
                    </div>
                    <div className='flex items-center justify-between text-black dark:text-[#B1B1B1] bg-[#FFFFFF] py-4 px-4 w-full dark:bg-opacity-10'>
                      <div className='w-9/12 text-[10px]'>
                        {fetchTask?.task?.account_link}
                      </div>
                      <a
                        href={fetchTask?.task?.account_link}
                        className='flex items-center gap-x-2 text-[10px] font-bold text-primaryText'
                        target='_blank'
                      >
                        <Icons type='visit-link' />
                        <span className='sm:flex hidden font-bold'>
                          Visit link
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {fetchTask?.task?.task_type === 'advert' ? (
                  <div className='bg-zinc-800 bg-opacity-40 sm:h-[678px] px-4 flex flex-col gap-y-6 py-10 items-center lg:w-5/12 w-11/12'>
                    <h1 className='text-[24px]'>Upload Proof</h1>
                    {fetchTask?.task?.platform === 'whatsapp' ? (
                      <div className='w-[243px] h-40 opacity-50 bg-neutral-800 justify-center items-center inline-flex mt-14 mb-14'>
                        <div className='px-2 py-1 absolute left-50 z-30  w-12 bg-zinc-400 bg-opacity-30 border border-fuchsia-400 justify-center items-center gap-1 flex'>
                          <input
                            type='file'
                            id='image-upload'
                            name='media'
                            className='absolute hidden w-full opacity-0 cursor-pointer'
                            {...register('screenshot')}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor='image-upload'
                            className='text-center cursor-pointer text-zinc-400 text-[10px] font-normal font-Manrope'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                            >
                              <path
                                d='M12 4V20M20 12L4 12'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                              />
                            </svg>
                          </label>
                        </div>
                        {media && (
                          <Image
                            src={URL.createObjectURL(media)}
                            alt='Preview'
                            className='w-full h-full object-cover'
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        <div className='text-[12px] flex flex-col gap-y-2 w-full font-bold'>
                          Enter the link to your{' '}
                          {fetchTask?.task?.platform?.charAt(0).toUpperCase() +
                            fetchTask?.task?.platform?.slice(1)}{' '}
                          profile
                          <Input
                            className='text-white'
                            errorMessage={errors?.link?.message}
                            placeholder='Enter the link'
                            {...register('link', {
                              required: true,
                              validate: {
                                isValidLink: (fieldValue) => {
                                  return (
                                    fieldValue.startsWith(
                                      `https://${fetchTask?.task?.platform}.`
                                    ) ||
                                    fieldValue.startsWith(
                                      `https://www.${fetchTask?.task?.platform}.`
                                    ) ||
                                    (fetchTask?.task?.platform === 'facebook'
                                      ? fieldValue.startsWith('https://fb.') ||
                                        fieldValue.startsWith(
                                          `https://www.facebook.`
                                        ) ||
                                        fieldValue.startsWith(`https://www.fb.`)
                                      : '') ||
                                    (fetchTask.task?.platform === 'x'
                                      ? fieldValue.startsWith(
                                          'https://twitter.'
                                        ) ||
                                        fieldValue.startsWith(
                                          `https://www.twitter.`
                                        ) ||
                                        fieldValue.startsWith(`https://www.x.`)
                                      : '') ||
                                    'Link not valid'
                                  )
                                },
                              },
                            })}
                          />
                        </div>
                        <div className='text-[12px] flex flex-col gap-y-2 w-full font-bold'>
                          Enter the link to the advert post which you created on{' '}
                          {fetchTask?.task?.platform?.charAt(0).toUpperCase() +
                            fetchTask?.task?.platform?.slice(1)}
                          <Input
                            className='text-white'
                            errorMessage={errors?.profile?.message}
                            placeholder='Enter the link'
                            {...register('profile', {
                              required: true,
                              validate: {
                                isValidLink: (fieldValue) => {
                                  return (
                                    fieldValue.startsWith(
                                      `https://${fetchTask?.task?.platform}.`
                                    ) ||
                                    fieldValue.startsWith(
                                      `https://www.${fetchTask?.task?.platform}.`
                                    ) ||
                                    (fetchTask.task?.platform === 'facebook'
                                      ? fieldValue.startsWith('https://fb.') ||
                                        fieldValue.startsWith(
                                          `https://www.facebook.`
                                        ) ||
                                        fieldValue.startsWith(`https://www.fb.`)
                                      : '') ||
                                    (fetchTask?.task?.platform === 'x'
                                      ? fieldValue.startsWith(
                                          'https://twitter.'
                                        ) ||
                                        fieldValue.startsWith(
                                          `https://www.twitter.`
                                        ) ||
                                        fieldValue.startsWith(`https://www.x.`)
                                      : '') ||
                                    'Link not valid'
                                  )
                                },
                              },
                            })}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className=' p-3 bg-zinc-800 bg-opacity-40 rounded-lg sm:h-[478px] flex-col justify-start sm:w-11/12 lg:w-5/12 items-center gap-10 inline-flex'>
                    <div className='self-stretch py-6 flex-col justify-start items-center gap-3 flex'>
                      <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                        <div className='grow shrink basis-0 text-center text-white text-2xl font-medium font-Manrope'>
                          Upload proof
                        </div>
                      </div>
                    </div>
                    <div className=' flex-col justify-start items-center -mt-6 gap-8 flex'>
                      <div className='w-[243px] opacity-50 bg-neutral-800 justify-center items-center inline-flex overflow-scroll'>
                        <div className='px-2 py-1 absolute left-50 z-30  w-12 bg-zinc-400 bg-opacity-30 border border-fuchsia-400 justify-center items-center gap-1 flex'>
                          <input
                            type='file'
                            id='image-upload'
                            name='media'
                            className='absolute hidden w-full opacity-0 cursor-pointer'
                            {...register('screenshot')}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor='image-upload'
                            className='text-center cursor-pointer text-zinc-400 text-[10px] font-normal font-Manrope'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                            >
                              <path
                                d='M12 4V20M20 12L4 12'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                              />
                            </svg>
                          </label>
                        </div>
                        {media && (
                          <Image
                            src={URL.createObjectURL(media)}
                            alt='Preview'
                            className='w-full h-40 object-cover'
                          />
                        )}
                      </div>

                      <div className='self-stretch flex-col justify-start items-start gap-3 flex'>
                        <div
                          className={`${
                            fetchTask?.task?.platform === 'whatsapp'
                              ? 'hidden'
                              : 'grid'
                          }  self-stretch flex-col justify-start items-start gap-3 flex`}
                        >
                          <div className='self-stretch text-left text-xs font-semibold font-Manrope mt-10'>
                            Please enter the name on your{' '}
                            {fetchTask?.task?.platform} account that performed
                            this task
                          </div>
                          <Input
                            placeholder='Enter your username'
                            size='sm'
                            className='grow self-stretch text-white rounded-none gap-1 inline-flex shrink basis-0 text-black text-[12.83px] font-normal font-Manrope'
                            {...register('profile', {
                              required: true,
                            })}
                          />
                        </div>
                        <div className='self-stretch justify-between items-center inline-flex'>
                          {/* <div className='p-2 primaryBg bg-opacity-10 rounded-md border border-violet-1000 border-opacity-25 justify-center items-center gap-1 flex'>
                                <label
                                  htmlFor='image-upload'
                                  className='text-center  cursor-pointer text-[10px] font-medium font-Manrope'
                                >
                                  Upload Proof
                                </label>
                              </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {fetchTask?.task?.task_type === 'advert' ? (
                <div className='flex items-center gap-x-4 w-full justify-between px-4'>
                  <Button
                    type='submit'
                    isDisabled={cancelLoading}
                    onClick={(e) => (
                      e.preventDefault(), onCancel(fetchTask?.key)
                    )}
                    className='md:w-[290px] px-6 opacity-80 py-3.5 bg-red-400 rounded-[100px] justify-center items-center gap-2 inline-flex'
                  >
                    <div className='text-center text-white text-[12.83px] font-medium font-Manrope'>
                      {cancelLoading ? <Loader /> : 'Cancel'}
                    </div>
                  </Button>
                  <Button
                    type='submit'
                    isDisabled={isPending}
                    className='md:w-[290px] px-6 py-3.5 bg-emerald-200 rounded-[100px] justify-center items-center gap-2 inline-flex'
                  >
                    <div className='text-center text-black text-[12.83px] font-medium font-Manrope'>
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
                        'Mark as Done'
                      )}
                    </div>
                  </Button>
                </div>
              ) : (
                <div className='self-stretch h-[43px]  justify-between px-4 items-end gap-2 flex'>
                  <Button
                    type='submit'
                    isDisabled={cancelLoading}
                    onClick={(e) => (
                      e.preventDefault(), onCancel(fetchTask?.key)
                    )}
                    className='md:w-[290px] px-6 opacity-80 py-3.5 bg-red-400 rounded-[100px] justify-center items-center gap-2 inline-flex'
                  >
                    <div className='text-center text-white text-[12.83px] font-medium font-Manrope'>
                      {cancelLoading ? <Loader /> : 'Cancel'}
                    </div>
                  </Button>
                  <Button
                    type='submit'
                    isDisabled={isPending}
                    className='md:w-[290px] px-6 py-3.5 bg-emerald-200 rounded-[100px] justify-center items-center gap-2 inline-flex'
                  >
                    <div className='text-center text-black text-[12.83px] font-medium font-Manrope'>
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
                        'Mark as Done'
                      )}
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </>
          <div className='self-stretch p-3 justify-end items-end inline-flex'>
            <div className='justify-start items-center gap-[7px] flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='21'
                height='20'
                viewBox='0 0 21 20'
                fill='none'
              >
                <path
                  d='M10.748 13.3417V9.17507M10.748 6.67507V6.66673M4.36458 5.35227L9.9148 2.14785C10.4305 1.85013 11.0658 1.85013 11.5815 2.14785L17.1317 5.35227C17.6473 5.64999 17.965 6.2002 17.965 6.79564V13.2045C17.965 13.7999 17.6473 14.3501 17.1317 14.6479L11.5815 17.8523C11.0658 18.15 10.4305 18.15 9.9148 17.8523L4.36458 14.6479C3.84892 14.3501 3.53125 13.7999 3.53125 13.2045V6.79564C3.53125 6.2002 3.84892 5.64999 4.36458 5.35227Z'
                  stroke='#FF3D00'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
              <div className='text-center text-orange-600 text-sm font-medium font-Manrope'>
                Report Task
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
