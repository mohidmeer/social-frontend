import Footer from "../components/Footer"
import Logo from "../components/Logo"

const Privacy = () => {
  return (
    <>
      <div
        id="home"
        className=" flex flex-col gap-12 p-8 max-w-4xl mx-auto font font-semibold text-lg text-gray-800"
      >
        <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
        <Logo size={50} textOrientation="flex-row" />
        <div className="font-bold">
          Last Updated  June 5, 2025
        </div>

        <div className="flex flex-col gap-3">
          <p>
            {`This privacy policy (“Policy”) describes how Social Mint, developed and maintained by
            IgentWorks, a subsidiary of Igent Holding LLC (“Social Mint,” “we,” “our” or “us”) and its
            related companies (“Company”) collect, use, and share personal information of users of this
            website, www.socialmint.ai (“Site”), and any associated mobile applications (collectively,
            “Apps”). By accessing or using the Site, Apps, or any of our services (the “Service”), you
            consent to the practices described in this Policy`}
          </p>
          <p>
            We value your trust and strive to maintain transparent practices regarding your personal
            information. Please read this Privacy Policy carefully to understand our practices
            concerning your data. By accessing or using our services, you acknowledge that you
            have read and understood this Privacy Policy.
          </p>

        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold ">Information We Collect</h2>
          <div>
            <h3 className="text-2xl font-bold">Personal Information</h3>
            <p>
              Personal Information refers to data that can be used to identify you individually. This
              may include your name, email address, postal address, and phone number. We also
              collect account credentials, such as usernames and passwords.We may also collect billing information when you purchase paid features or subscriptions.
              However, billing data (e.g., credit card numbers) is processed on our behalf by a third-party
              payment processor. That processor is prohibited from storing, retaining, or using your billing
              information for any purpose other than processing payments for Social Mint.
            </p>
          </div>
          <ul className="list-disc list-inside ml-6 space-y-2">
            <li><strong>Content Inputs:</strong> Any instructions, captions, or prompts you submit for AI-based image generation and post creation.</li>
            <li><strong>Scheduling Data:</strong> Information related to your selected posting times and dates.</li>
          </ul>
          <div>
            <h3 className="text-2xl font-bold">Technical Data</h3>
            <p>Technical Data refers to information about your device and internet connection. This
              includes your IP address and geographical location derived from it, device information
              such as device type, operating system, and browser type. We also collect hardware
              specifications relevant to our services, network information and connection quality
              data, as well as system logs and activity data related to service usage.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Usage Data</h3>
            <p>Usage Data refers to information about how you interact with our services. This includes
              pages visited on our website and time spent on each page, features and functions used
              within our software services, and interaction patterns and preferences. We also collect
              performance metrics, analytics data, and information about the frequency and duration
              of your service usage.</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold ">How We Use Your Data</h2>
          <div>
            <h3 className="text-2xl font-bold">Providing and Improving Our Services</h3>
            <p>
              We use your data to deliver the services you request, maintain your account, and enhance your experience.
              This includes setting up and maintaining your account and delivering the specific functionality you request.
              We also personalize your experience based on your preferences, develop new features and services,
              conduct research and analysis to improve our offerings, and troubleshoot issues while optimizing performance.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Responding to Inquiries and Customer Support</h3>
            <p>
              We use your data to communicate with you and provide assistance when needed. This includes responding to
              your questions, comments, and support requests, as well as providing technical assistance and troubleshooting.
              We also send service-related announcements and updates, notify you about changes to our services or policies,
              and fulfill your requests for information or resources.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Analytics and Performance Tracking</h3>
            <p>
              We analyze usage patterns and performance metrics to better understand how our services are used.
              This includes monitoring service performance and reliability, analyzing user behavior to identify
              trends and patterns, and measuring the effectiveness of features and functions. We also generate internal
              reports on service usage, evaluate and improve the user experience, and detect and prevent technical issues.
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold">Marketing and Promotional Purposes</h3>
            <p>
              With your consent where required by law, we may use your data for marketing purposes. This includes sending
              newsletters, promotional materials, and other communications, as well as informing you about new features,
              updates, and offerings. We also deliver targeted content based on your interests and preferences,
              conduct surveys and collect feedback, and measure the effectiveness of our marketing campaigns.
            </p>
          </div>


        </div>
        <div className="flex flex-col gap-6">

          <div>
            <h2 className="text-3xl font-bold ">Data Sharing and Disclosure</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold ">Service Providers</h3>
            <p>
              We may share your information with third-party vendors, service providers, contractors,
              or agents who perform services for us or on our behalf. These entities are bound by
              contractual obligations to keep personal information confidential and use it only for the
              purposes for which we disclose it to them.
            </p>

          </div>

          <div>
            <h3 className="text-2xl font-bold ">Business Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, financing, or sale of all or a portion of our
              assets, your information may be transferred as part of that transaction. We will notify
              you of any such change in ownership or control of your personal information.
            </p>
          </div>



          <div>
            <h3 className="text-2xl font-bold ">Legal Requirements</h3>
            <p>
              We may disclose your information if required to do so by law or in response to valid
              requests by public authorities (e.g., a court or government agency).
            </p>

          </div>




          <div>

            <h3 className="text-2xl font-bold ">Protection of Rights</h3>
            <p>
              We may disclose your information to protect and defend the rights, property, or safety of
              Igent Holdings LLC, our customers, or others.
            </p>

          </div>




        </div>

        <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold ">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the
            security of your personal information. However, please be aware that no method of
            transmission over the Internet or method of electronic storage is 100% secure. While we
            strive to use commercially acceptable means to protect your personal information, we
            cannot guarantee its absolute security.
          </p>
          <p>
            Our security measures include encryption of sensitive data in transit and at rest, regular
            security assessments and penetration testing, and access controls and authentication
            requirements. We also conduct regular security training for our staff and maintain
            monitoring for suspicious activities and unauthorized access attempts.
          </p>
        </div>

        
        <div className="flex flex-col gap-6">

        <div>
        <h2 className="text-3xl font-bold ">Your Rights and Choices</h2>
          <p >
            Depending on your location, you may have certain rights regarding your personal information:
          </p>

        </div>


      <div>
      <h3 className="text-2xl font-bold ">Access and Correction</h3>
          <p >
            You may request access to your personal information that we hold and request that we correct any errors in your personal information.
          </p>

      </div>


       <div>
       <h3 className="text-2xl font-bold ">Deletion and Restriction</h3>
          <p >
            In certain circumstances, you may request that we delete your personal information or restrict how we process it.
          </p>

       </div>

       <div>
       <h3 className="text-2xl font-bold ">Data Portability</h3>
          <p >
            Where technically feasible, you may request a copy of your personal information in a structured, commonly used, and machine-readable format.
          </p>

       </div>

       <div>
       <h3 className="text-2xl font-bold ">Objection</h3>
          <p >
            You may object to our processing of your personal information in certain circumstances.
          </p>

       </div>

       <div>
       <h3 className="text-2xl font-bold ">Marketing Communications</h3>
          <p >
            You can opt out of receiving marketing communications from us by following the unsubscribe instructions included in our marketing emails or contacting us directly.
          </p>

          <p >
            To exercise any of these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.
          </p>

       </div>
         
        

        </div>
        <div className="flex flex-col gap-3">



          <h2 className="text-3xl font-bold">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our services and hold certain information.
            Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>
            We use these technologies for remembering your preferences and settings, understanding how you use our services,
            improving our services based on usage data, providing personalized content and recommendations,
            and measuring the effectiveness of our marketing campaigns.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our services.
          </p>

          

        </div>

        <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold">Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13, and we do not knowingly
            collect personal information from children under 13. If we learn we have collected or
            received personal information from a child under 13 without verification of parental
            consent, we will delete that information.
          </p>
        </div>

        <div className="flex flex-col gap-3">

          <h2 className="text-3xl font-bold">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at
            the top of this Privacy Policy. You are advised to review this Privacy Policy periodically
            for any changes.
          </p>

        </div>
        <div className="flex flex-col gap-3">

          <h2 className="text-3xl font-bold ">Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests related to your privacy or this policy, please contact us at <a href="mailto:contact@igentworks.com" className="underline text-blue-400">contact@igentworks.com</a>.
            We’re here to help and value your trust in Social Mint.
          </p>


        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold">Governing Law</h2>
          <p>
            This Privacy Policy shall be governed by and construed in accordance with the laws of
            US , without regard to its conflict of law provisions.
          </p>
        </div>
        <div className="flex flex-col gap-3">

          <h2 className="text-3xl font-bold">Consent</h2>
          <p>
            By using our services, you consent to our Privacy Policy and agree to its terms. If you do
            not agree with this policy, please do not use our services.
          </p>



        </div>
      </div>


      <Footer />
    </>
  )
}

export default Privacy
