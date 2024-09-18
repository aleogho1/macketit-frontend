import { Button, useDisclosure } from '@nextui-org/react'
import { useBankDetails } from '../../api/walletApi'
import Loader from '../Loader'
import BankCard from './BankCard'
import AddBankModal from './AddBankModal'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import API from '../../services/AxiosInstance'
// import Select from 'react-select'

export default function BankDetailsForm() {
  const { data: bankDetails, isLoading } = useBankDetails()
  console.log(bankDetails)
  useEffect(() => {
    API.get('/profile/bank')
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
  })
  const [bankInfo, setBankInfo] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
  })

  return (
    <>
      {isLoading ? (
        <div className='min-h-screen mx-auto'>
          <Loader />
        </div>
      ) : (
        <div className='grid md:px-16 py-6 '>
          {bankDetails ? <BankCard {...bankInfo} /> : null}
          <BankDetailsFormContent setBankInfo={setBankInfo} />
        </div>
      )}
    </>
  )
}

function BankDetailsFormContent({ setBankInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: bankDetails } = useBankDetails()

  return (
    <>
      <div className='my-6'>
        <Button
          type='button'
          onClick={onOpen}
          className='md:w-[290px]  cursor-pointer px-6 py-6 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
        >
          <AiOutlinePlusCircle />
          <div className='text-center text-white capitalize text-sm font-medium font-Manrope'>
            {bankDetails ? 'update Bank' : 'Add Bank'}
          </div>
        </Button>
      </div>
      {isOpen && (
        <AddBankModal isOpen={isOpen} onClose={onClose} setBank={setBankInfo} />
      )}
    </>
  )
}
