const InformationCollect = () => {
    return (
        <div className="text-white" id="information-we-collect">
            <h6>Information We Collect</h6>
            <p>We collect two type of information through our App:</p>
            <ul className="list-disc">
                <li>Personal Information:This information directly identifies you and may include:</li>
                <ul className="list-disc pl-8">
                    <li>Username (if applicable)</li>
                    <li>Email address</li>
                    <li>Social media profile information (publicly available) that you connect to the App</li>
                    <li>Payment information (if you choose to make in-app purchases)</li>
                </ul>
                <li>Non-Personal Information:This information does not directly identify you and may include:</li>
                <ul className="list-disc pl-8">
                    <li>Device information (type, operating system, unique identifiers)</li>
                    <li>Usage data (time spent on the App, features used, tasks completed)</li>
                    <li>Log data (IP address, browsing history within the App)</li>
                </ul>
            </ul>
        </div>
    )
}
export default InformationCollect