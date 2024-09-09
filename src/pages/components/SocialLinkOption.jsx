import { Modal, ModalContent } from "@nextui-org/react"
import { AiOutlineClose } from "react-icons/ai"
import Icons from "../../components/Icon"
import SocialLinkModal from "./SocialLinkModal"
import { useDisclosure } from "@nextui-org/react"
import { useState, useContext } from "react"
import { AppearanceContext } from '../../providers/AppearanceProvider'
const SocialLinkOption = ({ isOpen, onClose,}) => {
    const appearance = useContext(AppearanceContext)
    const socials = [
        {
            icon: 'facebook',
            lable: 'Facebook',
            platform: 'facebook'
        },
        {
            icon: 'instagram',
            lable: 'Instagram',
            platform: 'instagram'
        },
        {
            icon: `${appearance === 'dark' ? 'twitter' : 'x-lite'}`,
            lable: 'X',
            platform: 'x'
        },
        {
            icon: `${appearance === 'dark' ? 'tik-tok' : 'tik-tok-lite'}`,
            lable: 'Tiktok',
            platform: 'tiktok'
        },
        {
            icon: `${appearance === 'dark' ? 'thread' : 'thread-lite'}`,
            lable: 'Threads',
            platform: 'threads'
        },
        // {
        //     icon: 'whatsapp',
        //     lable: 'WhatsApp',
        //     platform: 'whatsapp'
        // },
    ]
    const {
        isOpen: isOpenVerify,
        onOpen: onOpenVerify,
        onClose: onCloseVerify,
      } = useDisclosure()

      const [isVerify, setVerify] = useState(socials[0])
    const openSocialModal = (index) => {
        setVerify(socials[index])    
        onOpenVerify()    
    }
    return (
        <>
            <Modal
            placement='center'
            size='lg'
            backdrop='blur'
            isOpen={isOpen}
            onClose={onClose}
            hideCloseButton={true}
            className='rounded-none'
            scrollBehavior='outside'
            >
                <ModalContent  className='flex flex-col w-11/12 items-center justify-center'>
                    <div className="flex flex-col w-10/12 items-center pt-6 pb-12">
                        <div className='p-2 bg-fuchsia-400 top-[-20px] absolute z-40 -right-2 md:-right-4 cursor-pointer rounded-[100px]'  onClick={onClose}>
                            <AiOutlineClose size={20} color='#fff' />
                        </div>
                        <h4 className="text-center text-sm">Link Your Social Media Accounts</h4>
                        <p className="text-center text-sm">
                            To link any of your social media accounts click on the button below
                        </p>
                        <div className="w-10/12 flex flex-col gap-y-4 pt-6">
                            {socials.map((social, index) => (
                                <div key={index} className="flex items-center gap-x-4 py-4 cursor-pointer" onClick={() => openSocialModal(index)}>
                                    <Icons type={social.icon} width={20} height={20}/>
                                    <p className="md:text-[14px] text-[12px]">Link your {social.lable} account</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalContent>
            </Modal>
            {isOpenVerify && (
                 <SocialLinkModal
                    type={isVerify?.lable}
                    icon= {isVerify?.icon}
                    platform={isVerify?.platform}
                    isOpen={isOpenVerify}
                    onClose={onCloseVerify}
                />
            )                
            }
        </>
    )
}
export default SocialLinkOption