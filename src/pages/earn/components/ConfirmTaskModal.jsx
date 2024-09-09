/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Button, Modal, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useGenerateTask } from '../../../api/earnApi'
import toast from 'react-hot-toast'

export default function ConfirmTaskModal({
  isOpen,
  onClose,
  task_type,
  platform,
  title,
  description,
  goal,
}) {
  const navigate = useNavigate()
  const { mutateAsync: generateTask, isPending } = useGenerateTask()

  const handleSubmit = async () => {
    console.log(task_type, platform, 'ggg')
    try {
      const res = await generateTask({
        task_type,
        platform,
        goal,
      })
      if (res.status === 206) {
        toast.success(res.data.message)
        onClose()
      } else if (res.status === 200) {
        toast.success(res.data.message)
        console.log(res)
        onClose()
        navigate(`/dashboard/earn-advert-task/${res.data?.generated_task?.key}`)
      } else {
        onClose()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message ?? error.message)
    }
  }
  return (
    <>
      <div>
        <Modal
          placement='center'
          size='md'
          backdrop='blur'
          isOpen={isOpen}
          onClose={onClose}
          hideCloseButton={true}
          className='rounded-none w-[23rem] md:w-[28rem]'
        >
          <ModalContent className=' overflow-visible'>
            <div className='p-6 rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 bg-fuchsia-400 top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='flex-col justify-center items-center gap-3 flex'>
                <div className="dark:text-white capitalize text-stone-900 text-sm font-bold font-['Manrope']">
                  {title ? title : `Generate Next ${platform?.charAt(0).toUpperCase()+platform?.slice(1)} Task?`}
                </div>
                <div className="w-[253px] text-center dark:text-[#B0B0B0] text-black text-xs font-normal font-['Manrope']">
                  {description
                    ? description
                    : ` Are you sure you want to generate your next ${goal?.charAt(0).toUpperCase()+goal?.slice(1) || platform?.charAt(0).toUpperCase()+platform?.slice(1)} task now.
                  You have 1 hour to perform this task. Please confirm only if
                  you are ready to perform the task.`}
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className='w-[290px] cursor-pointer px-6 py-4.5 bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex'
              >
                <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
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
                    'Confirm'
                  )}
                </div>
              </Button>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
