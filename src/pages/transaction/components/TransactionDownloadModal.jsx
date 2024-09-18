/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Modal, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useDownloadTransHistory } from '../../../api/downloadHistoryApi'
import { useState } from 'react'
import { format } from 'date-fns'
import Loader from '../../Loader'

export default function TransactionDownloadModal({ isOpen, onClose }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [period, setPeriod] = useState('All time')

  const { mutateAsync: downloadHistory, isPending } = useDownloadTransHistory()

  const handleExport = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates.', { duration: 6000 })
      return
    }

    try {
      const res = await downloadHistory({
        start_date: startDate,
        end_date: endDate,
        format: 'pdf',
      })
      if (res?.status) {
        const blob = await res?.data
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `Transaction_Statement_${startDate}_to_${endDate}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(downloadUrl)
      } else {
        toast.error('Failed to download the file.', { duration: 6000 })
      }
    } catch (error) {
      toast.error('Error: ' + error.message, { duration: 6000 })
    }
  }
  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd')
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
          className='rounded-none w-[23rem] md:w-[30rem]'
        >
          <ModalContent className=' overflow-visible'>
            <div className='p-6 md:p-12 rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='w-full max-w-2xl mt-5 flex flex-col gap-4'>
                <div className='grid'>
                  <label htmlFor='start_date'>Start Date</label>
                  <input
                    type='date'
                    className="p-2 border border-gray-700 rounded font-['Manrope']"
                    value={startDate}
                    onChange={(e) => setStartDate(formatDate(e.target.value))}
                  />
                </div>
                <div className='grid'>
                  <label htmlFor='end_date'>End Date</label>
                  <input
                    type='date'
                    className="p-2 border border-gray-700 rounded font-['Manrope']"
                    value={endDate}
                    onChange={(e) => setEndDate(formatDate(e.target.value))}
                  />
                </div>
                <select
                  className="p-2 border border-gray-700 rounded font-['Manrope']"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value='All time'>All time</option>
                  <option value='Last 7 days'>Last 7 days</option>
                  <option value='Last 30 days'>Last 30 days</option>
                  <option value='This month'>This month</option>
                  <option value='Last month'>Last month</option>
                </select>
                <button
                  onClick={handleExport}
                  className='px-4 py-2 primaryBg rounded'
                >
                  {isPending ? (
                    <div className='flex justify-center'>
                      <Loader />
                    </div>
                  ) : (
                    'Export'
                  )}
                </button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
