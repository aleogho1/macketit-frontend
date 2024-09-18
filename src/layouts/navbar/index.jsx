/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react'

import { MdMenu } from 'react-icons/md'
import { dashboardContext } from '../../context/Dashboard'

import UserDropdown from '../components/UserDropdown'
import { Search } from 'lucide-react'
import SignOutModal from '../../components/auth/SignOutModal'
import { useDisclosure } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import DropdownNotification from '../components/DropdownNotification'
import { useGetNotification } from '../../api/notificationApi'

// const Navbar = ({ onNotificationClick, isOpen, showRightSidebar }) => {
const Navbar = () => {
  const { toggleSideBar, sidebarOpen, sidebarMinimized } =
    useContext(dashboardContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { data: notification } = useGetNotification()
  const [unread, setUnread] = useState(0)
  useEffect(() => {
    if (notification) {
      for (const item of notification) {
        if (item?.read === false) {
          setUnread((prevRead) => prevRead + 1)
        }
      }
    }
  }, [notification])

  return (
    <>
      <div
        className={`right-0 left-0 p-2 shadow-md z-20 sticky top-0 bg-white  dark:bg-neutral-900`}
      >
        <div className='px-3 py-1 '>
          <div className='flex items-center justify-between'>
            <div
              className={`flex items-center justify-between gap-2  p-2 ${
                sidebarMinimized && !sidebarOpen
                  ? 'flex  ml-0'
                  : sidebarMinimized && sidebarOpen
                  ? 'flex  ml-[7.2rem]'
                  : sidebarOpen
                  ? 'flex '
                  : !sidebarMinimized && !sidebarOpen && 'flex  ml-0'
              }`}
            >
              <div className='flex items-center justify-between '>
                <div
                  className=' lg:hidden cursor-pointer'
                  onClick={() => toggleSideBar()}
                >
                  <MdMenu size={25} />
                </div>

                <div
                  className={`hidden lg:flex  items-center gap-2  
            ${
              sidebarMinimized
                ? 'lg:ml-[1.5rem]'
                : sidebarOpen
                ? 'lg:ml2'
                : !sidebarMinimized && !sidebarOpen && 'lg:ml-0'
            }
            
            `}
                >
                  <div className='hidden flx lg:hidden  h-full  '>
                    <button className='pl3  py-1 pt-[0.5rem] outline-none rounded'>
                      {' '}
                      <Search className=' text-gray-400' size={20} />
                    </button>
                  </div>
                  <div className='hidden lg:flex'>
                    <UserDropdown />
                  </div>
                </div>
              </div>
            </div>

            <div className='hidden md:block'>
              <div
                className={`flex itemscenter  
            ${
              sidebarMinimized
                ? 'lg:ml-[1.5rem] justifyend'
                : sidebarOpen
                ? 'lg:ml-32'
                : !sidebarMinimized && !sidebarOpen && 'lg:ml-0'
            }
            
            `}
              >
                <div
                  className={`w[181px] h-6 justify-start items-center gap-6 lg:inline-flex hidden`}
                >
                  <div className='w-6 h-6 relative cursor-pointer'>
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
                  <div className='w-6 h-6 cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <path
                        d='M9.00007 22H15.0001M5.00007 9C5.00007 5.13401 8.13408 2 12.0001 2C15.8661 2 19.0001 5.13401 19.0001 9V11.5778C19.0001 13.1572 19.4676 14.7013 20.3437 16.0154L20.8333 16.7498C20.9173 16.8758 20.8585 17.0472 20.7148 17.0951C15.058 18.9807 8.94216 18.9807 3.28532 17.0951C3.14166 17.0472 3.08286 16.8758 3.16685 16.7498L3.65647 16.0154C4.53257 14.7013 5.00007 13.1572 5.00007 11.5778V9Z'
                        stroke='#B1B1B1'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    {dropdownOpen ? <DropdownNotification /> : ''}
                  </div>
                  <span className='relative -mt-6 font-bold text-[10px] -ml-6 text-black dark:text-white'>
                    {unread}
                  </span>
                  <div
                    onClick={onOpen}
                    className='justify-start w-full items-center gap-[7px] cursor-pointer flex'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M5.99991 7C5.99991 7.55228 6.44762 8 6.99991 8C7.55219 8 7.99991 7.55228 7.99991 7H5.99991ZM7.99991 17C7.99991 16.4477 7.55219 16 6.99991 16C6.44762 16 5.99991 16.4477 5.99991 17H7.99991ZM8.09192 20.782L8.54591 19.891L8.54591 19.891L8.09192 20.782ZM7.21789 19.908L6.32689 20.362L7.21789 19.908ZM20.7819 19.908L21.6729 20.362L20.7819 19.908ZM19.9079 20.782L19.4539 19.891L19.4539 19.891L19.9079 20.782ZM19.9079 3.21799L19.4539 4.10899V4.10899L19.9079 3.21799ZM20.7819 4.09202L19.8909 4.54601V4.54601L20.7819 4.09202ZM7.21789 4.09202L8.1089 4.54601L7.21789 4.09202ZM8.09192 3.21799L7.63793 2.32698V2.32698L8.09192 3.21799ZM13.9999 13C14.5522 13 14.9999 12.5523 14.9999 12C14.9999 11.4477 14.5522 11 13.9999 11V13ZM2.9999 11C2.44762 11 1.9999 11.4477 1.9999 12C1.9999 12.5523 2.44762 13 2.9999 13V11ZM4.83196 9.5547C5.13831 9.09517 5.01413 8.4743 4.55461 8.16795C4.09508 7.8616 3.47421 7.98577 3.16785 8.4453L4.83196 9.5547ZM2.1848 11.7227L3.01686 12.2774H3.01686L2.1848 11.7227ZM2.1848 12.2774L3.01686 11.7227L2.1848 12.2774ZM3.16785 15.5547C3.47421 16.0142 4.09508 16.1384 4.55461 15.8321C5.01413 15.5257 5.13831 14.9048 4.83196 14.4453L3.16785 15.5547ZM7.99991 7V6.2H5.99991V7H7.99991ZM10.1999 4H17.7999V2H10.1999V4ZM19.9999 6.2V17.8H21.9999V6.2H19.9999ZM17.7999 20H10.1999V22H17.7999V20ZM7.99991 17.8V17H5.99991V17.8H7.99991ZM10.1999 20C9.62335 20 9.25108 19.9992 8.96774 19.9761C8.69608 19.9539 8.59536 19.9162 8.54591 19.891L7.63793 21.673C8.01631 21.8658 8.40953 21.9371 8.80488 21.9694C9.18855 22.0008 9.65635 22 10.1999 22V20ZM5.99991 17.8C5.99991 18.3436 5.99913 18.8114 6.03047 19.195C6.06278 19.5904 6.13409 19.9836 6.32689 20.362L8.1089 19.454C8.08371 19.4045 8.04603 19.3038 8.02383 19.0322C8.00068 18.7488 7.99991 18.3766 7.99991 17.8H5.99991ZM8.54591 19.891C8.35775 19.7951 8.20477 19.6422 8.1089 19.454L6.32689 20.362C6.61451 20.9265 7.07345 21.3854 7.63794 21.673L8.54591 19.891ZM19.9999 17.8C19.9999 18.3766 19.9991 18.7488 19.976 19.0322C19.9538 19.3038 19.9161 19.4045 19.8909 19.454L21.6729 20.362C21.8657 19.9836 21.937 19.5904 21.9693 19.195C22.0007 18.8114 21.9999 18.3436 21.9999 17.8H19.9999ZM17.7999 22C18.3435 22 18.8113 22.0008 19.1949 21.9694C19.5903 21.9371 19.9835 21.8658 20.3619 21.673L19.4539 19.891C19.4045 19.9162 19.3037 19.9539 19.0321 19.9761C18.7487 19.9992 18.3765 20 17.7999 20V22ZM19.8909 19.454C19.795 19.6422 19.6421 19.7951 19.4539 19.891L20.3619 21.673C20.9264 21.3854 21.3853 20.9265 21.6729 20.362L19.8909 19.454ZM17.7999 4C18.3765 4 18.7487 4.00078 19.0321 4.02393C19.3037 4.04612 19.4045 4.0838 19.4539 4.10899L20.3619 2.32698C19.9835 2.13419 19.5903 2.06287 19.1949 2.03057C18.8113 1.99922 18.3435 2 17.7999 2V4ZM21.9999 6.2C21.9999 5.65645 22.0007 5.18864 21.9693 4.80497C21.937 4.40963 21.8657 4.01641 21.6729 3.63803L19.8909 4.54601C19.9161 4.59545 19.9538 4.69617 19.976 4.96784C19.9991 5.25117 19.9999 5.62345 19.9999 6.2H21.9999ZM19.4539 4.10899C19.6421 4.20487 19.795 4.35785 19.8909 4.54601L21.6729 3.63803C21.3853 3.07354 20.9264 2.6146 20.3619 2.32698L19.4539 4.10899ZM7.99991 6.2C7.99991 5.62345 8.00068 5.25117 8.02383 4.96784C8.04603 4.69617 8.08371 4.59545 8.1089 4.54601L6.32689 3.63803C6.13409 4.01641 6.06278 4.40963 6.03047 4.80497C5.99913 5.18864 5.99991 5.65645 5.99991 6.2H7.99991ZM10.1999 2C9.65635 2 9.18855 1.99922 8.80488 2.03057C8.40953 2.06287 8.01631 2.13419 7.63793 2.32698L8.54591 4.10899C8.59536 4.0838 8.69608 4.04612 8.96774 4.02393C9.25108 4.00078 9.62335 4 10.1999 4V2ZM8.1089 4.54601C8.20477 4.35785 8.35775 4.20487 8.54591 4.10899L7.63793 2.32698C7.07345 2.6146 6.61451 3.07354 6.32689 3.63803L8.1089 4.54601ZM13.9999 11H2.9999V13H13.9999V11ZM3.16785 8.4453L1.35275 11.168L3.01686 12.2774L4.83196 9.5547L3.16785 8.4453ZM1.35275 12.8321L3.16785 15.5547L4.83196 14.4453L3.01686 11.7227L1.35275 12.8321ZM1.35275 11.168C1.01685 11.6718 1.01686 12.3282 1.35275 12.8321L3.01686 11.7227C3.12882 11.8906 3.12882 12.1094 3.01686 12.2774L1.35275 11.168Z'
                        fill='#B1B1B1'
                      />
                    </svg>
                    <div className="text-center text-zinc-400 text-sm font-medium font-['Manrope']">
                      Sign Out
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className='flex items-center justify-between md:gap-8  gap-3 pr-4'>
            <UserDropdown className='font-medium text-gray-600' />
          </div> */}
            <div className='flex items-center lg:hidden'>
              <div className='hidden fle lg:hidden  h-full  '>
                <button className='pl3  py-1 pt-[0.5rem] outline-none rounded'>
                  {' '}
                  <Search className=' text-gray-400' size={20} />
                </button>
              </div>
              {/* <div
                    onClick={() => setAppearance()}
                    className='w-6 h-6 relative cursor-pointer hidden sm:flex'
                  >
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
              </div> */}
              <div
                className='w-6 h-6 cursor-pointer flex flex-row'
                onClick={() => navigate('notification')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M9.00007 22H15.0001M5.00007 9C5.00007 5.13401 8.13408 2 12.0001 2C15.8661 2 19.0001 5.13401 19.0001 9V11.5778C19.0001 13.1572 19.4676 14.7013 20.3437 16.0154L20.8333 16.7498C20.9173 16.8758 20.8585 17.0472 20.7148 17.0951C15.058 18.9807 8.94216 18.9807 3.28532 17.0951C3.14166 17.0472 3.08286 16.8758 3.16685 16.7498L3.65647 16.0154C4.53257 14.7013 5.00007 13.1572 5.00007 11.5778V9Z'
                    stroke='#B1B1B1'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <span className='relative -mt-6 font-bold text-[10px] mr-4 text-black dark:text-white'>
                {unread}
              </span>
              <div className=''>
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignOutModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Navbar
