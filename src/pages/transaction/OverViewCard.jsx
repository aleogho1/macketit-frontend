import { Button } from '@nextui-org/button'
import { useDisclosure } from '@nextui-org/react'
import { ExternalLinkIcon } from 'lucide-react'
import { IoAdd } from 'react-icons/io5'
// import SelectPaymentmodal from './components/SelectPaymentmodal'
import { useFetchBallance } from '../../api/walletApi'
import FundWalletModal from '../home/FundWalletModal'
import WithdrawWalletModal from '../home/WithdrawWalletModal'
import TransactionDownloadModal from './components/TransactionDownloadModal'

export default function OverViewCard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenTransac,
    onOpen: onOpenTrans,
    onClose: onCloseTransc,
  } = useDisclosure()

  const { data: showBalance } = useFetchBallance()
  const {
    isOpen: openWithdraw,
    onOpen: onOpenWithdraw,
    onClose: onCloseWithdraw,
  } = useDisclosure()

  return (
    <div>
      <div className='self-stretch  p-6 bg-[#1E1E1E] dark:bg-white dark:bg-opacity-5 border border-stone-900 flex-col justify-center items-start gap-6 flex'>
        <div className='self-stretch  flex-col justify-start items-start gap-4 flex'>
          <div className='self-stretch flex-col justify-start items-center gap-3 flex'>
            <div className='self-stretch justify-center items-start gap-3 inline-flex'>
              {/* <div className='grow shrink basis-0 justify-start items-center gap-2 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M2 6.66634H14M5.33333 3.99967V1.33301M10.6667 3.99967V1.33301M6.26667 14.6663H9.73333C11.2268 14.6663 11.9735 14.6663 12.544 14.3757C13.0457 14.12 13.4537 13.7121 13.7094 13.2103C14 12.6399 14 11.8931 14 10.3997V6.93301C14 5.43953 14 4.6928 13.7094 4.12237C13.4537 3.6206 13.0457 3.21265 12.544 2.95699C11.9735 2.66634 11.2268 2.66634 9.73333 2.66634H6.26667C4.77319 2.66634 4.02646 2.66634 3.45603 2.95699C2.95426 3.21265 2.54631 3.6206 2.29065 4.12237C2 4.6928 2 5.43953 2 6.93301V10.3997C2 11.8931 2 12.6399 2.29065 13.2103C2.54631 13.7121 2.95426 14.12 3.45603 14.3757C4.02646 14.6663 4.77319 14.6663 6.26667 14.6663Z'
                    stroke='#B1B1B1'
                    strokeLinecap='round'
                  />
                </svg>
                <div className="grow shrink basis-0 text-white dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                  Jan 1 - Jan 27, 2023
                </div>
              </div> */}
              {/* <div
                onClick={onOpenTrans}
                className='justify-start cursor-pointer hidden items-center gap-2 md:flex'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M8 9.33291L8 3.33291M5.33333 5.33291L7.5286 3.13764C7.78895 2.8773 8.21106 2.8773 8.47141 3.13765L10.6667 5.33291M2.66667 13.3329L13.3333 13.3329'
                    className='dark:stroke-[#FF6DFB] stroke-[#FF6DFB]'
                    strokeLinecap='round'
                  />
                </svg>
                <div className="text-[#FF6DFB] dark:text-fuchsia-400 text-sm font-medium font-['Manrope']">
                  Export
                </div>
              </div>
              <div className='justify-start items-center gap-2 flex'>
                <div className="dark:opacity-50 text-white dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                  Period
                </div>
                <div className="text-white dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                  All time
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                >
                  <path
                    d='M10.5 5.25L7 8.75L3.5 5.25'
                    className='dark:stroke-[#B1B1B1] stroke-white'
                    strokeWidth='1.16667'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div> */}
            </div>
            <div className="self-stretch mx-auto md:mx-0 text-[#FF6DFB] dark:text-fuchsia-200 text-[40px] font-normal font-['Manrope']">
              <span>{showBalance?.currency_symbol}</span>
              {showBalance?.balance?.toLocaleString()}
            </div>
          </div>
          <div className='justify-start items-center w-full gap-[19px] flex'>
            <div className='pb-4 justify-center items-center md:justify-start md:items-start  gap-4 flex'>
              <Button
                onClick={onOpen}
                startContent={
                  <IoAdd size={30} className='w-[18px]  h-[18px] ' />
                }
                variant='light'
                className="grow rounded-none w-[120px] shrink basis-0 h-[34px] p-2 bg-[#FF6DFB] dark:bg-white border border-black justify-center items-center gap-1 flex text-center text-white dark:text-black text-[12.83px] font-bold font-['Manrope']"
              >
                Fund
              </Button>

              <Button
                onClick={onOpenWithdraw}
                startContent={
                  <ExternalLinkIcon size={30} className='w-[18px] h-[18px] ' />
                }
                variant='light'
                className="text-center rounded-none w-[120px] grow shrink basis-0 h-[34px] p-2 bg-[#FF6DFB] dark:bg-white border border-black justify-center items-center gap-1 flex text-white dark:text-black text-[12.83px] font-bold font-['Manrope']"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
        {/* <div className='self-stretch justify-start items-center  flex-wrap gap-[53px] inline-flex'>
          <div className='grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex'>
            <div className="self-stretch text-white text-[8.83px] font-medium font-['Manrope']">
              Total Earned
            </div>
            <div className='self-stretch justify-start items-center gap-2 inline-flex'>
              <div className="text-white text-[12.83px] font-medium font-['Manrope']">
                N 30,008.25
              </div>
              <div className='justify-start items-start flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='11'
                  height='11'
                  viewBox='0 0 11 11'
                  fill='none'
                >
                  <path
                    d='M5.04166 1.83301H5.95833V7.33301L8.47916 4.81217L9.13 5.46301L5.5 9.09301L1.87 5.46301L2.52083 4.81217L5.04166 7.33301V1.83301Z'
                    fill='#FF3D00'
                  />
                </svg>
                <div className="text-center text-orange-600 text-[10px] font-normal font-['Manrope']">
                  53.3%
                </div>
              </div>
            </div>
          </div>
          <div className='grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex'>
            <div className='self-stretch justify-start items-center gap-1 inline-flex'>
              <div className="text-white text-[8.83px] font-medium font-['Manrope']">
                Total Earned
              </div>
            </div>
            <div className='self-stretch justify-start items-center gap-2 inline-flex'>
              <div className="text-white text-[12.83px] font-medium font-['Manrope']">
                N 30,008.25
              </div>
              <div className='justify-start items-start flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='11'
                  height='12'
                  viewBox='0 0 11 12'
                  fill='none'
                >
                  <path
                    d='M5.04166 2.33301H5.95833V7.83301L8.47916 5.31217L9.13 5.96301L5.5 9.59301L1.87 5.96301L2.52083 5.31217L5.04166 7.83301V2.33301Z'
                    fill='#FF3D00'
                  />
                </svg>
                <div className="text-center text-orange-600 text-[10px] font-normal font-['Manrope']">
                  53.3%
                </div>
              </div>
            </div>
          </div>
          <div className='grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex'>
            <div className="self-stretch text-white text-[8.83px] font-medium font-['Manrope']">
              Total Earned
            </div>
            <div className="self-stretch text-white text-[12.83px] font-medium font-['Manrope']">
              0.00
            </div>
          </div>
          <div className='grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex'>
            <div className="self-stretch text-white text-[8.83px] font-medium font-['Manrope']">
              Total Earned
            </div>
            <div className='self-stretch justify-start items-center gap-2 inline-flex'>
              <div className="text-white text-[12.83px] font-medium font-['Manrope']">
                N 30,008.25
              </div>
              <div className='justify-start items-start flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='11'
                  height='12'
                  viewBox='0 0 11 12'
                  fill='none'
                >
                  <path
                    d='M5.04167 9.66699H5.95833V4.16699L8.47917 6.68783L9.13 6.03699L5.5 2.40699L1.87 6.03699L2.52083 6.68783L5.04167 4.16699V9.66699Z'
                    fill='#4CAF50'
                  />
                </svg>
                <div className="text-center text-white opacity-50 dark:opacity-100 dark:text-green-500 text-[10px] font-normal font-['Manrope']">
                  53.3%
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* <SelectPaymentmodal isOpen={isOpen} onClose={onClose} /> */}
      {isOpen && <FundWalletModal isOpen={isOpen} onClose={onClose} />}
      {openWithdraw && (
        <WithdrawWalletModal isOpen={openWithdraw} onClose={onCloseWithdraw} />
      )}
      {isOpenTransac && (
        <TransactionDownloadModal
          isOpen={isOpenTransac}
          onClose={onCloseTransc}
        />
      )}
    </div>
  )
}
