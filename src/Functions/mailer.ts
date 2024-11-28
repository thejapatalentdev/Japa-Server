var sendpulse = require("sendpulse-api");

import config from "../Config/config";

var TOKEN_STORAGE = "/tmp/";

export const welcome_email = async (email: String, name: String) => {
  try {
    await sendpulse.init(config.user_id, config.api_secret, TOKEN_STORAGE);
    // console.log(config.user_id, config.api_secret);

    const mailData = {
      html: `
   <p>Dear ${name},</p>

   <p>A warm welcome to <strong>JapaTalent</strong>!</p>

   <p>
     We're thrilled to have you on board! By joining our community, you've taken
     the first step towards unlocking your full potential and connecting with
     exciting opportunities.
   </p>

   <p>     At <strong>JapaTalent</strong>, we're passionate about empowering
    individuals like you to achieve your goals. Our platform offers a range of
     resources and tools to help you grow professionally and personally.
   </p>
   <p>Here's a quick overview of what you can expect from us:</p>

   <ul>
     <li>
       <em>Access to Job Listings and Career Opportunities</em>: Discover roles
       that fit your skills and career aspirations.
     </li>
     <li>
       <em>Personalized Mentorship and Guidance</em>: Get tailored advice and
       support to navigate your career path.
     </li>
     <li>
       <em>Training and Development Resources</em>: Enhance your skills with
       our comprehensive training materials.
     </li>
     <li>
       <em>Networking Opportunities</em>: Connect with like-minded individuals
       and industry experts.
     </li>
     <li>
       <em>Exclusive Updates and Insights</em>: Stay informed with the latest
       trends and tips from industry leaders.
     </li>
   </ul>

   <p>To get started, we recommend:</p>

   <ol>
     <li>
       <em>Completing Your Profile</em>: Showcase your skills and experience to
       attract relevant opportunities.
     </li>
     <li>
       <em>Exploring Our Job Listings</em>: Apply to jobs that align with your
       career goals.
     </li>
     <li>
       <em>Connecting with Our Community</em>: Engage with fellow members
       through our forums and social media channels.
     </li>
   </ol>

   <p>
     If you have any questions or need support, our dedicated team is here to
     help. Simply reply to this email or reach out to us at
     <a href="mailto:support@japatalent.com">hello@japatalent.com</a>.   </p>

   <p>Thank you for choosing JapaTalent! We're excited to be part of your journey.</p>

   <p>Best regards,</p>

   <p><strong>The JapaTalent Team</strong></p>
`,
      // text: `Welcome, ${name}!`,
      subject: "A warm welcome to JapaTalent!",
      from: {
        name: "japa Talent",
        email: "hello@japatalent.com",
      },
      to: [
        {
          name,
          email,
        },
      ],
    
    };
    //@ts-ignore
    sendpulse.smtpSendMail((data) => console.log(data), mailData);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const reset_otp = async (email: String, code: String) => {
  try {
    await sendpulse.init(config.user_id, config.api_secret, TOKEN_STORAGE);
  

    const mailData = {
      html: `
   <p>Hi ${name},</p>

   <p>Someone just tried to reset your password.</p>

   <p>
   if that was you please use ${code}
   </p>

   <p>
   If it was not you, kindly report to the admin
   </p>

`,
      // text: `Welcome, ${name}!`,
      subject: "Password Reset",
      from: {
        name: "japa Talent",
        email: "hello@japatalent.com",
      },
      to: [
        {
          name,
          email,
        },
      ],
      // bcc: [
      //   {
      //     name: "Your BCC Name",
      //     email: "your-bcc-email@example.com",
      //   },
      // ],
    };
    //@ts-ignore
    sendpulse.smtpSendMail((data) => console.log(data), mailData);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
