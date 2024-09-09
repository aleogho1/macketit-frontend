import { useBankDetails } from '../../api/walletApi'

const BankCard = ({accountName,  accountNumber, bankName}) => {
  const { data: userBank } = useBankDetails()
  

  return (
    <div className='border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800'>
      <h2 className='text-lg font-bold mb-2'>{accountName ? accountName : userBank?.account_name }</h2>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Account No: {accountNumber ? accountNumber : userBank?.account_no}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Bank Name: {bankName ? bankName : userBank?.bank_name}
      </p>
    </div>
  )
}

export default BankCard
