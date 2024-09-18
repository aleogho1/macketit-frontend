/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Button, Modal, Input, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import {
  useBankDetails,
  useFetchBallance,
  useWitdrawFundsh,
} from '../../api/walletApi'
import { useForm, Controller } from 'react-hook-form'
import BankCard from '../setting/BankCard'
import { useState } from 'react'
import API from '../../services/AxiosInstance'
import { useNavigate } from 'react-router-dom'
export default function WithdrawWalletModal({ isOpen, onClose }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({})
  const { mutateAsync: Withdraw, isPending } = useWitdrawFundsh()
  const { data: showBalance } = useFetchBallance()
  const { data: userBank } = useBankDetails()
  const [focus, setFocus] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { value } = event.target
    const cleanValue = value.replace(/\D/g, '') // Remove all non-numeric characters
    const formattedValue = new Intl.NumberFormat('en-US').format(cleanValue) // Format with commas
    event.target.value = formattedValue // Display formatted value
    setValue('amount', formattedValue) // Set unformatted value for submission
  }
  const onSubmit = async (data) => {
    setFocus(false)
    try {
      const res = await Withdraw({ data })
      if (res.data) {
        console.log(res.data?.withdrawal_info?.transfer_id)
        console.log(res.data?.withdrawal_info?.reference)
        await API.post(`/payment/withdraw/verify`, {
          transfer_id: res.data?.withdrawal_info?.transfer_id,
          reference: res.data?.withdrawal_info?.reference,
        })
          .then((response) => {
            toast.success(response.data?.message)
            navigate('/dashboard/transactions')
          })
          .catch((error) => {
            toast.error(error.response?.data?.message ?? error.message, {
              duration: 2000,
            })
          })
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 2000,
      })
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
                className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='self-stretch p-6 flex-col justify-center items-start gap-6 flex'>
                  <div className='self-stretch  flex-col justify-start items-start gap-[18px] flex'>
                    <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
                      <div className="grow shrink basis-0 text-md font-semibold font-['Manrope']">
                        Withdraw
                      </div>
                    </div>
                    <div className=" text-center text-sm font-normal font-['Manrope']">
                      Please enter the amount you would like to withdraw from
                      your wallet
                    </div>
                    <div className='self-stretch justify-start flex-col items-start gap-[19px] flex'>
                      <div className='self-stretch rounded-none  gap-2 flex-col flex'>
                        <div className='w[275px] flex items-center gap-x-1'>
                          <span className="text-sm font-normal font-['Manrope'] -mr-0.5">
                            Wallet Balance:
                          </span>

                          <span className=" text-sm font-semibold font-['Manrope']">
                            <span>{showBalance?.currency_symbol}</span>
                            {showBalance?.balance?.toLocaleString()}
                          </span>
                        </div>
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
                              onClick={() => setFocus(true)}
                              {...field}
                              errorMessage={errors?.amount?.message}
                              isInvalid={!!errors?.amount}
                              startContent={
                                <span
                                  className={`${
                                    focus ? 'text-white' : 'text-black'
                                  }`}
                                >
                                  {showBalance?.currency_symbol}
                                </span>
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
                                  'focus-within:!border-red-500  ',
                                ],
                              }}
                              className=" rounded text-[12.83px] font-normal font-['Manrope']"
                            />
                          )}
                          rules={{
                            required: true,
                            validate: {
                              isMin: (fieldValue) => {
                                return (
                                  fieldValue.replace(/\D/g, '') >= 1000 ||
                                  'The minimum withdrawal amount is #1,000'
                                )
                              },
                              isMax: (fieldValue) => {
                                return (
                                  fieldValue.replace(/\D/g, '') <= 500000 ||
                                  'The maximum withdrawal amount is #500,000'
                                )
                              },
                            },
                          }}
                        />
                      </div>
                      <div className='self-stretch'>
                        <Button
                          type='submit'
                          isDisabled={isPending}
                          className="w-full px-6 py-6  bg-primarybutton rounded text-center text-white text-[12.83px] font-medium font-['Manrope']"
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
                            'Withdraw Fund'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className='grid md:px-10 '>
                {userBank ? <BankCard /> : null}
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
