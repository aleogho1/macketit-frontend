/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, useDisclosure } from '@nextui-org/react'
import { useGetProfile } from '../../api/profileApis'
import SignOutModal from '../../components/auth/SignOutModal'
import { ProfileContext } from '../../context/Profile'

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const trigger = useRef(null)
  const dropdown = useRef(null)
  const profile_ = useContext(ProfileContext)

  const { data: profileDeatils } = useGetProfile()
  // const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className='relative flex items-center'>
      <div
        // onClick={() => setAppearance()}
        className='w-6 h-6 relative sm:hidden cursor-pointer mr-8'
      >
        {/* <MdModeNight /> */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M11.9999 2V4M19.071 4.92893L17.6568 6.34315M21.9999 12H19.9999M19.071 19.0711L17.6568 17.6569M11.9999 20V22M6.34307 17.6569L4.92885 19.0711M4 12.0001H2M6.34303 6.34322L4.92882 4.92901M15.9999 12C15.9999 14.2091 14.2091 16 11.9999 16C9.79078 16 7.99992 14.2091 7.99992 12C7.99992 9.79086 9.79078 8 11.9999 8C14.2091 8 15.9999 9.79086 15.9999 12Z'
            stroke='#B1B1B1'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </div>
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        // onClick={() => navigate('/dashboard/settings')}
        className='flex items-center gap-4  hover:no-underline text-inherit'
        to='#'
      >
        <span className='rounded-full flex items-center'>
          <Avatar
            className='w-[42px] h-[42px] rounded-md border border-red-500'
            src={
              profile_?.profile_picture?.length === 1
                ? URL.createObjectURL(profile_?.profile_picture[0])
                : profile_?.profile_picture || profileDeatils?.profile_picture
            }
            title={profileDeatils?.firstname + ' ' + profileDeatils?.lastname}
          />
        </span>
        <span className='hidden text-left lg:block'>
          <div className='flex gap-1'>
            <div className='flex-col justify-start  gap-1.5 inline-flex'>
              <div className="text-center  text-[12.83px] font-bold font-['Manrope']">
                {(profile_ ? profile_?.firstname : profileDeatils?.firstname) +
                  ' ' +
                  (profile_ ? profile_?.lastname : profileDeatils?.lastname)}
              </div>
              <div className="text-zinc-400 text-sm font-medium font-['Manrope']">
                @{profile_ ? profile_?.username : profileDeatils?.username}
              </div>
            </div>

            {/* <ChevronDown className='text-gray-300 hidden lg:block' /> */}

            <div
              // onClick={() => navigate('/dashboard/transactions')}
              // onClick={navigate('/dashboard/settings')}
              className=''
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='15'
                viewBox='0 0 14 15'
                fill='none'
              >
                <path
                  d='M10.5 5.75L7 9.25L3.5 5.75'
                  stroke='#B1B1B1'
                  strokeWidth='1.16667'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className='relative'
      >
        <div
          // onClick={() => navigate('/dashboard/settings')}
          className={dropdownOpen === true ? 'block lg:hidden' : 'hidden'}
        >
          <svg
            className={`fill-current sm:block absolute  right-4 top-[0.6rem] z-50 rotate-180`}
            fill='#272C33'
            color='white'
            width='16'
            height='13'
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 386.257 386.257'
          >
            <polygon points='0,96.879 193.129,289.379 386.257,96.879 ' />
          </svg>
        </div>
        <div
          className={`absolute right-0 mt-[1.2rem] px-3 lg:hidden flex w-60 flex-col rounded-sm border dark:border-transparent z-[555] dark:bg-neutral-900 bg-white shadow-xl ${
            dropdownOpen === true ? 'block' : 'hidden'
          }`}
        >
          <div className='shadow-lg px-8 py-12  rounded flex-col justify-center items-start gap-6 inline-flex'>
            <div className=' flex-col justify-start items-start gap-6 flex'>
              <div className='self-stretch justify-start items-center gap-[7px] inline-flex'>
                <Link
                  to='/dashboard/settings'
                  className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-fuchsia-600 lg:text-base'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M12.0001 14.75C14.4164 14.75 16.3751 12.7912 16.3751 10.375C16.3751 7.95875 14.4164 6 12.0001 6C9.58388 6 7.62512 7.95875 7.62512 10.375C7.62512 12.7912 9.58388 14.75 12.0001 14.75ZM12.0001 14.75C15.4102 14.75 18.2507 16.5788 18.8733 19M12.0001 14.75C8.59007 14.75 5.74953 16.5788 5.12695 19M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                      stroke-linecap='round'
                      className='stroke-black dark:stroke-white'
                    />
                  </svg>
                  <div className='text-center text-sm font-medium font-Manrope'>
                    My Profile
                  </div>
                </Link>
              </div>
              <div className='self-stretch flex justify-start items-center gap-[7px]'>
                <button
                  className='flex items-center gap-3.5 py-4 text-sm font-medium duration-300 ease-in-out hover:text-fuchsia-600 lg:text-base group'
                  onClick={onOpen}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M6.49966 7C6.49966 7.27614 6.72352 7.5 6.99966 7.5C7.2758 7.5 7.49966 7.27614 7.49966 7H6.49966ZM7.49966 17C7.49966 16.7239 7.2758 16.5 6.99966 16.5C6.72352 16.5 6.49966 16.7239 6.49966 17H7.49966ZM8.09168 20.782L8.31868 20.3365H8.31867L8.09168 20.782ZM7.21765 19.908L6.77214 20.135L7.21765 19.908ZM20.7817 19.908L21.2272 20.135L20.7817 19.908ZM19.9076 20.782L19.6806 20.3365H19.6806L19.9076 20.782ZM19.9076 3.21799L19.6806 3.66349V3.66349L19.9076 3.21799ZM20.7817 4.09202L20.3362 4.31901V4.31901L20.7817 4.09202ZM7.21765 4.09202L7.66315 4.31901V4.31901L7.21765 4.09202ZM8.09168 3.21799L7.86469 2.77248L7.86468 2.77248L8.09168 3.21799ZM13.9997 12.5C14.2758 12.5 14.4997 12.2761 14.4997 12C14.4997 11.7239 14.2758 11.5 13.9997 11.5V12.5ZM2.99966 11.5C2.72352 11.5 2.49966 11.7239 2.49966 12C2.49966 12.2761 2.72352 12.5 2.99966 12.5V11.5ZM4.41569 9.27735C4.56886 9.04759 4.50678 8.73715 4.27701 8.58397C4.04725 8.4308 3.73681 8.49289 3.58364 8.72265L4.41569 9.27735ZM2.18456 11.7227L2.60059 12H2.60059L2.18456 11.7227ZM2.18456 12.2774L2.60059 12L2.18456 12.2774ZM3.58364 15.2774C3.73681 15.5071 4.04725 15.5692 4.27701 15.416C4.50678 15.2628 4.56886 14.9524 4.41569 14.7226L3.58364 15.2774ZM7.49966 7V6.2H6.49966V7H7.49966ZM10.1997 3.5H17.7997V2.5H10.1997V3.5ZM20.4997 6.2V17.8H21.4997V6.2H20.4997ZM17.7997 20.5H10.1997V21.5H17.7997V20.5ZM7.49966 17.8V17H6.49966V17.8H7.49966ZM10.1997 20.5C9.63136 20.5 9.2352 20.4996 8.92678 20.4744C8.6242 20.4497 8.45035 20.4036 8.31868 20.3365L7.86468 21.2275C8.16083 21.3784 8.48092 21.4413 8.84535 21.4711C9.20394 21.5004 9.64786 21.5 10.1997 21.5V20.5ZM6.49966 17.8C6.49966 18.3518 6.49927 18.7957 6.52857 19.1543C6.55834 19.5187 6.62125 19.8388 6.77214 20.135L7.66315 19.681C7.59606 19.5493 7.54997 19.3755 7.52525 19.0729C7.50005 18.7645 7.49966 18.3683 7.49966 17.8H6.49966ZM8.31867 20.3365C8.03643 20.1927 7.80696 19.9632 7.66315 19.681L6.77214 20.135C7.01183 20.6054 7.39428 20.9878 7.86469 21.2275L8.31867 20.3365ZM20.4997 17.8C20.4997 18.3683 20.4993 18.7645 20.4741 19.0729C20.4494 19.3755 20.4033 19.5493 20.3362 19.681L21.2272 20.135C21.3781 19.8388 21.441 19.5187 21.4708 19.1543C21.5 18.7957 21.4997 18.3518 21.4997 17.8H20.4997ZM17.7997 21.5C18.3515 21.5 18.7954 21.5004 19.154 21.4711C19.5184 21.4413 19.8385 21.3784 20.1346 21.2275L19.6806 20.3365C19.549 20.4036 19.3751 20.4497 19.0725 20.4744C18.7641 20.4996 18.368 20.5 17.7997 20.5V21.5ZM20.3362 19.681C20.1924 19.9632 19.9629 20.1927 19.6806 20.3365L20.1346 21.2275C20.605 20.9878 20.9875 20.6054 21.2272 20.135L20.3362 19.681ZM17.7997 3.5C18.368 3.5 18.7641 3.50039 19.0725 3.52559C19.3751 3.55031 19.549 3.5964 19.6806 3.66349L20.1346 2.77248C19.8385 2.62159 19.5184 2.55868 19.154 2.52891C18.7954 2.49961 18.3515 2.5 17.7997 2.5V3.5ZM21.4997 6.2C21.4997 5.6482 21.5 5.20428 21.4708 4.84569C21.441 4.48126 21.3781 4.16117 21.2272 3.86502L20.3362 4.31901C20.4033 4.45069 20.4494 4.62454 20.4741 4.92712C20.4993 5.23554 20.4997 5.6317 20.4997 6.2H21.4997ZM19.6806 3.66349C19.9629 3.8073 20.1924 4.03677 20.3362 4.31901L21.2272 3.86502C20.9875 3.39462 20.605 3.01217 20.1346 2.77248L19.6806 3.66349ZM7.49966 6.2C7.49966 5.6317 7.50005 5.23554 7.52525 4.92712C7.54997 4.62454 7.59606 4.45069 7.66315 4.31901L6.77214 3.86502C6.62125 4.16117 6.55834 4.48126 6.52857 4.84569C6.49927 5.20428 6.49966 5.6482 6.49966 6.2H7.49966ZM10.1997 2.5C9.64786 2.5 9.20394 2.49961 8.84535 2.52891C8.48092 2.55868 8.16083 2.62159 7.86469 2.77248L8.31868 3.66349C8.45035 3.5964 8.6242 3.55031 8.92678 3.52559C9.2352 3.50039 9.63136 3.5 10.1997 3.5V2.5ZM7.66315 4.31901C7.80696 4.03677 8.03643 3.8073 8.31868 3.66349L7.86468 2.77248C7.39428 3.01217 7.01183 3.39462 6.77214 3.86502L7.66315 4.31901ZM13.9997 11.5H2.99966V12.5H13.9997V11.5ZM3.58364 8.72265L1.76854 11.4453L2.60059 12L4.41569 9.27735L3.58364 8.72265ZM1.76854 12.5547L3.58364 15.2774L4.41569 14.7226L2.60059 12L1.76854 12.5547ZM1.76854 11.4453C1.5446 11.7812 1.5446 12.2188 1.76854 12.5547L2.60059 12L2.60059 12L1.76854 11.4453Z'
                      fill='#FF3D00'
                    />
                  </svg>
                  <div className='text-center text-orange-600 text-sm font-medium font-Manrope'>
                    Sign Out
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Dropdown End --> */}

      <SignOutModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default UserDropdown
