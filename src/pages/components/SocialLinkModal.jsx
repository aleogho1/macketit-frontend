/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button, Modal, ModalContent, Input } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useVerifySocial, useGetSocialLinks } from '../../api/verifySocialApi'
import Loader from '../Loader'
import { useQueryClient } from '@tanstack/react-query'
import Icons from '../../components/Icon'
import { useContext } from 'react'
import { setSocialAcccountContext } from '../../context/SocialAccount'
import API from '../../services/AxiosInstance'

export default function SocialLinkModal({
  isOpen,
  onClose,
  type,
  icon,
  platform,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      platform: platform,
    },
  })
  const setAccount = useContext(setSocialAcccountContext)
  console.log(platform)
  const { mutateAsync: verifySocial, isPending } = useVerifySocial()

  const queryClient = useQueryClient()
  const GetVerified = () => {
    API.get(`/users/social-profiles`)
      .then((response) => {
        setAccount(response.data?.social_profiles)
      })
      .catch((error) => console.error(error))
  }
  const onSubmit = async (data) => {
    try {
      const res = await verifySocial({ ...data })
      if (res.data.status) {
        toast.success(res.data.message)
        queryClient.invalidateQueries({ queryKey: ['get_profile'] })
        onClose()
        GetVerified()
        queryClient.invalidateQueries({ queryKey: ['get_profile'] })
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
      queryClient.invalidateQueries({ queryKey: ['get_profile'] })
    }
    queryClient.invalidateQueries({ queryKey: ['get_profile'] })
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
        <ModalContent className='flex flex-col w-11/12 items-center justify-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center items-center'
          >
            <div className=' px-[26px] py-8 rounded flex-col w-11/12 justify-start items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 primaryBg top-[-20px] absolute z-40 -right-2 md:-right-4 cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='flex-col justify-start items-center gap-3 flex'>
                <div className='justify-start flex-col items-center gap-2 inline-flex'>
                  <Icons type={icon} />
                  <div className="text-base capitalize font-bold font-['Manrope']">
                    Link Your {type} Account
                  </div>
                </div>
                <div className="text-center text-zinc-400 text-sm font-semibold font-['Manrope']">
                  You must obey the following rules in order to successfully
                  link your {type} account to MacketIT³.
                </div>
              </div>
              <ol className='flex-col justify-start items-start gap-2 list-decimal flex'>
                <li className=" text-zinc-400 text-sm font-normal font-['Manrope']">
                  Your account on {type} must have at least 500 Active
                  Followers. Note that Ghost or Bots followers are not allowed
                  and your account on MacketIT³ will be banned if you have ghost
                  followers
                </li>
                <li className=" text-zinc-400 text-sm font-normal font-['Manrope']">
                  You Account on {type} must have been opened one year ago.
                </li>

                <li className=" text-zinc-400 text-sm font-normal font-['Manrope']">
                  You must have posted at least five times on your {type}
                  account within the last one year
                </li>
              </ol>
              <div className='w-[320px] sm:w-full px-3 py-6 bg-zinc-400 gap-3 bg-opacity-20 rounded justify-between itemscenter flex flex-col'>
                <div className=" px-2 text-[12.83px] font-medium font-['Manrope']">
                  Please enter your {type} profile link which you want to use to
                  perform this task:
                </div>
                <div className='self-stretch px-2 md:justifybetween itemscenter gap-4 flex-col inline-flex'>
                  <Controller
                    name='link'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size='sm'
                        errorMessage={errors?.link?.message}
                        isInvalid={!!errors?.link}
                        required={true}
                        placeholder={`${type} profile link`}
                        type='string'
                        classNames={{
                          inputWrapper: [
                            'border-2 border-transparent rounded-none',
                            'focus-within:!border-red-500  ',
                            '!cursor-text',
                          ],
                        }}
                        className={`grow shrink basis-0 focus:ring focus:ring-fuchsia-600 focus:border-2 focus:border-red-500  rounded text-primaryText text-opacity-50 text-[16.83px] font-normal font-['Manrope']`}
                      />
                    )}
                    rules={{
                      required: true,
                      validate: {
                        isValidLink: (fieldValue) => {
                          return (
                            fieldValue.startsWith(`https://${platform}.`) ||
                            fieldValue.startsWith(`https://www.${platform}.`) ||
                            (platform === 'facebook'
                              ? fieldValue.startsWith('https://fb.') ||
                                fieldValue.startsWith(
                                  `https://www.facebook.`
                                ) ||
                                fieldValue.startsWith('https://www.fb.')
                              : '') ||
                            (platform === 'x'
                              ? fieldValue.startsWith('https://twitter.') ||
                                fieldValue.startsWith(`https://www.twitter.`) ||
                                fieldValue.startsWith(`https://www.x.`)
                              : '') ||
                            'Link not valid'
                          )
                        },
                      },
                    }}
                  />
                  <Button
                    type='submit'
                    isDisabled={isPending}
                    className='md:w-[290px]  cursor-pointer px-6 py-6 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
                  >
                    {isPending ? <Loader /> : 'Link Account'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
