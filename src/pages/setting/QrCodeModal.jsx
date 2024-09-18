/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Button, Modal, Input, ModalContent, Image } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { useActivateGoogleAuth, useComplete2Fa } from '../../api/settingsApis'
import { useEffect } from 'react'
import Loader from '../Loader'
import { useQueryClient } from '@tanstack/react-query'

export default function QrCodeModal({ isOpen, onClose }) {
  const { data: activeGoogleAuth, isFetching } = useActivateGoogleAuth()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({})
  const { mutateAsync: complete2Fa, isPending } = useComplete2Fa()

  const onSubmit = async (data) => {
    try {
      const res = await complete2Fa({ data })
      console.log(res?.data)
      if (res.data.status) {
        onClose()
        toast.success(res.data.message, {
          duration: 4000,
        })
        queryClient.invalidateQueries({ queryKey: ['sec_prefence'] })
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 6000,
      })
    }
  }

  const handleToggleGoogleAuth = async () => {
    try {
      const res = await activeGoogleAuth
      if (res?.data) {
        toast.success(res?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    handleToggleGoogleAuth()
  }, [])

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
          className='rounded-none w-[23rem] md:w-[30rem]'
          scrollBehavior='outside'
        >
          <ModalContent className=' overflow-visible'>
            <div className='p-6 md:p-12 rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='self-stretch flex-col justify-center items-start gap-6 flex'>
                  <div className='self-stretch  flex-col justify-start items-center gap-[18px] flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='49'
                      height='49'
                      viewBox='0 0 49 49'
                      fill='none'
                    >
                      <path
                        d='M22.5 10.2949H26.5M18.9 44.2949H30.1C32.3402 44.2949 33.4603 44.2949 34.316 43.8589C35.0686 43.4755 35.6805 42.8635 36.064 42.1109C36.5 41.2552 36.5 40.1351 36.5 37.8949V10.6949C36.5 8.45471 36.5 7.33461 36.064 6.47896C35.6805 5.72631 35.0686 5.11439 34.316 4.7309C33.4603 4.29492 32.3402 4.29492 30.1 4.29492H18.9C16.6598 4.29492 15.5397 4.29492 14.684 4.7309C13.9314 5.11439 13.3195 5.72631 12.936 6.47896C12.5 7.33461 12.5 8.45471 12.5 10.6949V37.8949C12.5 40.1351 12.5 41.2552 12.936 42.1109C13.3195 42.8635 13.9314 43.4755 14.684 43.8589C15.5397 44.2949 16.6598 44.2949 18.9 44.2949Z'
                        stroke='#CB29BE'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>

                    <div className="text-sm font-bold font-['Manrope']">
                      Scan this QR code
                    </div>
                    <div className=" text-center text-zinc-400 text-xs font-normal font-['Manrope']">
                      Download the Google authenticator app on your new device.
                      Within the app, scan this QR code.
                    </div>
                    {isFetching && <Loader />}
                    <Image className='w-full' src={activeGoogleAuth} />
                    <div className='self-stretch justify-start flex-col items-start gap-3 flex'>
                      <div className='self-stretch flex-col rounded-none gap-2 flex'>
                        <Controller
                          name='entered_code'
                          control={control}
                          render={({ field }) => (
                            <Input
                              type='text'
                              size='sm'
                              placeholder='entered code'
                              {...field}
                              errorMessage={errors?.entered_code?.message}
                              isInvalid={!!errors?.entered_code}
                              classNames={{
                                input: [
                                  'bg-transparent ',
                                  'text-black/90 dark:text-white/90',
                                  'placeholder:text-black dark:placeholder:text-black',
                                ],
                                innerWrapper: 'bg-transparent',
                                inputWrapper: [
                                  'bg-zinc-700 bg-opacity-10  rounded-none',
                                  'dark:bg-white',
                                  'hover:bg-white hover:bg-opacity-10',
                                  'dark:hover:bg-opacity-80',
                                  'group-data-[focused=true]:bg-default-200/50',
                                  'dark:group-data-[focused=true]:bg-default/60',
                                  '!cursor-text',
                                  'border-2 border-transparent',
                                  'focus-within:!border-red-500  ',
                                ],
                              }}
                              className=" rounded-none  text-black text-[12.83px] font-normal font-['Manrope']"
                            />
                          )}
                          rules={{
                            required: true,
                          }}
                        />
                        <small className=" text-zinc-400 text-xs font-normal font-['Manrope']">
                          Enter the code you see to complete activation
                        </small>
                      </div>
                      <div className='self-stretch'>
                        <Button
                          type='submit'
                          isDisabled={isPending}
                          className=" w-full px-6 py-6  bg-primarybutton rounded text-center text-white text-[12.83px] font-medium font-['Manrope']"
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
                            'Complete Activation'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
