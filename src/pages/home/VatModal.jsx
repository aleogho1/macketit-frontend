import { Button, Modal, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import WithdrawWalletModal from './WithdrawWalletModal'
import { useDisclosure } from '@nextui-org/react'
const VatModal = ({ isOpen, onClose }) => {
  const {
    isOpen: openWithdraw,
    onOpen: onOpenWithdraw,
    onClose: onCloseWithdraw,
  } = useDisclosure()
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
        <ModalContent className='overflow-visible'>
          <div className='p-6 rounded flex-col justify-center items-center gap-12 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <p>Withdraw Earnings</p>
            <p className='text-[#B1B1B1] font-sm text-center'>
              Please note that V.A.T charges of 1.5% would be deducted on every
              withdrawal transaction, to proceed with this term click on the
              continue button below
            </p>
            <div className='flex items-center gap-x-4'>
              <Button
                className='bg-[#4CAF50] w-32 text-white'
                onClick={onOpenWithdraw}
              >
                Continue
              </Button>
              <Button className='bg-[#FF543E] w-32' onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
      {openWithdraw && (
        <WithdrawWalletModal isOpen={openWithdraw} onClose={onCloseWithdraw} />
      )}
    </>
  )
}
export default VatModal
