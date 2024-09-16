/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs } from '@nextui-org/tabs'
import { useEffect, useMemo, useState } from 'react'
import { Input } from '@nextui-org/input'
import { SearchIcon } from 'lucide-react'
import FaqCard from './FaqCard'
import { Button } from '@nextui-org/button'
import { useGetProfile } from '../../api/profileApis'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

export default function Support() {
  const [selected, setSelected] = useState('all')
  const { data: userDetails } = useGetProfile()
  const [searchQuery, setSearchQuery] = useState('')

  const supportFaqs = [
    {
      id: 1,
      ques: `What is MacketIT³ all about?`,
      answ: `MacketIT³ is a social finance platform that connects advertisers with earners. Advertisers are those who want to grow or boost their social media presence by posting tasks for earners to perform, such as following, resharing, liking, and commenting, etc. Earners are individuals who are paid for completing these simple tasks on their social media platforms`,
    },
    {
      id: 2,
      ques: `Can I lose money on MacketIT³?`,
      answ: `No, MacketIT³ is 100% safe. We are not an investment company, so you cannot lose what you never invested with us. We provide services to advertisers and pay promoters for promoting our services. We only charge a one-time registration fee to become a member.`,
    },
    {
      id: 3,
      ques: `How much money can I make?`,
      answ: `On MacketIT³, there's no ceiling to your earning potential. Whether you're seeking full-time income or looking to supplement your earnings part-time, MacketIT³ offers flexibility for all. Simply ensure your social media accounts are added and verified. Referrals can boost your earnings, earning you ₦500 for every user who signs up as an earner. Stay active on the platform to maximize your task opportunities.`,
    },
    {
      id: 4,
      ques: `When can I withdraw from MacketIT³?`,
      answ: `You're free to withdraw your earnings upon reaching the minimum withdrawal threshold of ₦1000 (referrals not required). Once requested, your withdrawal will promptly be transferred to your designated bank account. In case of any delays, please reach out to us, and we'll promptly assist you.`,
    },
    {
      id: 5,
      ques: `Do I need to refer before I withdraw?`,
      answ: `No, there's no requirement to refer anyone before withdrawing your earnings. Once you've reached the minimum withdrawal threshold, you can initiate the withdrawal process to the bank account you've linked for payments.`,
    },
    {
      id: 6,
      ques: `How do I register on MacketIT³ as an Earner?`,
      answ: `Visit the MacketIT³ website or app.
Fill out the registration form with your details, such as your name, email address, and password.
Verify your email address by clicking on the verification link OR Code sent to your email inbox.
Once your email is verified, log in to your MacketIT³ account using your credentials.
And activate your account with a one-time payment of ₦1000.
Add your bank account details.
Start earning!
`,
    },
    {
      id: 7,
      ques: `How do I register on MacketIT³ as an Advertiser?`,
      answ: `Visit the MacketIT³ website or app.
Sign up and verify your email.
Log in and navigate to the advertiser registration section.
Fill out the required information to create your advertiser account.
Complete the registration process.
Once registered, you can start posting tasks for earners to complete and boost your social
media presence.
`,
    },
    {
      id: 8,
      ques: `How can I ensure the quality of engagement on MacketIT³?`,
      answ: `MacketIT³ implements strict quality control measures to ensure genuine engagement.
Advertisers can specify task guidelines to ensure that earners perform tasks accurately.
We actively monitor and analyze engagement activities to detect any fraudulent behavior.
`,
    },
    {
      id: 9,
      ques: `Are there any limits on the number of tasks I can post?`,
      answ: `There are no limits on the number of tasks you can post. You can post as many tasks as you want, provided you have a sufficient balance.`,
    },
    {
      id: 10,
      ques: `Can I choose specific tasks for earners to perform on my social media accounts?`,
      answ: `Yes, as an advertiser, you have the flexibility to specify the tasks you want earners to perform on your social media accounts.`,
    },
    {
      id: 11,
      ques: `How can I contact MacketIT³ for support or assistance?`,
      answ: `If you have any further questions or need assistance, you can reach out to our support team through the contact information provided on our website.`,
    },
    {
      id: 12,
      ques: `What type of social media is accepted on MacketIT³?`,
      answ: `MacketIT³ accepts all major social media platforms with good quality. However, fake or idle accounts will be rejected to maintain the integrity of the platform and ensure genuine engagement.`,
    },
    {
      id: 13,
      ques: `Can my account be disabled or banned?`,
      answ: `Yes, if you violate our terms and conditions or submit many rejected tasks, your account may be disabled or banned.`,
    },
    {
      id: 14,
      ques: `How long does it take to withdraw?`,
      answ: `You can withdraw your funds anytime you reach the minimum withdrawal amount of ₦1000. Your money will be sent to your bank account immediately. If you don't receive your money within 24 hours, please contact us with the payment reference given to you on our website.`,
    },
    {
      id: 15,
      ques: `What is social media engagement?`,
      answ: `Social media engagement refers to the interactions that occur between users and content on social media platforms. It encompasses actions such as likes, comments, shares, retweets, mentions, and reactions. Essentially, it measures how actively users participate with content on social media platforms. Higher engagement indicates that users find the content interesting, valuable, or entertaining, and it often leads to increased visibility, reach, and impact of the content.`,
    },
    {
      id: 16,
      ques: `How can I grow my social media engagements?`,
      answ: `You can grow your social media engagements by hiring our earners to perform engagements on your page. To do that, register and activate your account, make a deposit, and place your order with any of the services you want, such as likes, comments, shares, or streaming.`,
    },
    {
      id: 17,
      ques: `How does MacketIT³ ensure strict and genuine quality interactions?`,
      answ: `MacketIT³ maintains high-quality engagement and genuine interactions by implementing strict quality control measures, anti-fraud measures, task guidelines, and monitoring and reporting mechanisms.`,
    },
    {
      id: 19,
      ques: `Are there limits to the number of tasks I can assign to earners?`,
      answ: `No, there is no limit. Once you have a sufficient balance to post the tasks, you can assign as many tasks as you want to earners.`,
    },
  ]

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return supportFaqs
    return supportFaqs.filter(
      (faq) =>
        faq?.ques?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq?.answ?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, supportFaqs])

  useEffect(() => {
    // Initialize Tawk.to API
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()
    const s1 = document.createElement('script')
    const s0 = document.getElementsByTagName('script')[0]
    s1.async = true
    s1.src = 'https://embed.tawk.to/your_property_id/your_widget_id'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    s0.parentNode.insertBefore(s1, s0)
  }, [])

  const handleChatClick = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle()
    }
  }
  return (
    <>
      <div>
        <div className='min-h-screen w-full p-3 flex-col justify-start items-start gap-3 inline-flex'>
          <div className='self-stretch grow shrink basis-0 flex-col justify-start items-start gap-4 flex'>
            <div className='self-stretch  flex-col justify-start items-start gap-2 flex'>
              <div className='self-stretch dark:border-b dark:border-stone-900 justify-center items-center inline-flex'>
                <div className='grow pt-16 pb-6 flex flex-col justify- items-center'>
                  <div className="w-[236px] text-center pb-12 gap-8 text-black dark:text-white text-2xl font-medium font-['Manrope']">
                    Hi {userDetails?.firstname}, How can we help?
                  </div>
                  <div className='self-stretch w-full justify-between items-start gap-4 inline-flex'>
                    <Button className='grow shrink bg-[#FFD0FE] rounded-sm basis-0  px-3 py-[71px] dark:bg-white dark:bg-opacity-5 dark:border dark:border-stone-900 justify-center items-center gap-3 flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='24'
                        viewBox='0 0 25 24'
                        fill='none'
                      >
                        <path
                          d='M12.25 21C17.2206 21 21.25 16.9706 21.25 12C21.25 7.02944 17.2206 3 12.25 3C7.27944 3 3.25 7.02944 3.25 12C3.25 13.157 3.46832 14.263 3.86601 15.279C4.01547 15.6609 4.07957 16.074 4.01147 16.4784L3.36667 20.3072C3.30957 20.6463 3.60374 20.9404 3.94276 20.8833L7.7716 20.2385C8.17598 20.1704 8.58909 20.2345 8.97095 20.384C9.98701 20.7817 11.093 21 12.25 21Z'
                          className='dark:stroke-[#fff] stroke-black '
                          strokeWidth='2'
                        />
                      </svg>
                      <div className="text-center text-black dark:text-white text-sm font-medium font-['Manrope']">
                        <a target='blank' href='mailto:support@MacketIT3.com'>
                          Send email
                        </a>
                      </div>
                    </Button>
                    <Button
                      onClick={handleChatClick}
                      className='grow shrink bg-[#3793FF] basis-0 rounded-sm  px-3 py-[71px] dark:bg-white bg-opacity-20 dark:bg-opacity-5 dark:border dark:border-stone-900 justify-center items-center gap-3 flex'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='24'
                        viewBox='0 0 25 24'
                        fill='none'
                      >
                        <path
                          d='M8.75 10H16.75M8.75 14H12.75M21.75 12C21.75 16.9706 17.7206 21 12.75 21H4.47413C4.1243 21 3.88262 20.65 4.00656 20.3228L4.90021 17.9642C5.12943 17.3593 5.03826 16.6875 4.74225 16.1122C4.10801 14.8796 3.75 13.4816 3.75 12C3.75 7.02944 7.77944 3 12.75 3C17.7206 3 21.75 7.02944 21.75 12Z'
                          className='dark:stroke-[#fff] stroke-black '
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      <div className="text-center text-black dark:text-white text-sm font-medium font-['Manrope']">
                        Start a chat
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
              <div className="text-black dark:text-white text-2xl font-medium font-['Manrope']">
                Frequently asked questions
              </div>
            </div>
            <div className='w-full w[1107px] h-9 px-3 py-1.5 dark:bg-zinc900 rounded justify-start items-center gap-2 inline-flex'>
              <Input
                startContent={<SearchIcon />}
                placeholder=' Search for topics'
                size='sm'
                onChange={(e) => setSearchQuery(e.target.value)}
                classNames={{
                  dataFocused: 'dark:dark:bg-black',
                  input: [
                    'bg-transparent',
                    'text-black/90 dark:text-white/90',
                    'placeholder:text-gray-700/50 dark:placeholder:text-white/60',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'dark:shadow-xl',
                    'dark:bg-zinc-800',
                    'backdrop-blur-xl',
                    'backdrop-saturate-200',
                    'dark:hover:bg-zinc-900',
                    'hover:bg-gray-200',
                    'dark:hover:bg-zinc-800',
                    'group-data-[focused=true]:bg-zinc-800',
                    'dark:group-data-[focused=true]:bg-zinc-800',
                    '!cursor-text',
                  ],
                }}
                className="text-center text-zinc-400 text-sm font-medium font-['Manrope']"
              />
            </div>

            <div className='w-full'>
              {selected === 'all' && (
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  className='flex flex-col gap-2 w-full'
                  transition={{
                    rotate: { duration: 2 },
                    scale: { duration: 0.4 },
                  }}
                >
                  <FaqCard faqs={filteredFaqs} />
                </motion.div>
              )}
              {selected === 'earning' && (
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  className='flex flex-col gap-2 w-full'
                  transition={{
                    rotate: { duration: 2 },
                    scale: { duration: 0.4 },
                  }}
                >
                  <FaqCard faqs={filteredFaqs} />
                </motion.div>
              )}
              {selected === 'advertising' && (
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  className='flex flex-col gap-2 w-full'
                  transition={{
                    rotate: { duration: 2 },
                    scale: { duration: 0.4 },
                  }}
                >
                  <FaqCard faqs={filteredFaqs} />
                </motion.div>
              )}
              {selected === 'orders' && (
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  className='flex flex-col gap-2 w-full'
                  transition={{
                    rotate: { duration: 2 },
                    scale: { duration: 0.4 },
                  }}
                >
                  <FaqCard faqs={filteredFaqs} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TawkMessengerReact
        propertyId='6654737c9a809f19fb35874b'
        widgetId='1husu68ck'
      />
    </>
  )
}
