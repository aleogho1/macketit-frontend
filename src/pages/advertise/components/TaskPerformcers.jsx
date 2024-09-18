/* eslint-disable react/prop-types */

import { useState } from 'react'
import { useGetTaskPerformers } from '../../../api/advertApi'
import Loader from '../../Loader'
import ViewScreenShotModal from './ViewScreenShotModal'
import { useDisclosure } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import Icons from '../../../components/Icon'
import { useApprovePerferedTask } from '../../../api/advertApi'

export default function TaskPerformcers({ taskId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data: fetchTaskPerformers } = useGetTaskPerformers(taskId)
  const [selectedScreenshot, setSelectedScreenshot] = useState('')
  const { mutateAsync: approveTask, isPending } = useApprovePerferedTask()
  const { mutateAsync: rejectTask, isPendingError } = useApprovePerferedTask()
  const handleAcceptTask = async (key) => {
    try {
      const res = await approveTask({
        performed_task_id_key: key,
        status: 'accept',
      })
      console.log(res)
      if (res.data.status) {
        toast.success('Task Approved')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  const handleRejectTask = async (key) => {
    try {
      const res = await rejectTask({
        performed_task_id_key: key,
        status: 'reject',
      })
      if (res.data.status) {
        toast.success('Task Rejected')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleViewScreenshot = (screenshotPath) => {
    setSelectedScreenshot(screenshotPath)
    onOpen()
  }

  return (
    <>
      <div className='grid gap-5 w-full pt-4'>
        {fetchTaskPerformers?.length > 0 &&
          fetchTaskPerformers?.map((detail, index) => (
            <div
              key={index}
              className='w-full px-6 pt-6 pb-[31px] bg-gray-300 dark:bg-zinc-800 rounded-lg flex flex-col gap-y-4 justify-between items-start gap-2'
            >
              <div className='flex items-start w-full justify-between'>
                <div className='flex items-start gap-x-4'>
                  <img
                    className='w-[47px] h-[47px]  rounded-[14.95px] border-2 border-red-500'
                    src={detail?.user?.profile_picture}
                  />
                  <div className='flex flex-col gap-y-4'>
                    <div>
                      <span className='text-[10px] text-[#B1B1B1]'>
                        @{detail?.user?.username}
                      </span>
                      <p className='text-[14px] text-[#FFFFFF]'>
                        {detail?.user?.email}
                      </p>
                      <span className='text-[10px] text-[#909090]'>
                        {detail?.date_completed &&
                          format(
                            new Date(detail?.date_completed),
                            'dd-MM-yyyy HH:mm:ss'
                          )}
                      </span>
                    </div>
                    <div className='flex flex-col gap-y-6'>
                      <div className='flex items-center gap-x-2'>
                        <Icons type={detail?.platform} width={17} height={17} />
                        <span className='text-[12px] text-[#B1B1B1]'>
                          {detail?.account_name}
                        </span>
                      </div>
                      <div className='flex flex-col gap-y-4'>
                        <p className='text-[#D8D8D8] text-[12px]'>
                          Select one of the options below after verifying the
                          task
                        </p>
                        <div className='flex items-center gap-x-4'>
                          <button
                            onClick={() => handleAcceptTask(detail?.key)}
                            className='w-[100px] px-2 py-2 bg-green-500 rounded-md border border-violet-500/opacity-25 justify-center items-center gap-1 flex'
                          >
                            <div className="text-center text-white text-[10px] font-bold font-['Manrope']">
                              {isPending ? <Loader /> : 'ACCEPT'}
                            </div>
                          </button>
                          <button
                            onClick={() => handleRejectTask(detail?.key)}
                            className='w-[100px] px-2 py-2 bg-orange-600 rounded-md border border-violet-500/opacity-25 justify-center items-center gap-1 flex'
                          >
                            <div className="text-center text-white text-[10px] font-bold font-['Manrope']">
                              {isPendingError ? <Loader /> : 'REJECT'}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className='text-[#D8D8D8] text-[12px]'>
                    Screenshot / Proof Of Work
                  </p>
                  {detail?.proof_screenshot_path && (
                    <span
                      className='text-primaryText text-[12px]'
                      onClick={() =>
                        handleViewScreenshot(detail?.proof_screenshot_path)
                      }
                    >
                      Click here to view
                    </span>
                  )}
                  {detail?.post_link && (
                    <a
                      href={detail?.post_link}
                      className='text-primaryText text-[12px]'
                    >
                      Click here to view
                    </a>
                  )}
                </div>

                <div className='flex flex-col gap-y-2'>
                  <p className='text-[#FFFFFF] text-[12px]'>Status</p>
                  {detail?.status === 'in_review' && (
                    <span className='text-[#1877F2] text-[12px] flex items-center gap-x-2 font-bold'>
                      {' '}
                      <Icons type='uploaded' /> Uploaded{' '}
                    </span>
                  )}
                  {detail?.status === 'completed' && (
                    <span className='text-green-500 text-[12px] flex items-center gap-x-2 font-bold'>
                      {' '}
                      Completed{' '}
                    </span>
                  )}
                  {detail?.status === 'rejected' && (
                    <span className='text-red-500 text-[12px] flex items-center gap-x-2 font-bold'>
                      {' '}
                      Rejected{' '}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {isOpen && (
        <ViewScreenShotModal
          isOpen={isOpen}
          onClose={onClose}
          proof_screenshot_path={selectedScreenshot}
        />
      )}
    </>
  )
}
