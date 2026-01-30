import { Dot } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PrivacyPolicyPage = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center px-6">
            <div className="flex flex-col w-full max-w-[1272px] items-center gap-6 py-6 md:py-9">
                <Link href="/" className="flex justify-center items-center self-start text-primary bg-primary/20 gap-1 md:w-[132.5px] w-[100.5px] rounded-full md:h-[58px] h-[48px]">
                    {chevronBackIcon}
                    <span className="text-xl font-medium">Back</span>
                </Link>
                <div className="flex flex-col justify-center items-center gap-4">
                    <h1 className="md:text-[52px] text-[32px] font-bold leading-[100%] tracking-tighter">Privacy Policy</h1>
                    <span className="text-lg md:text-2xl text-[#8F8F8F]">Last Updated: 01/01/2026</span>
                </div>
            </div>
            <div className="flex flex-col w-full max-w-[1272px] gap-6 md:gap-8 pb-6 md:py-10">
                <span className="text-xl md:text-2xl">This Privacy Policy explains how personal information is collected, used, and protected when you interact with us through our website or sign up to receive email or text message communications. <br />
                    We take privacy seriously and are committed to handling information thoughtfully and responsibly.</span>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Information We Collect
                    </h1>
                    <span className="text-xl md:text-2xl">
                        We collect limited personal information in order to communicate with you.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Personal Information
                    </h1>
                    <span className="text-xl md:text-2xl font-medium">
                        This may include:
                    </span>
                    <span className="text-xl md:text-2xl">
                        Name <br />
                        Email address <br />
                        Phone number <br />
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Communications
                    </h1>
                    <span className="text-xl md:text-2xl">
                        We may collect information related to our communications, such as message interactions or replies, to help us understand engagement and improve how we communicate. We do not collect payment information, account credentials, or sensitive personal data.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        How Information Is Used
                    </h1>
                    <span className="text-xl md:text-2xl font-medium">
                        Personal information is used to:
                    </span>
                    <span className="text-xl md:text-2xl">
                        Send email and text message communications <br />
                        Share updates, content, and announcements <br />
                        Provide information about launches or offerings <br />
                        Improve communication relevance and timing <br />
                        Meet legal and regulatory requirements. <br />
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Email & SMS Communications
                    </h1>
                    <span className="text-xl md:text-2xl font-medium">
                        If you choose to receive email or SMS messages, standard messaging and data rates may apply.
                    </span>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className="px-1.5"><div className="size-1.25 rounded-full bg-[#2A2A2A]"></div></div>
                            <span className="text-xl md:text-2xl">Message frequency may vary
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-1.5"><div className="size-1.25 rounded-full bg-[#2A2A2A]"></div></div>
                            <span className="text-xl md:text-2xl">You may opt out at any time
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-1.5"><div className="size-1.25 rounded-full bg-[#2A2A2A]"></div></div>
                            <span className="text-xl md:text-2xl">Reply STOP to any text message
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-1.5"><div className="size-1.25 rounded-full bg-[#2A2A2A]"></div></div>
                            <span className="text-xl md:text-2xl">Use the unsubscribe link in emails
                            </span>
                        </div>
                    </div>
                    <span className="text-xl md:text-2xl">
                        Consent to receive communications is not a condition of any purchase.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Sharing of Information
                    </h1>
                    <span className="text-xl md:text-2xl font-medium">
                        Personal information is not sold.
                    </span>
                    <span className="text-xl md:text-2xl">
                        Information may be shared with trusted service providers that support communication delivery (such as email and SMS platforms). These providers are permitted to use information only to provide services on our behalf and are required to protect it.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Cookies & Website Analytics
                    </h1>
                    <span className="text-xl md:text-2xl">
                        Our website may use basic cookies or analytics tools to understand general usage and improve performance. This information is not used to identify individuals. You can manage cookie preferences through your browser settings.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Data Protection
                    </h1>
                    <span className="text-xl md:text-2xl">
                        Reasonable administrative and technical safeguards are used to protect personal information. While no system can guarantee absolute security, appropriate steps are taken to reduce risk.
                    </span>
                </div>
                <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                    Hello@sundaygirl.space
                </h1>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Children’s Privacy
                    </h1>
                    <span className="text-xl md:text-2xl">
                        Our communications are intended for a general audience and are not directed toward children under the age of 13.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Updates to This Policy
                    </h1>
                    <span className="text-xl md:text-2xl">
                        This Privacy Policy may be updated periodically. Any changes will be reflected on this page with an updated date.
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                        Contact
                    </h1>
                    <span className="text-xl md:text-2xl">
                        If you have questions about this Privacy Policy or how information is handled, please contact us at:
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-primary font-medium text-2xl md:text-3xl tracking-tight">
                        Hello@sundaygirl.space
                    </h1>
                    <h1 className="text-primary font-medium text-2xl md:text-3xl tracking-tight">
                        www.sundaygirl.space
                    </h1>
                </div>
            </div>
        </div>
    )
}

const chevronBackIcon = (<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 4C11.5 4 7.00001 7.31418 7 8.5C6.99999 9.6859 11.5 13 11.5 13" stroke="#E07386" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
)

export default PrivacyPolicyPage