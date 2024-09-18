/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

const FaqCard = ({ faqs }) => {
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleAccordion = (id) => {
    setOpenFaqId((prevOpenId) => (prevOpenId === id ? null : id))
  }

  return (
    <>
      {faqs?.length === 0 && (
        <div className="text-[20px] font-medium font-['Manrope']">
          No search result{' '}
        </div>
      )}
      {faqs?.map((faq) => (
        <div
          key={faq?.id}
          className='self-stretch w-full flex-col p-3 bg-gray-200 dark:bg-[#1E1E1E] dark:border my-0.5 dark:border-stone-900 justify-start gap-6 inline-flex'
        >
          <div
            onClick={() => toggleAccordion(faq?.id)}
            className='flex gap-2 cursor-pointer items-center'
          >
            {openFaqId === faq.id ? (
              <FaMinus className='text-primaryText dark:text-[#FFCFFD] cursor-pointer' />
            ) : (
              <FaPlus className='text-primaryText dark:text-[#FFCFFD] cursor-pointer' />
            )}
            <div className="grow shrink basis-0 text-[12.83px] font-medium font-['Manrope']">
              {faq.ques}
            </div>
          </div>
          {openFaqId === faq.id && (
            <div className="text-[12.83px] font-medium font-['Manrope']">
              {faq.answ}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default FaqCard
