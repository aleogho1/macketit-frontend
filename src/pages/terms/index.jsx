import { useEffect } from 'react'
import InformationCollect from './components/InformationCollect'
import ChildrenPrivacy from './components/childrenPrivacy'
import DataSecurity from './components/dataSecurity'
import How from './components/how'
import Membership from './components/membership'
import PrivacyChanges from './components/privacyChanges'
import SharingInformation from './components/sharingInformation'
import SideTab from './components/sideTab'
import YourChoices from './components/yourChoices'

const Terms = () => {
  return (
    <div className='flex'>
      <SideTab />
      <div className='bg-black pt-20 w-11/12 pl-10 flex flex-col gap-y-2 text-white'>
        <h2 className='text-white font-bold text-2xl text-center mb-6'>
          Terms of services
        </h2>
        <div
          className='text-white flex flex-col gap-y-2 text-base'
          id='accepting-the-terms'
        >
          <p className='w-10/12 leading-6'>
            MacketIT³ respects the privacy of our users. This Privacy Policy
            describes how we collect, use, disclose, and secure your information
            when you use our mobile application and website. With MacketIT³, you
            can easily advertise your products and services and also earn daily
            income by reposting adverts on your social media accounts
          </p>
          <InformationCollect />
          <How />
          <SharingInformation />
          <DataSecurity />
          <YourChoices />
          <ChildrenPrivacy />
          <Membership />
          <PrivacyChanges />
        </div>
      </div>
    </div>
  )
}
export default Terms
