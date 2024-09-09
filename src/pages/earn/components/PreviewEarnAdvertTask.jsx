/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */

import { useNavigate, useParams } from 'react-router-dom'
import { Image, Link, Snippet } from '@nextui-org/react'
import { usePreviewPerformTask } from '../../../api/earnApi'
import trLogo from '../../../assets/tr-lg.svg'
import { format } from 'date-fns'
import Icons from '../../../components/Icon'

export default function PreviewEarnAdvertTask() {
  const param = useParams()
  const taskId = param.taskId
  const { data: fetchTaskPreview } = usePreviewPerformTask(taskId)
  console.log(fetchTaskPreview)

  const navigate = useNavigate()

  return (
    <div>
      <div className=' min-h-screen w-full p-3 flex-col justify-start items-start gap-3 inline-flex'>
        <div
          onClick={() => navigate(-1)}
          className='justify-start cursor-pointer items-center gap-[7px] inline-flex'
        >
          <div className='cursor-pointer'>
           <Icons type='arrow-back' />
          </div>
          <div className="text-center text-fuchsia-400 text-sm font-medium font-['Manrope']">
            Go back
          </div>
        </div>

        {fetchTaskPreview && (
          <>
            <div className='self-stretch relative border border-white flex-col justify-start items-start flex'>
              <div className='self-stretch  p-6 bg-opacity-40  rounded-tl-lg rounded-tr-lg flex-col justify-start items-start gap-2 flex'>
                <div className='flex-col justify-start items-start gap-1.5 flex'>
                  <div className="self-stretch text-zinc-400 text-[10px] font-normal font-['Manrope']">
                    {fetchTaskPreview?.task?.updated_at
                      ? format(
                          new Date(fetchTaskPreview.task.updated_at),
                          'yyyy-MM-dd HH:mm'
                        )
                      : 'Loading...'}
                  </div>
                  <div className="capitalize text-3xl font-medium font-['Manrope']">
                    {
                      fetchTaskPreview?.task?.task_type === 'advert' ? `Post Advert on your ${fetchTaskPreview?.task?.platform} Page` :                       
                          (fetchTaskPreview?.task?.goal === 'comment' && `Comment on ${fetchTaskPreview?.task?.platform} Post`) ||
                          (fetchTaskPreview?.task?.goal === 'follow and like' && `Follow and Like ${fetchTaskPreview?.task?.platform} Page`) ||
                          (fetchTaskPreview?.task?.goal === 'follow' && `Follow ${fetchTaskPreview?.task?.platform} Page`) ||
                          (fetchTaskPreview?.task?.goal === 'like' && `Like ${fetchTaskPreview?.task?.platform} Post`)                      
                    }
                  </div>
                  <div className='py-1.5 justify-start items-center gap-2 inline-flex'>
                    <div className='justify-start items-center gap-0.5 flex'>
                      <Icons type='wallet' />
                      <div className="opacity-50 capitalize text-[12px] font-medium font-['Manrope']">
                        earning
                      </div>
                    </div>
                    <div className=" text-sm font-bold font-['Manrope']">
                      {
                        fetchTaskPreview?.task?.task_type === 'advert' ? 
                        fetchTaskPreview?.task?.platform === 'whatsapp' ? '#60 per Advert post' :
                        ` ₦110 per Advert post` : 
                        (fetchTaskPreview?.task?.goal === 'comment' && ` ₦20 per comment`) ||
                        (fetchTaskPreview?.task?.goal === 'follow and like' && ` ₦3.5 per follow and like`) ||
                        (fetchTaskPreview?.task?.goal === 'follow' && `₦3.5 per follow`) ||
                        (fetchTaskPreview?.task?.goal === 'like' && `₦3.5 per like`)  
                      }
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
              <div className='self-stretch p-3 bg-sky-100 justify-start items-start gap-[29px] inline-flex'>
                <div className='grow shrink basis-0 justify-start items-center gap-2.5 flex'>
                  {
                    fetchTaskPreview?.task?.task_type === 'engagement' && 
                    <div className="grow shrink basis-0 text-blue-600 text-xs font-normal font-['Manrope']">
                    You must NOT UNLIKE or UNFOLLOW the{' '}
                    {fetchTaskPreview?.task?.platform?.toUpperCase()}
                    {''} page after you have like and followed the page. Your
                    Trendit³ account will be suspended once you UNLIKE or
                    UNFOLLOW the {fetchTaskPreview?.task?.platform?.toUpperCase()}
                    {''}
                    Page.
                  </div>
                  }
                  {
                    fetchTaskPreview?.task?.task_type === 'advert' &&
                    <div className="grow shrink basis-0 text-blue-600 text-xs font-normal font-['Manrope']">
                    You must NOT DELETE the{' '}
                    {fetchTaskPreview?.task?.platform?.toUpperCase()}
                    {''} advert post after posting. Your
                    Trendit³ account will be suspended once you DELETE the {fetchTaskPreview?.task?.platform?.toUpperCase()} Post.
                  </div>
                  }
                    <Icons type='caution' />
                </div>
              </div>
            </div>

            <div className='grid gap-3 md:gap-6 md:grid-cols-2'>
              <div className=' p-3 bg-zinc-800 bg-opacity-40 rounded-lg flex-col justify-start items-center gap-10 inline-flex'>
                <div className='self-stretch py-6 flex-col justify-start items-center gap-3 flex'>
                  <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                    <div className="grow shrink basis-0 text-center text-2xl font-medium font-['Manrope']">
                      Task
                    </div>
                  </div>
                </div>
                <div className=' flex-col justify-start items-center gap-8 flex'>
                  <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
                    {fetchTaskPreview?.task?.task_type === 'engagement' && 
                    <div className='self-stretch flex flex-col gap-y-2'>
                      <span className=" text-xs font-semibold font-['Manrope']">
                        Please follow the step-by-step instructions below to do
                        your task:
                        <br />
                        Step 1: 
                      </span>
                      <span className=" text-xs font-normal font-['Manrope']">
                        Open the Task Link above on your{' '}
                        {fetchTaskPreview?.task?.platform} {''} Mobile App or
                        browser
                        <br />
                      </span>
                      <span className=" text-xs font-semibold font-['Manrope']">
                        Step 2: 
                      </span>
                      <span className=" text-xs font-normal font-['Manrope']">
                        The link will direct you to a{' '}
                        {fetchTaskPreview?.task?.platform} {''} Page which you
                        are meant to like and follow.
                        <br />
                      </span>
                      <span className=" text-xs font-semibold font-['Manrope']">
                        Step 3: 
                      </span>
                      <span className=" text-xs font-normal font-['Manrope']">
                        Click on the Like or Follow button on the{' '}
                        {fetchTaskPreview?.task?.platform} {''} Page to start
                        liking or following the page. You MUST NOT Unfollow the
                        account after you have followed the account.
                        <br />
                      </span>
                      <span className=" text-xs font-semibold font-['Manrope']">
                        Step 4: 
                      </span>
                      <span className=" text-xs font-normal font-['Manrope']">
                        Create a screenshot of the page that shows you have
                        liked or followed the page and upload the screenshot
                        under the Proof of Work Form below. You are also
                        required to enter your{' '}
                        {fetchTaskPreview?.task?.platform} {''} Username or Name
                        which you used to perform the task
                      </span>
                    </div>
                    }
                    {
                      fetchTaskPreview?.task?.task_type === 'advert' && 
                      <div className='flex flex-col gap-y-6 py-10 items-center -mt-10 lg:w-full w-11/12'>
                      <div className='text-[12px] font-semibold flex flex-col gap-y-6 px-4'>
                          Please follow the step-by-step instructions below to do your task:
                            <p>
                              Step 1: Open {fetchTaskPreview?.task?.platform} on your Mobile App or browser
                            </p>
                            <p>
                              Step 2: Create a post, copy the information below on the description of the advert which you are meant to post on your page.
                            </p>
                            <p>
                              Step 3: 
                              Add the image or video provided for the advert.  Make sure it's high-quality and visually appealing and post it on your page
                            </p>
                            <p>
                              Step 4: After you have created the new post, then you will comeback to this page and upload the proof of work, which is the link to your profile on {fetchTaskPreview?.task?.platform} and the link to the {fetchTaskPreview?.task?.platformn} post which you have created
                            </p>
                      </div>
                      <span className='self-start px-4'>Advert text</span>
                      <div className='flex items-center justify-between text-black dark:text-[#B1B1B1] bg-[#FFFFFF] py-4 px-4 w-full bg-opacity-10'>
                        <div className='text-[10px] w-9/12'>
                          {fetchTaskPreview?.task?.caption}
                        </div>
                          <p className='flex items-center gap-x-2 text-[12px] text-[#FF6DFB]' onClick={() => (navigator.clipboard.writeText(fetchTaskPreview?.task?.caption), toast.success('Caption copied'))}>
                            <Icons type='copy' stroke='#FF6DFB'/>
                            Copy text
                          </p>
                      </div>
                      </div>
                    }
                    {fetchTaskPreview?.task?.account_link && (
                      <Link
                        isExternal
                        href={fetchTaskPreview?.task?.account_link}
                        className='self-stretch h-9 p-2 bg-white justify-center items-center gap-1 inline-flex'
                      >
                        <div className="grow shrink basis-0  text-black text-[12.83px] font-normal font-['Manrope']">
                          {fetchTaskPreview?.task?.account_link}
                        </div>
                        <div className='justify-start items-center gap-2 flex'>
                         <Icons type='visit-link' />
                          <Link href={fetchTaskPreview?.task?.account_link} className="text-fuchsia-600 text-sm font-medium font-['Manrope']">
                            Visit Link
                          </Link>
                        </div>
                      </Link>
                    )}

                    {/* {fetchTaskPreview?.task?.media_path && (
                      <div className='w-[243px] items-center inline-flex flex-col py-2 relative opacity-50 bg-neutral-800 w-full overflow-x-scroll'>
                        {
                          fetchTaskPreview?.task?.media_path?.map((image, index) => (
                            <Image
                            className='w-40 h-40'
                            key={index}
                            src={image}
                            alt='Image'
                          />
                          ))
                        }
                      </div>
                    )} */}

                    <div className='self-stretch p-3 bg-rose-100 justify-start items-start gap-[29px] inline-flex'>
                      <div className='grow shrink basis-0 h-[50px] justify-start items-center gap-2.5 flex'>
                        <div className="grow shrink basis-0 text-orange-600 text-xs font-normal font-['Manrope']">
                          You must NOT DELETE THE ADVERT POST on the{' '}
                          <span className='uppercase'>
                            {fetchTaskPreview?.task?.platform}
                          </span>{' '}
                          page after you have post the avdert on your account
                          Your Trendit³ account will be suspended once you Delete
                          the advert on your{' '}
                          <span className='uppercase'>
                            {fetchTaskPreview?.task?.platform}
                          </span>{' '}
                          {''}
                          Page.
                        </div>
                        <div className='w-5 h-5 relative' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=' p-3 bg-zinc-800 bg-opacity-40 rounded-lg flex-col justify-start items-center gap-10 inline-flex'>
                <div className='self-stretch py-6 flex-col justify-start items-center gap-3 flex'>
                  <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                    <div className="grow shrink basis-0 text-center text-white text-2xl font-medium font-['Manrope']">
                      Uploaded proof
                    </div>
                  </div>
                </div>
                {
                  fetchTaskPreview?.task?.task_type === 'engagement' && 
                  <div className=' flex-col justify-start items-center gap-8 flex'>
                    <div className='w-[243px] h-40 opacity-50 bg-neutral-800 justify-center items-center inline-flex'>
                      <Image
                        className='w40 w-full h-40'
                        src={fetchTaskPreview?.proof_screenshot_path}
                        alt='Image'
                      />
                    </div>
                    {
                      fetchTaskPreview?.account_name && (
                    <div className='flex flex-col gap-y-4'>
                    <p className='text-[12px] font-semibold'>
                        The username on your {fetchTaskPreview?.task?.platform} account that performed this task
                    </p>
                   
                      <div className='bg-zinc-700 py-2 pl-2 text-black dark:text-[#B1B1B1] font-semibold text-[12px]'>
                        {fetchTaskPreview?.account_name}
                    </div>        
                </div>
                )    }
                </div>
                }
                {
                  fetchTaskPreview?.task?.task_type === 'advert' && 
                              <div className='w-full flex flex-col gap-y-4'>
                                <div className='text-[12px] flex flex-col gap-y-2 font-normal w-full'>
                                    The link to your {fetchTaskPreview?.task?.platform} profile
                                   <div className='bg-zinc-700 py-4 pl-4 rounded'>
                                      {fetchTaskPreview?.account_name}
                                   </div>
                                </div>  
                                <div className='text-[12px] flex flex-col font-normal gap-y-2 w-full'>
                                    The link to the advert post which you created on {fetchTaskPreview?.task?.platform}
                                    <div className='bg-zinc-700 py-4 pl-4 rounded'>
                                      {fetchTaskPreview?.post_link}
                                    </div>
                                </div>    
                              </div>
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
