/* eslint-disable react/prop-types */
import { Button, Input, Modal, ModalContent, Snippet } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
// import CryptoTransfermodal from './CryptoTransfermodal'
// import BankTransfermodal from './BankTransfermodal'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useActivateMembership } from '../../../api/walletApi'

export default function ActivationPaymentmodal({ isOpen, onClose }) {
  const [view, setView] = useState('fund')
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 1000,
    },
  })

  const { mutateAsync: ativateMembership } = useActivateMembership()

  const onSubmit = async (data) => {
    try {
      const res = await ativateMembership({ data })
      if (res.data.status) {
        toast.success(res.data.message, {
          position: 'top-right',
          duration: 20000,
        })
        const authorizationUrl = res?.data?.authorization_url
        if (authorizationUrl) {
          localStorage.setItem('paystack_redirect', window.location.pathname)
          window.open(authorizationUrl) // Open the URL in a new tab
        }
        onClose()
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
          {view === 'fund' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='p-6 w-full rounded flex-col justify-center items-center gap-12 inline-flex'>
                <div
                  onClick={onClose}
                  className='p-2 primaryBg top-[-20px] absolute z-40 -right-2 md:-right-4 cursor-pointer rounded-[100px] '
                >
                  <AiOutlineClose size={20} color='#fff' />
                </div>
                <div className='flex-col justify-center items-center gap-3 flex'>
                  {/* <div className="text-primaryText text-sm font-bold font-['Manrope']">
                  How would you like to pay?
                </div> */}
                  <div className=" dark:text-white dark:text-opacity-70 text-primaryText text-sm font-bold font-['Manrope']">
                    Make Payment
                  </div>
                  {/* <div className="w-[253px] text-center text-black text-xs font-normal font-['Manrope']">
                  Are you sure you want to generate your next Twitter task now.
                  You have 1 hour to perform this task. Please confirm only if
                  you are ready to perform the task.
                </div> */}
                </div>
                <div
                  // onClick={() => setView('bankTransfer')}
                  className=' cursor-pointer flex-col justify-start items-start gap-3 flex'
                >
                  {/* <div
                  onClick={() => setView('bankTransfer')}
                  className='self-stretch p-6 cursor-pointer bg-zinc-400 bg-opacity-30 rounded-lg justify-start items-start gap-2 inline-flex'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M8 9V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V9M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V12.2C19 11.0799 19 10.5198 18.782 10.092C18.5903 9.71569 18.2843 9.40973 17.908 9.21799C17.4802 9 16.9201 9 15.8 9H8.2C7.0799 9 6.51984 9 6.09202 9.21799C5.71569 9.40973 5.40973 9.71569 5.21799 10.092C5 10.5198 5 11.0799 5 12.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z'
                      stroke='#FF6DFB'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div className='grow shrink basis-0 h-11 justify-start items-start gap-2 flex'>
                    <div className='grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex'>
                      <div className="self-stretch text-primaryText text-sm font-medium font-['Manrope']">
                        Bank Transfer
                      </div>
                      <div className="self-stretch text-primaryText text-xs font-normal font-['Manrope']">
                        Get real people to post your ads on their social media
                        account.{' '}
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M5 12H18M13 6L18.2929 11.2929C18.6834 11.6834 18.6834 12.3166 18.2929 12.7071L13 18'
                      stroke='#FF6DFB'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
                <div className='self-stretch p-6 bg-zinc-400 bg-opacity-30 rounded-lg justify-start items-start gap-2 inline-flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M8.99984 6.99996V17M6.99984 6.99996H13.4998C14.8805 6.99996 15.9998 8.11925 15.9998 9.49996C15.9998 10.8807 14.8805 12 13.4998 12H8.99984H14.4998C15.8805 12 16.9998 13.1192 16.9998 14.5C16.9998 15.8807 15.8805 17 14.4998 17H6.99984M12 7V5M12 19V17M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z'
                      stroke='#FF6DFB'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div
                    onClick={() => setView('crypto')}
                    className='grow cursor-pointer shrink basis-0 h-11 justify-start items-start gap-2 flex'
                  >
                    <div className='grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex'>
                      <div className="self-stretch text-primaryText text-sm font-medium font-['Manrope']">
                        Pay with Crypto
                      </div>
                      <div className="self-stretch text-primaryText text-xs font-normal font-['Manrope']">
                        Get real people to post your ads on their social media
                        account.{' '}
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M5 12H18M13 6L18.2929 11.2929C18.6834 11.6834 18.6834 12.3166 18.2929 12.7071L13 18'
                      stroke='#FF6DFB'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                </div> */}

                  <div className='w-full flex gap-4'>
                    <div className='self-stretch w-full  bg-white bg-opacity-10 rounded-lg justify-start items-center gap-2 inline-flex'>
                      <Controller
                        name='amount'
                        control={control}
                        render={({ field }) => (
                          <Input
                            type='text'
                            size='sm'
                            placeholder='amount'
                            {...field}
                            // value='1000'
                            errorMessage={errors?.amount?.message}
                            isInvalid={!!errors?.amount}
                            classNames={{
                              input: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-zinc-400 dark:placeholder:text-white/60',
                              ],
                              innerWrapper: 'bg-transparent ',
                              inputWrapper: [
                                'bg-zinc-700 bg-opacity-10',
                                'dark:bgwhite dark:bg-opacity-10',
                                'hover:bg-white hover:bg-opacity-10',
                                'dark:hover:bg-default/70',
                                'group-data-[focused=true]:bg-default-200/50',
                                'dark:group-data-[focused=true]:bg-default/60',
                                'border-2 border-transparent',
                                'focus-within:!border-red-500  ',
                                '!cursor-text',
                              ],
                            }}
                            className=" rounded  text-zinc-400 text-[12.83px] font-normal font-['Manrope']"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type='submit'
                    className="w-[290px] px-6 py-6 text-center text-white text-[12.83px] font-medium font-['Manrope'] bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </form>
          )}

          {view === 'crypto' && (
            <div className=' p-6 ounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={() => setView('fund')}
                className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='flex-col justify-center items-center gap-3 flex'>
                <div className="text-primaryText text-sm font-bold font-['Manrope']">
                  Fund Wallet with Crypto
                </div>
                <div className="w-[253px] text-center text-black text-xs font-normal font-['Manrope']">
                  Your Unique Reseller Link has been generated successfully. You
                  have to share your unique reseller link along with the product
                  images and descriptions to your social network such as
                  Whatsapp, Facebook, Instagram etc.
                </div>
              </div>
              <div className='self-stretch h-[52px] flex-col justify-center items-center gap-2 flex'>
                <div className='self-stretch h-[52px] flex-col justify-start items-center gap-2 flex'>
                  <div className="self-stretch text-primaryText text-sm font-medium font-['Manrope']">
                    USDT (BEP 20)
                  </div>
                  <div className='self-stretch h-[34px] flex-col justify-start items-start gap-[19px] flex'>
                    <div className='self-stretch justify-start items-center gap-2 inline-flex'>
                      <Snippet
                        size='sm'
                        className="grow h-[34px] rounded-none p-2 bg-zinc-400 bg-opacity-30 border border-zinc-400 border-opacity-30 items-center gap-1  shrink basis-0 text-primaryText text-[12.83px] font-normal font-['Manrope']"
                        symbol=''
                        copyIcon={
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 18 18'
                            fill='none'
                          >
                            <path
                              d='M12.6 13.5C13.4401 13.5 13.8601 13.5 14.181 13.3365C14.4632 13.1927 14.6927 12.9632 14.8365 12.681C15 12.3601 15 11.9401 15 11.1V3.9C15 3.05992 15 2.63988 14.8365 2.31901C14.6927 2.03677 14.4632 1.8073 14.181 1.66349C13.8601 1.5 13.4401 1.5 12.6 1.5H8.4C7.55992 1.5 7.13988 1.5 6.81901 1.66349C6.53677 1.8073 6.3073 2.03677 6.16349 2.31901C6 2.63988 6 3.05992 6 3.9M5.4 16.5H9.6C10.4401 16.5 10.8601 16.5 11.181 16.3365C11.4632 16.1927 11.6927 15.9632 11.8365 15.681C12 15.3601 12 14.9401 12 14.1V6.9C12 6.05992 12 5.63988 11.8365 5.31901C11.6927 5.03677 11.4632 4.8073 11.181 4.66349C10.8601 4.5 10.4401 4.5 9.6 4.5H5.4C4.55992 4.5 4.13988 4.5 3.81901 4.66349C3.53677 4.8073 3.3073 5.03677 3.16349 5.31901C3 5.63988 3 6.05992 3 6.9V14.1C3 14.9401 3 15.3601 3.16349 15.681C3.3073 15.9632 3.53677 16.1927 3.81901 16.3365C4.13988 16.5 4.55992 16.5 5.4 16.5Z'
                              stroke='black'
                            />
                          </svg>
                        }
                      >
                        euy348y83uy9ru49u9u34903840394039ty
                      </Snippet>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[290px] cursor-pointer px-6 py-3.5 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'>
                <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                  Proceed
                </div>
              </div>
            </div>
          )}
          {view === 'bankTransfer' && (
            <div className=' p-6 rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={() => setView('fund')}
                className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40 cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='flex-col justify-center items-center gap-3 flex'>
                <div className=" text-sm font-bold font-['Manrope']">
                  Fund Wallet with Bank Transfer
                </div>
                <div className="w-[253px] text-center  text-xs font-normal font-['Manrope']">
                  Your Unique Reseller Link has been generated successfully. You
                  have to share your unique reseller link along with the product
                  images and descriptions to your social network such as
                  Whatsapp, Facebook, Instagram etc.
                </div>
              </div>
              <div className='self-stretch  flex-col justify-center items-center gap-2 flex'>
                <div className='self-stretch h-[94px] flex-col justify-start items-center gap-2 flex'>
                  <div className="self-stretch text-primaryText text-sm font-medium font-['Manrope']">
                    Access Bank
                  </div>
                  <div className='self-stretch h-[34px] flex-col justify-start items-start gap-[19px] flex'>
                    <div className='self-stretch justify-start items-center gap-2 inline-flex'>
                      <Snippet
                        size='sm'
                        className="grow h-[34px] rounded-none p-2 bg-zinc-400 bg-opacity-30 border border-zinc-400 border-opacity-30 items-center gap-1  shrink basis-0 text-primaryText text-[12.83px] font-normal font-['Manrope']"
                        symbol=''
                        copyIcon={
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 18 18'
                            fill='none'
                          >
                            <path
                              d='M12.6 13.5C13.4401 13.5 13.8601 13.5 14.181 13.3365C14.4632 13.1927 14.6927 12.9632 14.8365 12.681C15 12.3601 15 11.9401 15 11.1V3.9C15 3.05992 15 2.63988 14.8365 2.31901C14.6927 2.03677 14.4632 1.8073 14.181 1.66349C13.8601 1.5 13.4401 1.5 12.6 1.5H8.4C7.55992 1.5 7.13988 1.5 6.81901 1.66349C6.53677 1.8073 6.3073 2.03677 6.16349 2.31901C6 2.63988 6 3.05992 6 3.9M5.4 16.5H9.6C10.4401 16.5 10.8601 16.5 11.181 16.3365C11.4632 16.1927 11.6927 15.9632 11.8365 15.681C12 15.3601 12 14.9401 12 14.1V6.9C12 6.05992 12 5.63988 11.8365 5.31901C11.6927 5.03677 11.4632 4.8073 11.181 4.66349C10.8601 4.5 10.4401 4.5 9.6 4.5H5.4C4.55992 4.5 4.13988 4.5 3.81901 4.66349C3.53677 4.8073 3.3073 5.03677 3.16349 5.31901C3 5.63988 3 6.05992 3 6.9V14.1C3 14.9401 3 15.3601 3.16349 15.681C3.3073 15.9632 3.53677 16.1927 3.81901 16.3365C4.13988 16.5 4.55992 16.5 5.4 16.5Z'
                              stroke='black'
                            />
                          </svg>
                        }
                      >
                        076626354536
                      </Snippet>
                    </div>
                  </div>
                  <div className='self-stretch h-[34px] flex-col justify-start items-start gap-[19px] flex'>
                    <div className='self-stretch justify-start items-center gap-2 inline-flex'>
                      <Snippet
                        size='sm'
                        className="grow h-[34px] rounded-none p-2 bg-zinc-400 bg-opacity-30 border border-zinc-400 border-opacity-30 items-center gap-1  shrink basis-0 text-primaryText text-[12.83px] font-normal font-['Manrope']"
                        symbol=''
                        copyIcon={
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 18 18'
                            fill='none'
                          >
                            <path
                              d='M12.6 13.5C13.4401 13.5 13.8601 13.5 14.181 13.3365C14.4632 13.1927 14.6927 12.9632 14.8365 12.681C15 12.3601 15 11.9401 15 11.1V3.9C15 3.05992 15 2.63988 14.8365 2.31901C14.6927 2.03677 14.4632 1.8073 14.181 1.66349C13.8601 1.5 13.4401 1.5 12.6 1.5H8.4C7.55992 1.5 7.13988 1.5 6.81901 1.66349C6.53677 1.8073 6.3073 2.03677 6.16349 2.31901C6 2.63988 6 3.05992 6 3.9M5.4 16.5H9.6C10.4401 16.5 10.8601 16.5 11.181 16.3365C11.4632 16.1927 11.6927 15.9632 11.8365 15.681C12 15.3601 12 14.9401 12 14.1V6.9C12 6.05992 12 5.63988 11.8365 5.31901C11.6927 5.03677 11.4632 4.8073 11.181 4.66349C10.8601 4.5 10.4401 4.5 9.6 4.5H5.4C4.55992 4.5 4.13988 4.5 3.81901 4.66349C3.53677 4.8073 3.3073 5.03677 3.16349 5.31901C3 5.63988 3 6.05992 3 6.9V14.1C3 14.9401 3 15.3601 3.16349 15.681C3.3073 15.9632 3.53677 16.1927 3.81901 16.3365C4.13988 16.5 4.55992 16.5 5.4 16.5Z'
                              stroke='black'
                            />
                          </svg>
                        }
                      >
                        WEAM/ Adewale Trend-it77
                      </Snippet>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[290px] cursor-pointer px-6 py-3.5 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'>
                <div
                  onClick={onClose}
                  className="text-center text-white text-[12.83px] font-medium font-['Manrope']"
                >
                  Go Home
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
