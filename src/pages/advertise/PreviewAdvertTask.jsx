/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */

import { useNavigate, useParams } from 'react-router-dom'
import { Image, Input, Link, Snippet } from '@nextui-org/react'
import { usePreviewTask } from '../../api/earnApi'
import trLogo from '../../assets/tr-lg.svg'
import spinner from '../../assets/spinner.gif'
import { format } from 'date-fns'
import API from '../../services/AxiosInstance'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import Loader from '../Loader'
import Icons from '../../components/Icon'
import toast from 'react-hot-toast'
import TaskPerformcers from './components/TaskPerformcers'

export default function PreviewAdvertTask() {
  const param = useParams()
  const navigate = useNavigate(false)
  const [loading, isLoading] = useState()
  const taskId = param.taskId
  // const { data: taskPreview } = usePreviewTask(taskId)
  const [taskPreview, setPreview] = useState()

  const getPreview = (key) => {
    isLoading(true)
    API.get(`user/tasks/${key}`)
      .then(
        (response) => (
          setPreview(response.data?.task),
          isLoading(false),
          toast.success(response.data.message),
          console.log(response)
        )
      )
      .catch((error) => (console.error(error), toast.error(error.message)))
  }

  const deleteTask = (task_id) => {
    API.delete(`/user/tasks/${task_id}`)
      .then(
        (response) => (
          toast.success(response.data.message),
          navigate('/dashboard/zadvertise-history')
        )
      )
      .catch((error) => toast.error(error.message))
  }

  useEffect(() => {
    getPreview(taskId)
  }, [])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='mb-8 w-full p-3 flex-col justify-start items-start gap-3 inline-flex'>
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
                    className='stroke-black dark:stroke-white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <div className="text-center text-primaryText text-xs font-medium font-['Manrope']">
                Go back
              </div>
            </div>

            {taskPreview && (
              <>
                <div className='self-stretch relative border border-white flex-col justify-start items-start flex'>
                  <div className='self-stretch  p-6 bg-opacity-40  rounded-tl-lg rounded-tr-lg flex-col justify-start items-start gap-2 flex'>
                    <div className='flex-col justify-start items-start gap-1.5 flex'>
                      <div className="self-stretch text-zinc-400 text-[10px] font-normal font-['Manrope']">
                        {taskPreview?.date_created
                          ? format(
                              new Date(taskPreview?.date_created),
                              'yyyy-MM-dd HH:mm'
                            )
                          : 'Loading...'}
                      </div>
                      <div className="capitalize text-3xl font-medium font-['Manrope']">
                        {taskPreview?.task_type === 'advert'
                          ? `Post Advert on your ${taskPreview?.platform} Page`
                          : (taskPreview?.goal === 'comment' &&
                              `Comment on ${taskPreview?.platform} Post`) ||
                            (taskPreview?.goal === 'follow and like' &&
                              `Follow and Like ${taskPreview?.platform} Page`) ||
                            (taskPreview?.goal === 'follow' &&
                              `Follow ${taskPreview?.platform} Page`) ||
                            (taskPreview?.goal === 'like' &&
                              `Like ${taskPreview?.platform} Post`)}
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
                          <div className="opacity-50 capitalize text-[12px] font-medium font-['Manrope']">
                            earning
                          </div>
                        </div>
                        <div className=" text-xs font-bold font-['Manrope']">
                          {taskPreview?.task_type === 'advert'
                            ? taskPreview?.platform === 'whatsapp'
                              ? '#80 per Advert post'
                              : ` ₦140 per Advert post`
                            : (taskPreview?.goal === 'comment' &&
                                ` ₦40 per comment`) ||
                              (taskPreview?.goal === 'follow and like' &&
                                ` ₦5 per follow and like`) ||
                              (taskPreview?.goal === 'follow' &&
                                `₦5 per follow`) ||
                              (taskPreview?.goal === 'like' && `₦5 per like`)}
                        </div>
                      </div>
                    </div>
                    {/* <div className='w-40 hidden md:w-[304.97px] origin-top-left  absolute right-0 top-0 justify-start items-start gap-[115.18px] md:inline-flex'>
                      <Image
                        src={trLogo}
                        alt='igFrme'
                        className='h- md:h-[10.1rem]'
                      />
                    </div> */}
                  </div>
                  <div
                    className={`self-stretch p-3 ${
                      taskPreview?.status === 'pending'
                        ? 'bg-sky-100'
                        : 'bg-[#ADFFB0]'
                    } justify-start items-start gap-[29px] inline-flex`}
                  >
                    {taskPreview?.status === 'pending' && (
                      <div className='grow shrink basis-0 justify-start items-center gap-2.5 flex'>
                        <div className="grow shrink basis-0 text-blue-600 text-xs font-normal font-['Manrope']">
                          Your task has not been approved and is not on our page
                          for eligible users to perform.. Thank you.
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
                    )}
                    {taskPreview?.status === 'approved' && (
                      <div className='grow shrink basis-0 justify-start items-center gap-2.5 flex'>
                        <div className="grow shrink basis-0 text-[#006304] text-xs font-normal font-['Manrope']">
                          Your task has been approved and is now on our page for
                          eligible users to perform.. Thank you.
                        </div>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M13.3642 15.4489H2.63582C2.08329 15.4489 1.55339 15.2294 1.16268 14.8387C0.771984 14.448 0.55249 13.9181 0.55249 13.3655V2.63802C0.55249 2.08549 0.771984 1.55558 1.16268 1.16488C1.55339 0.774181 2.08329 0.554688 2.63582 0.554688H13.3642C13.9167 0.554688 14.4466 0.774181 14.8373 1.16488C15.228 1.55558 15.4475 2.08549 15.4475 2.63802V13.3655C15.4475 13.9181 15.228 14.448 14.8373 14.8387C14.4466 15.2294 13.9167 15.4489 13.3642 15.4489ZM2.63582 1.38802C2.3043 1.38802 1.98636 1.51972 1.75194 1.75414C1.51752 1.98856 1.38582 2.3065 1.38582 2.63802V13.3655C1.38582 13.697 1.51752 14.015 1.75194 14.2494C1.98636 14.4838 2.3043 14.6155 2.63582 14.6155H13.3642C13.6957 14.6155 14.0136 14.4838 14.248 14.2494C14.4825 14.015 14.6142 13.697 14.6142 13.3655V2.63802C14.6142 2.3065 14.4825 1.98856 14.248 1.75414C14.0136 1.51972 13.6957 1.38802 13.3642 1.38802H2.63582Z'
                            fill='#006304'
                          />
                          <path
                            d='M2.63582 1.38802C2.3043 1.38802 1.98636 1.51972 1.75194 1.75414C1.51752 1.98856 1.38582 2.3065 1.38582 2.63802V13.3655C1.38582 13.697 1.51752 14.015 1.75194 14.2494C1.98636 14.4838 2.3043 14.6155 2.63582 14.6155H13.3642C13.6957 14.6155 14.0136 14.4838 14.248 14.2494C14.4825 14.015 14.6142 13.697 14.6142 13.3655V2.63802C14.6142 2.3065 14.4825 1.98856 14.248 1.75414C14.0136 1.51972 13.6957 1.38802 13.3642 1.38802H2.63582Z'
                            fill='#006304'
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {taskPreview?.task_type === 'advert' ? (
                  <div className='w-full flex flex-col items-center pl-2 gap-y-6 pt-10 lg:pl-0'>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Status</p>
                        {taskPreview?.total_allocated <= 0 ? (
                          <div
                            className={`flex items-center justify-center gap-x-2  ${
                              taskPreview?.status === 'pending'
                                ? 'bg-white text-black'
                                : 'bg-[#13BF62] text-white'
                            }  lg:w-4/12 w-9/12 py-2 rounded-lg`}
                          >
                            <Icons type={taskPreview?.status} />{' '}
                            {taskPreview?.status}
                          </div>
                        ) : (
                          <div
                            className={`flex items-center justify-center gap-x-2  bg-[#1877F2] text-white'}  lg:w-4/12 w-9/12 py-2 rounded-lg`}
                          >
                            Running <Icons type='active' />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>
                          Numbers of Advert Post
                        </p>
                        <Input
                          type='text'
                          value={
                            taskPreview?.engagements_count ||
                            taskPreview?.posts_count
                          }
                          className='w-11/12'
                          disabled
                        />
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Gender</p>
                        <Input
                          type='text'
                          value={
                            taskPreview?.gender?.charAt(0).toUpperCase() +
                            taskPreview?.gender.slice(1)
                          }
                          className='w-11/12'
                          disabled
                        />
                      </div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Platform</p>
                        <Input
                          type='text'
                          value={
                            taskPreview?.platform?.charAt(0).toUpperCase() +
                            taskPreview?.platform?.slice(1)
                          }
                          className='w-11/12'
                          disabled
                        />
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Amount paid</p>
                        <Input
                          type='text'
                          value={taskPreview?.fee_paid}
                          className='w-11/12'
                          disabled
                        />
                      </div>
                    </div>
                    <div className='w-full flex items-start justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-10'>
                        <div className='w-12/12 flex flex-col gap-y-2'>
                          <p className='text-xs font-semibold'>Allocated</p>
                          <Input
                            type='text'
                            value={
                              taskPreview?.total_allocated > 0
                                ? 'Successful'
                                : 0
                            }
                            className='w-11/12'
                            disabled
                          />
                        </div>
                        <div className='w-12/12 flex flex-col gap-y-2'>
                          <p className='text-xs font-semibold'>Location</p>
                          <Input
                            type='text'
                            value={taskPreview?.target_country}
                            className='w-11/12'
                            disabled
                          />
                        </div>
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>
                          Advert Image/Video
                        </p>
                        <div className='w-11/12 bg-[#27272A] overflow-y-hidden flex justify-center'>
                          <img
                            src={taskPreview?.media_path}
                            alt='advert media'
                            className='w-fit h-fit'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex flex-col items-start pl-2 gap-y-6 pt-10 lg:pl-0'>
                    <div className='w-7/12 flex flex-col gap-y-2'>
                      <p className='text-xs font-semibold'>Status</p>
                      {taskPreview?.total_allocated <= 0 ? (
                        <div
                          className={`flex items-center justify-center gap-x-2  ${
                            taskPreview?.status === 'pending'
                              ? 'bg-white text-black'
                              : 'bg-[#13BF62] text-white'
                          }  lg:w-4/12 w-9/12 py-2 rounded-lg`}
                        >
                          <Icons type={taskPreview?.status} />{' '}
                          {taskPreview?.status}
                        </div>
                      ) : (
                        <div
                          className={`flex items-center justify-center gap-x-2  bg-[#1877F2] text-white'}  lg:w-4/12 w-9/12 py-2 rounded-lg`}
                        >
                          Running{' '}
                          <img
                            src={spinner}
                            alt='spinner'
                            width={17}
                            height={17}
                          />
                        </div>
                      )}
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>
                          Numbers of {taskPreview?.goal}
                        </p>
                        <Input
                          type='text'
                          value={
                            taskPreview?.engagements_count ||
                            taskPreview?.posts_count
                          }
                          className='w-11/12'
                          disabled
                        />
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Location</p>
                        <Input
                          type='text'
                          value={taskPreview?.target_country}
                          className='w-11/12'
                          disabled
                        />
                      </div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Your Link</p>
                        <Input
                          type='text'
                          value={taskPreview?.account_link}
                          className='w-11/12'
                          disabled
                        />
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Gender</p>
                        <Input
                          type='text'
                          value={
                            taskPreview?.gender?.charAt(0).toUpperCase() +
                            taskPreview?.gender.slice(1)
                          }
                          className='w-11/12'
                          disabled
                        />
                      </div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Religion</p>
                        <Input
                          type='text'
                          value={taskPreview?.religion}
                          className='w-11/12'
                          disabled
                        />
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2'>
                        <p className='text-xs font-semibold'>Amount paid</p>
                        <Input
                          type='text'
                          value={taskPreview?.fee_paid}
                          className='w-11/12'
                          disabled
                        />
                      </div>
                    </div>
                    <div className='w-full flex items-start justify-between'>
                      <div className='w-10/12 text-[12px] font-semibold flex flex-col gap-y-2'>
                        Allocated
                      </div>
                      <div className='w-10/12 flex flex-col gap-y-2 text-[12px] font-semibold'>
                        {taskPreview?.total_allocated > 0 ? 'Successful' : 0}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className='bg-[#E1EEFF] text-black flex flex-col gap-y-4 py-6 pl-4 w-11/12 m-auto'>
            <p className='font-bold text-xl'>NEW UPDATE! PLEASE TAKE NOTE</p>
            <p className='text-xs w-11/12'>
              Note that a team has been dedicated to verifies all the task
              performed by people assigned to you. However the team prioritizes
              large and bulk orders over smaller orders
            </p>
            <p className='text-xs w-11/12'>
              Therefore, we have created a provision that gives you chances to
              verify what each of the person assigned to perform your task has
              done. If your order is much or you do not have the time, we will
              also verify the task for yo. However you can aid the process much
              faster if you want to verify the tasks yourself
            </p>
            <p className='text-xs w-11/12'>
              Each person that performs your task has to upload a proof or
              screenshot showing that they perform the task. that will also
              enter other information such as their social media username, phone
              number or name depending on the task performed
            </p>
            <p className='text-xs w-11/12'>
              You have to verify the task by crosschecking the proof or
              screenshot carefully and check all given information to ensure
              that the user has performed the task. if you are convinced that
              the user performed the task simply click “Accept” or click on
              “Reject” if the user did not perform the task.
            </p>
          </div>
          <div className='w-full md:px-12'>
            <TaskPerformcers
              // onAccecpt={handleApproveTask}
              // onReject={handleReject}
              // loading={isPending}
              // loadingError={isPendingErro}
              taskId={taskId}
            />
          </div>
        </>
      )}
    </div>
  )
}
