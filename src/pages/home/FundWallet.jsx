/* eslint-disable react/no-unescaped-entities */

import { Button, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  useFetchBallance,
  useFundWallet,
  useFundWalletHistory,
} from '../../api/walletApi'
import { format } from 'date-fns'

export default function FundWallet() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({})
  const { data: showBalance } = useFetchBallance()

  const { mutateAsync: fundWallet, isPending } = useFundWallet()
  const { data: fundHistory } = useFundWalletHistory()

  const onSubmit = async (data) => {
    try {
      const res = await fundWallet({ data })
      console.log(res?.data)
      if (res.data.status) {
        const authorizationUrl = res?.data?.authorization_url
        toast.success(res.data.message, {
          duration: 1000,
        })
        if (authorizationUrl) {
          localStorage.setItem('paystack_redirect', window.location.pathname)
          window.open(authorizationUrl) // Open the URL in a new tab
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        duration: 1000,
      })
    }
  }

  return (
    <div>
      <div className='w-full p-3 flex-col justify-start items-start gap-3 inline-flex'>
        <div className='self-stretch grow shrink basis-0 flex-col justify-start items-start gap-4 flex'>
          <div className='cursor-pointer self-stretch flex-col justify-start items-start gap-2 flex'>
            <div
              onClick={() => navigate(-1)}
              className='justify-start items-center gap-[7px] inline-flex'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M19.0001 12H6.00009M11.0001 6L5.7072 11.2929C5.31668 11.6834 5.31668 12.3166 5.7072 12.7071L11.0001 18'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
              <div className="text-center text-fuchsia-200 text-sm font-medium font-['Manrope']">
                Go back
              </div>
            </div>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
              <div className='self-stretch p-6 bg-white bg-opacity-5 border border-stone-900 flex-col justify-center items-start gap-6 flex'>
                <div className='self-stretch  flex-col justify-start items-start gap-[18px] flex'>
                  <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
                    <div className='self-stretch justify-center items-start gap-3 inline-flex'>
                      <div className='grow shrink basis-0 justify-start items-center gap-2 flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                        >
                          <path
                            d='M3.39476 13.1881L3.62176 12.7426H3.62176L3.39476 13.1881ZM2.81207 12.6054L3.25758 12.3784H3.25758L2.81207 12.6054ZM12.6054 13.1881L12.3784 12.7426H12.3784L12.6054 13.1881ZM13.1881 12.6054L12.7426 12.3784V12.3784L13.1881 12.6054ZM12.6054 4.14538L12.3784 4.59089L12.3784 4.59089L12.6054 4.14538ZM13.1881 4.72807L12.7426 4.95507L13.1881 4.72807ZM3.39476 4.14538L3.16777 3.69988H3.16777L3.39476 4.14538ZM2.81207 4.72807L2.36657 4.50108H2.36657L2.81207 4.72807ZM10.3641 9.9274L10.5911 9.48189L10.3641 9.9274ZM10.0727 9.63605L10.5182 9.40906L10.0727 9.63605ZM14.5941 9.63605L14.1486 9.40906L14.5941 9.63605ZM14.3027 9.9274L14.0757 9.48189L14.3027 9.9274ZM14.3027 7.40605L14.0757 7.85156L14.3027 7.40605ZM14.5941 7.6974L14.1486 7.92439L14.5941 7.6974ZM10.3641 7.40605L10.5911 7.85156L10.3641 7.40605ZM10.0727 7.6974L10.5182 7.92439L10.0727 7.6974ZM3.81439 3.53582C3.55799 3.63838 3.43329 3.92936 3.53584 4.18575C3.6384 4.44215 3.92939 4.56685 4.18578 4.4643L3.81439 3.53582ZM9.75249 1.6991L9.56679 1.23486V1.23486L9.75249 1.6991ZM10.1667 4.00006C10.1667 4.2762 10.3906 4.50006 10.6667 4.50006C10.9429 4.50006 11.1667 4.2762 11.1667 4.00006H10.1667ZM4.80008 4.50006H11.2001V3.50006H4.80008V4.50006ZM11.2001 12.8334H4.80008V13.8334H11.2001V12.8334ZM3.16675 11.2001V6.13339H2.16675V11.2001H3.16675ZM12.8334 6.13339V7.50006H13.8334V6.13339H12.8334ZM12.8334 10.1251V11.2001H13.8334V10.1251H12.8334ZM4.80008 12.8334C4.41846 12.8334 4.16232 12.833 3.96507 12.8169C3.77365 12.8012 3.68213 12.7733 3.62176 12.7426L3.16777 13.6336C3.39261 13.7481 3.63038 13.7929 3.88363 13.8136C4.13105 13.8338 4.43496 13.8334 4.80008 13.8334V12.8334ZM2.16675 11.2001C2.16675 11.5652 2.16636 11.8691 2.18657 12.1165C2.20727 12.3698 2.25201 12.6075 2.36657 12.8324L3.25758 12.3784C3.22681 12.318 3.19889 12.2265 3.18325 12.0351C3.16714 11.8378 3.16675 11.5817 3.16675 11.2001H2.16675ZM3.62176 12.7426C3.46495 12.6627 3.33747 12.5352 3.25758 12.3784L2.36657 12.8324C2.54234 13.1773 2.8228 13.4578 3.16777 13.6336L3.62176 12.7426ZM11.2001 13.8334C11.5652 13.8334 11.8691 13.8338 12.1165 13.8136C12.3698 13.7929 12.6076 13.7481 12.8324 13.6336L12.3784 12.7426C12.318 12.7733 12.2265 12.8012 12.0351 12.8169C11.8378 12.833 11.5817 12.8334 11.2001 12.8334V13.8334ZM12.8334 11.2001C12.8334 11.5817 12.833 11.8378 12.8169 12.0351C12.8013 12.2265 12.7733 12.318 12.7426 12.3784L13.6336 12.8324C13.7482 12.6075 13.7929 12.3698 13.8136 12.1165C13.8338 11.8691 13.8334 11.5652 13.8334 11.2001H12.8334ZM12.8324 13.6336C13.1774 13.4578 13.4578 13.1773 13.6336 12.8324L12.7426 12.3784C12.6627 12.5352 12.5352 12.6627 12.3784 12.7426L12.8324 13.6336ZM11.2001 4.50006C11.5817 4.50006 11.8378 4.50045 12.0351 4.51656C12.2265 4.5322 12.318 4.56012 12.3784 4.59089L12.8324 3.69988C12.6076 3.58532 12.3698 3.54058 12.1165 3.51989C11.8691 3.49967 11.5652 3.50006 11.2001 3.50006V4.50006ZM13.8334 6.13339C13.8334 5.76827 13.8338 5.46437 13.8136 5.21695C13.7929 4.96369 13.7482 4.72592 13.6336 4.50108L12.7426 4.95507C12.7733 5.01544 12.8013 5.10696 12.8169 5.29838C12.833 5.49563 12.8334 5.75177 12.8334 6.13339H13.8334ZM12.3784 4.59089C12.5352 4.67078 12.6627 4.79826 12.7426 4.95507L13.6336 4.50108C13.4578 4.15611 13.1774 3.87565 12.8324 3.69988L12.3784 4.59089ZM4.80008 3.50006C4.43496 3.50006 4.13105 3.49967 3.88363 3.51989C3.63038 3.54058 3.39261 3.58532 3.16777 3.69988L3.62176 4.59089C3.68213 4.56012 3.77365 4.5322 3.96507 4.51656C4.16232 4.50045 4.41846 4.50006 4.80008 4.50006V3.50006ZM3.16675 6.13339C3.16675 5.75177 3.16714 5.49563 3.18325 5.29838C3.19889 5.10696 3.22681 5.01544 3.25758 4.95507L2.36657 4.50108C2.25201 4.72592 2.20727 4.96369 2.18657 5.21695C2.16636 5.46437 2.16675 5.76827 2.16675 6.13339H3.16675ZM3.16777 3.69988C2.8228 3.87565 2.54234 4.15611 2.36657 4.50108L3.25758 4.95507C3.33747 4.79827 3.46495 4.67078 3.62176 4.59089L3.16777 3.69988ZM11.0667 7.83339H13.6001V6.83339H11.0667V7.83339ZM14.1667 8.40006V8.93339H15.1667V8.40006H14.1667ZM13.6001 9.50006H11.0667V10.5001H13.6001V9.50006ZM10.5001 8.93339V8.40006H9.50008V8.93339H10.5001ZM11.0667 9.50006C10.8718 9.50006 10.7557 9.49967 10.6696 9.49264C10.5894 9.48608 10.5802 9.47632 10.5911 9.48189L10.1371 10.3729C10.2906 10.4511 10.4461 10.4777 10.5882 10.4893C10.7244 10.5004 10.8883 10.5001 11.0667 10.5001V9.50006ZM9.50008 8.93339C9.50008 9.11183 9.49969 9.27572 9.51083 9.41197C9.52243 9.55406 9.54901 9.70951 9.62724 9.86305L10.5182 9.40906C10.5238 9.41999 10.5141 9.41079 10.5075 9.33054C10.5005 9.24446 10.5001 9.12833 10.5001 8.93339H9.50008ZM10.5911 9.48189C10.5597 9.46592 10.5342 9.44042 10.5182 9.40906L9.62724 9.86305C9.73909 10.0826 9.91757 10.261 10.1371 10.3729L10.5911 9.48189ZM14.1667 8.93339C14.1667 9.12833 14.1664 9.24446 14.1593 9.33054C14.1528 9.41079 14.143 9.41999 14.1486 9.40906L15.0396 9.86305C15.1178 9.70951 15.1444 9.55406 15.156 9.41197C15.1671 9.27572 15.1667 9.11183 15.1667 8.93339H14.1667ZM13.6001 10.5001C13.7785 10.5001 13.9424 10.5004 14.0787 10.4893C14.2208 10.4777 14.3762 10.4511 14.5297 10.3729L14.0757 9.48189C14.0867 9.47632 14.0775 9.48608 13.9972 9.49264C13.9111 9.49967 13.795 9.50006 13.6001 9.50006V10.5001ZM14.1486 9.40906C14.1326 9.44042 14.1071 9.46592 14.0757 9.48189L14.5297 10.3729C14.7493 10.261 14.9277 10.0826 15.0396 9.86305L14.1486 9.40906ZM13.6001 7.83339C13.795 7.83339 13.9111 7.83378 13.9972 7.84082C14.0775 7.84737 14.0867 7.85713 14.0757 7.85156L14.5297 6.96055C14.3762 6.88232 14.2208 6.85574 14.0787 6.84414C13.9424 6.833 13.7785 6.83339 13.6001 6.83339V7.83339ZM15.1667 8.40006C15.1667 8.22163 15.1671 8.05773 15.156 7.92148C15.1444 7.77939 15.1178 7.62394 15.0396 7.4704L14.1486 7.92439C14.143 7.91346 14.1528 7.92266 14.1593 8.00291C14.1664 8.08899 14.1667 8.20512 14.1667 8.40006H15.1667ZM14.0757 7.85156C14.1071 7.86754 14.1326 7.89303 14.1486 7.92439L15.0396 7.4704C14.9277 7.25088 14.7493 7.0724 14.5297 6.96055L14.0757 7.85156ZM11.0667 6.83339C10.8883 6.83339 10.7244 6.833 10.5882 6.84414C10.4461 6.85574 10.2906 6.88232 10.1371 6.96055L10.5911 7.85156C10.5802 7.85713 10.5894 7.84737 10.6696 7.84082C10.7557 7.83378 10.8718 7.83339 11.0667 7.83339V6.83339ZM10.5001 8.40006C10.5001 8.20512 10.5005 8.08899 10.5075 8.00291C10.5141 7.92266 10.5238 7.91346 10.5182 7.92439L9.62724 7.4704C9.54901 7.62394 9.52243 7.77939 9.51083 7.92148C9.49969 8.05773 9.50008 8.22163 9.50008 8.40006H10.5001ZM10.1371 6.96055C9.91757 7.0724 9.73909 7.25088 9.62724 7.4704L10.5182 7.92439C10.5342 7.89303 10.5597 7.86754 10.5911 7.85156L10.1371 6.96055ZM4.18578 4.4643L9.93818 2.16333L9.56679 1.23486L3.81439 3.53582L4.18578 4.4643ZM10.1667 2.31808V4.00006H11.1667V2.31808H10.1667ZM9.93818 2.16333C10.0477 2.11954 10.1667 2.20017 10.1667 2.31808H11.1667C11.1667 1.49271 10.3331 0.928322 9.56679 1.23486L9.93818 2.16333Z'
                            fill='white'
                          />
                        </svg>
                        <div className="grow shrink basis-0 text-white text-sm font-semibold font-['Manrope']">
                          Fund wallet
                        </div>
                      </div>
                    </div>
                    <div className='self-stretch justify-center items-start gap-3 inline-flex'>
                      <div className='grow shrink basis-0 h-2 justify-start items-center gap-2 flex'>
                        <div className="grow shrink basis-0 text-zinc-400 text-xs font-normal font-['Manrope']">
                          Wallet balance
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch text-fuchsia-200 text-[40px] font-normal font-['Manrope']">
                      {showBalance?.currency_symbol}:{showBalance?.balance}
                    </div>
                  </div>
                  <div className='justify-start items-start gap-[19px] flex'>
                    <div className='self-stretch w-[250px]  bg-white bg-opacity-10 rounded-none justify-start items-center gap-2 inline-flex'>
                      <Controller
                        name='amount'
                        control={control}
                        render={({ field }) => (
                          <Input
                            type='text'
                            size='sm'
                            placeholder='amount'
                            {...field}
                            errorMessage={errors?.amount?.message}
                            isInvalid={!!errors?.amount}
                            startContent={
                              // `₦`
                              showBalance?.currency_symbol

                              // <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                            }
                            classNames={{
                              input: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-black dark:placeholder:text-black',
                              ],
                              innerWrapper: 'bg-transparent',
                              inputWrapper: [
                                'bg-zinc-700 bg-opacity-10',
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
                            className=" rounded  text-black text-[12.83px] font-normal font-['Manrope']"
                          />
                        )}
                      />
                    </div>
                    <div className=''>
                      <Button
                        type='submit'
                        isDisabled={isPending}
                        className="md:w-[280px] px-6 py-6  bg-primarybutton rounded text-center text-white text-[12.83px] font-medium font-['Manrope']"
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
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='self-stretch py-3 justify-start items-start gap-2 flex'>
            <div className="grow shrink basis-0 text-zinc-400 text-xs font-normal font-['Manrope']">
              You can choose your preferred method of payment such as Card
              Payment, Bank Transfer, USSD etc. Simply click on "Change Payment"
              button on the Payment Checkout page.
            </div>
          </div>
          <div className="text-white text-base font-medium font-['Manrope']">
            Funding History
          </div>
          <div className='self-stretch px-3 justify-start items-start gap-12 inline-flex'>
            <div className="w-[166.50px] text-white text-opacity-50 text-xs font-medium font-['Manrope']">
              ID
            </div>
            <div className="w-[256.50px] text-white text-opacity-50 text-xs font-medium font-['Manrope']">
              Date
            </div>
            <div className="w-[188px] text-white text-opacity-50 text-xs font-medium font-['Manrope']">
              Amount
            </div>
            <div className="w-[214px] text-white text-opacity-50 text-xs font-medium font-['Manrope']">
              Payment Method
            </div>
            <div className="text-white text-opacity-50 text-xs font-medium font-['Manrope']">
              Status
            </div>
          </div>
          {fundHistory?.map((history) => (
            <>
              <div
                key={history?.id}
                className='self-stretch flex-col justify-start items-start gap-0.5 flex'
              >
                <div className='self-stretch p-3 bg-white bg-opacity-10 border border-stone-900 justify-between items-center inline-flex'>
                  <div className='p-1.5 bg-white bg-opacity-10 rounded-md justify-center items-center gap-1.5 flex'>
                    <div className='justify-start items-center gap-2 flex'>
                      <div className="text-center text-zinc-400 text-xs font-normal font-['Manrope'] tracking-wide">
                        {history?.id}{' '}
                      </div>
                    </div>
                  </div>
                  <div className='flex-col justify-center items-start gap-1.5 inline-flex'>
                    <div className="self-stretch text-zinc-400 text-xs font-medium font-['Manrope']">
                      {format(history?.created_at, 'do MMMM yyyy')}
                    </div>
                  </div>
                  <div>
                    <span className="text-white text-[12.83px] font-normal font-['Manrope']">
                      ₦
                    </span>
                    <span className="text-white text-[12.83px] font-medium font-['Manrope']">
                      {' '}
                      {history?.amount}{' '}
                    </span>
                  </div>
                  <div className="text-right text-white text-[12.83px] font-medium font-['Manrope']">
                    {history?.payment_method}
                  </div>
                  <div
                    className={`px-2 py-1 ${
                      history?.status === 'complete'
                        ? 'bg-white'
                        : 'bg-rose-100'
                    }    justify-center items-center gap-2 flex`}
                  >
                    <div
                      className={`text-center ${
                        history?.status === 'complete'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }  text-xs font-semibold font-['Manrope']`}
                    >
                      {history?.status === 'complete' ? 'Approved' : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
