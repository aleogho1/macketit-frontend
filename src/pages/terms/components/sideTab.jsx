import { useEffect, useState } from "react"
import Logo from "../../../components/Logo"
const SideTab = () => {
   
    const sideLinks = [
        {
            title: 'Accepting the terms',
            link: '#accepting-the-terms',
            id: 'accepting-the-terms'
        },
        {
            title: 'Information We Collect',
            link: '#information-we-collect',
            id: 'information-we-collect'
        },
        {
            title: 'Sharing your information',
            link: '#sharing-your-information',
            id: 'sharing-your-information'
        },
        {
            title: 'Data security',
            link: '#data-security',
            id: 'data-security'
        },
        {
            title: "Children's Privacy",
            link: '#children-privacy',
            id: 'children-privacy'
        },
        {
            title: 'Membership Cancellation',
            link: '#membership-cancellation',
            id: 'membership-cancellation'
        },
        {
            title: 'Change to this privacy policies',
            link: '#privacy-change',
            id: 'privacy-change'
        },
    ]
    const [active, setActive] = useState(sideLinks[0].link)
    return (
        <div className="bg-black w-4/12 pl-4 flex flex-col gap-y-12 py-6">
            <Logo />
            <nav className="flex flex-col gap-y-2 pl-6">
                {sideLinks.map((route, index) => (
                    <a key={index} href={route.link} onClick={() => setActive(route.link)} className={`font-semibold ${active === route.link ? 'text-[#E879F9]' : 'text-[#A1A1A1]'} `}>{route.title}</a>
                ))}
            </nav>
        </div>
    )
}
export default SideTab
