const Membership = () => {
    return (
        <div className="w-11/12" id="membership-cancellation">
            <h6>Membership Cancellation</h6>
            <p>For you to cancel your membership and get a refund, you must meet the following conditions:</p>
            <ol className="list-decimal pl-8">
                <li>You must be an ACTIVE Member for at least 30 Days.</li>
                <li>You must not have a CANCELLED TASK OR FAILED TASK on your account. This means you must perform all your tasks properly and on time. You must not miss a task</li>
                <li>You have not earned up to N1,000 either through tasks or referrals</li>
                <li>You have not posted an advert or product on the site</li>
                <li>You have not resell any product on this app</li>
            </ol>
            <p>If the above conditions are met, your membership will be cancelled and your membership money will be refunded back to you.</p>
        </div>
    )
}
export default Membership