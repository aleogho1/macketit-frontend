// import { MousePointerClick } from 'lucide-react'
import { TbSpeakerphone } from 'react-icons/tb'
// import { BiShare } from 'react-icons/bi'
// import { RiMenuSearchLine } from 'react-icons/ri'
import {
  EarnIcon,
  // GrowIcon,
} from '../../assets/EarnIcon'
import { VscHeart } from 'react-icons/vsc'
import { BiBarChart } from 'react-icons/bi'
import { PiWarningOctagon } from 'react-icons/pi'
import { RiHome2Line } from 'react-icons/ri'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'

export const defaultMenu = [
  {
    title: '',
    name: 'Home',
    route: '/dashboard/home',
    // icon: HomeIcon,
    icon: RiHome2Line,
    withSubMenu: false,
  },
  {
    title: '',
    name: 'Earn',
    route: '/dashboard/earn',
    icon: EarnIcon,
    withSubMenu: false,
  },
  {
    title: '',
    name: 'Advertise',
    route: '/dashboard/advertise',
    icon: TbSpeakerphone,
    withSubMenu: false,
  },
  // {
  //   title: '',
  //   name: 'Resell',
  //   route: '/dashboard/resell',
  //   icon: BiShare,
  //   withSubMenu: false,
  // },

  // {
  //   title: 'Market place',
  //   name: 'Orders',
  //   // routeMerge: true,
  //   icon: RiMenuSearchLine,
  //   withSubMenu: false,
  //   route: '/dashboard/orders',
  // },
  // {
  //   title: '',
  //   name: 'Grow',
  //   // routeMerge: true,
  //   icon: GrowIcon,
  //   withSubMenu: false,
  //   route: '/dashboard/grow',
  // },
  // {
  //   title: '',
  //   name: 'Giveaways',
  //   // routeMerge: true,
  //   icon: MousePointerClick,
  //   withSubMenu: false,
  //   route: '/dashboard/giveaways',
  // },

  {
    title: 'Quick Actions',
    name: 'Transactions',
    icon: BiBarChart,
    withSubMenu: false,
    route: '/dashboard/transactions',
  },
  {
    title: '',
    name: 'Refer Link',
    icon: VscHeart,
    withSubMenu: false,
    route: '/dashboard/refer-link',
  },
  {
    title: '',
    name: 'Setting',
    icon: HiOutlineAdjustmentsHorizontal,
    withSubMenu: false,
    route: '/dashboard/settings',
  },
  {
    title: '',
    name: 'Support',
    icon: PiWarningOctagon,
    withSubMenu: false,
    route: '/dashboard/support',
  },
]
