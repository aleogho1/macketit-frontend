// import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'
import { useVerifyPayment } from '../../api/walletApi'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Payment() {
  const { mutateAsync: verifyPayment } = useVerifyPayment()
  // const location = useLocation()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const newPage = localStorage.getItem('paystack_redirect')
  useEffect(() => {
    const verifyPaymentOnLoad = async () => {
      const tx_ref = searchParams.get('tx_ref')
      const transaction_id = searchParams.get('transaction_id')
      if (tx_ref && transaction_id) {
        try {
          const res = await verifyPayment({
            reference: tx_ref,
            transaction_id: transaction_id,
          })
          if (
            res?.data?.status &&
            res?.data?.payment_type === 'task-creation'
          ) {
            if (window.opener) {
              window.opener.postMessage('closeOriginalTab', '*')
            }
            navigate(`/dashboard/advertise-history`)
          } else if (res?.data?.status) {
            if (window.opener) {
              window.opener.postMessage('closeOriginalTab', '*')
            }
            navigate(`${newPage}`)
          }
        } catch (error) {
          console.error('Error verifying payment:', error)
        }
      } else {
        navigate(`${newPage}`)
      }
    }

    verifyPaymentOnLoad()
  }, []) // Empty dependency array ensures the effect runs only once when the component mounts

  console.log('loading')

  useEffect(() => {
    console.log('Loading new tab...')

    const handleMessage = (event) => {
      // console.log('Received message in new tab:', event.data)
      if (event.data === 'closeOriginalTab') {
        // console.log('Closing new tab...')
        window.close()
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      console.log('Removing message listener in new tab...')
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   if (params.get('payment') === 'success') {
  //     if (window.opener) {
  //       window.opener.postMessage('closeTab', '*')
  //     }
  //   }
  // }, [location.search])

  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     if (event.data === 'closeTab') {
  //       window.close()
  //     }
  //   }
  //   window.addEventListener('message', handleMessage)
  //   return () => {
  //     window.removeEventListener('message', handleMessage)
  //   }
  // }, [])

  return (
    <div className='bg-stone-800 flex items-center justify-center w-full h-screen'>
      <div className='flex items-center flex-col justify-center '>
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
        <p className='dark:text-white text-white'>Confirming Payment...</p>
      </div>
    </div>
  )
}
