/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Button, Modal, Input, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useFetchBallance, useFundWallet } from '../../api/walletApi'
import { useForm, Controller } from 'react-hook-form'
import { useState, useContext } from 'react'
import { AppearanceContext } from '../../providers/AppearanceProvider'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

export default function FundWalletModal({ isOpen, onClose }) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({})
  const { mutateAsync: fundWallet, isPending } = useFundWallet()
  const { data: showBalance } = useFetchBallance()
  const [focus, setFocus] = useState(false)
  const appreance = useContext(AppearanceContext)

  const handleInputChange = (event) => {
    const { value } = event.target
    const cleanValue = value.replace(/\D/g, '') // Remove all non-numeric characters
    const formattedValue = new Intl.NumberFormat('en-US').format(cleanValue) // Format with commas
    event.target.value = formattedValue // Display formatted value
    setValue('amount', formattedValue) // Set unformatted value for submission
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const [authUrl, setAuthUrl] = useState()
  const linkRef = useRef(null);
  const naviagte = useNavigate()

  const onSubmit = async (data) => {
    setFocus(false)
    fundWallet({ data })
    .then((res) => {
      if(res.data) {
        setAuthUrl(res.data?.authorization_url)
        toast.success(res.data.message, {
          duration: 2000,
      })     
      const authorizationUrl = res?.data?.authorization_url 
      if (authorizationUrl) {
         localStorage.setItem('paystack_redirect', window.location.pathname)
         window.location.href = authorizationUrl
      }
      }
    })
    .catch((error) => {
      toast.error(error.response?.data?.message ?? error.message, {
      duration: 2000,
      })
    })
  }
  // useEffect(() => {
  //   if(authUrl) {
  //     linkRef.current.click()
  //   }
  // }, authUrl)
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
        >
          <ModalContent className=' overflow-visible'>
            <div className='p-6 md:p-12 rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 bg-fuchsia-400 top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='self-stretch flex-col justify-center items-start gap-6 flex'>
                  <div className='self-stretch  flex-col justify-start items-start gap-[18px] flex'>
                    <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
                      <div className="text-sm font-bold font-['Manrope']">
                        Fund Your Trendit³ Wallet
                      </div>
                      <div className=" text-center text-zinc-400 text-xs font-normal font-['Manrope']">
                        Please enter the amount you would like to fund your
                        wallet with
                      </div>
                    </div>
                    <div className='justify-start flex-col items-start gap-[19px] flex'>
                      <div className='self-stretch  flex-col rounded-none gap-2 flex'>
                        <div className="text-sm font-medium font-['Manrope']">
                          Amount
                        </div>
                        <Controller
                          name='amount'
                          control={control}
                          render={({ field }) => (
                            <Input
                              type='text'
                              size='sm'
                              placeholder='Amount'
                              onClick={ () => (setFocus(true))}
                              {...field}
                              errorMessage={errors?.amount?.message}
                              // isInvalid={!!errors?.amount}
                              startContent={
                                <span className={`${appreance === 'dark' ? (focus ? 'text-white' : 'text-black') : 'text-[#C026D3]'}`}>{showBalance?.currency_symbol}</span>
                              }
                              onChange={handleInputChange}
                              classNames={{
                                input: [
                                  'text-black/90 dark:text-white/90',
                                  'placeholder:text-black dark:placeholder:text-black',
                                  'focus-within:placeholder:text-black focus-within:dark:placeholder:text-white ',
                                ],
                                innerWrapper: 'bg-transparent',
                                inputWrapper: [
                                  'rounded-none',
                                  'dark:bg-white',
                                  '!cursor-text',
                                  'border-2 border-transparent',
                                  'focus-within:!border-fuchsia-600  ',
                                ],
                              }}
                              className={`rounded text-[12.83px] font-normal font-['Manrope']`}
                            />
                          )}
                          rules={{required: true, 
                            validate: {
                              isMin: (fieldValue) => {
                                return (
                                  fieldValue.replace(/\D/g, '') >= 500 || 'The minimum funding amount is #500'
                                )
                              },
                              isMax: (fieldValue) => {
                                return (
                                      fieldValue.replace(/\D/g, '') <= 500000 || 'The maximum funding amount is #500,000'
                                )
                              }
                            }
                          }}
                        />
                        <small className=" text-zinc-400 text-xs font-normal font-['Manrope']">
                          You can choose your preferred method of payment, such
                          as card payment, bank transfer or USSD, simply by
                          clicking on the payment options.
                        </small>
                      </div>
                      <div className='self-stretch'>
                        <Button
                          type='submit'
                          isDisabled={isPending}
                          className=" w-full px-6 py-6  bg-fuchsia-600 rounded text-center text-white text-[12.83px] font-medium font-['Manrope']"
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
                            'Fund Wallet'
                          )}
                        </Button>
                        <a
                          href={localStorage.getItem('authUrl')}
                          ref={linkRef}
                          style={{ display: 'none' }} // Hide the link visually
                          target="_self"
                          rel="noopener noreferrer"
                        >
                          Open Link
                        </a>
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
