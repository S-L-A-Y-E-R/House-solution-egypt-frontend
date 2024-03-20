import React, { useState } from "react";
import axios from "axios";
import { FiPhoneCall, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function InquaryForm({ refNumber }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `Hi I found your property with ${
      refNumber ? "Ref: " + refNumber : ""
    } on House Point Egypt. Please Contact me, Thanks`
  );
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://house-point-api.onrender.com/contact/submit",
        {
          name,
          mobile: phone,
          email,
          message,
        }
      );

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");

      setAlert({ type: "success", message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error:", error);

      setAlert({ type: "error", message: "Failed to send the message." });
    }
  };

  const handleAlertDismiss = () => {
    setAlert(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl mx-auto p-32 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#095668]">
          Contact Form
        </h2>

        {alert && (
          <div
            className={`p-4 mb-6 ${
              alert.type === "success" ? "bg--[#095668]" : "bg-red-200"
            } border border-gray-300 rounded`}
          >
            <p className="text-lg">{alert.message}</p>
            <button
              className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              onClick={handleAlertDismiss}
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-2 border border-gray-300 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#095668] text-white px-4 py-2 rounded font-bold hover:bg-gray-600"
          >
            Send Message
          </button>

          <div className="flex justify-between items-center mt-6 space-x-4">
            <a
              href="tel:+1234567890"
              className="text-gray-600 hover:text-gray-800"
            >
              <FiPhoneCall className="w-6 h-6" />
              <span className="ml-2">Call Us</span>
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=1234567890&text=${message}`}
              className="text-gray-600 hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-6 h-6" />
              <span className="ml-2">WhatsApp</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';

// const InquiryForm = () => {
//   const { t } = useTranslation();
//  // Define a function to handle the form submission

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = {
//       name,
//       email,
//       phone,
//       message,
//     };

//     try {
//       await axios.post('https://house-point-api.onrender.com/contact/submit', formData);

//       console.log('Form submitted successfully');
//       alert('Form submitted successfully');

//       setName('');
//       setEmail('');
//       setPhone('');
//       setMessage('');
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while submitting the form. Please try again later.');
//     }
//   };

//   return (
//     <div className="w-full sm:justify-center ml-12 max-w-sm">
//       <div className="border border-gray-400 rounded-md">
//         <div className="flex text-brand bg-[#095668] font-bold text-lg p-4">
//           <p>{t('Inquire Property')}</p>

//         </div>

//         <form className="mt-8" onSubmit={handleSubmit}>
//           <input
//             type="checkbox"
//             id=""
//             className="hidden"
//             name="botcheck"
//             style={{ display: 'none' }}
//           />
//           <div className="grid gap-8 md:grid-cols-2">
//             <input
//               type="text"
//               className="px-0 py-2 border  font-semibold border-gray-400 rounded focus:ring-0 focus:border-[#095668]"
//               placeholder={t('Name') + '*'}
//               name="name"
//               // value={name}
//               // onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//             <input
//               type="email"
//               placeholder={t('Email') + '*'}
//               className="px-0 border font-semibold border-gray-400 rounded focus:ring-0 focus:border-[#095668]"
//               name="email"
//               // value={email}
//               // onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               className="px-0 border  font-semibold border-gray-400 rounded focus:ring-0 focus:border-[#095668]"
//               placeholder={t('Phone') + '*'}
//               name="phone"
//               // value={mobile}
//               // onChange={(e) => setMobile(e.target.value)}
//               required
//             />
//             <textarea
//               className="h-40 px-0 border border-gray-400 rounded md:col-span-2 focus:ring-0 focus:border-[#095668]"
//               placeholder={t('Message') + '*'}
//               name="message"
//               spellCheck="false"
//               // value={message}
//               // onChange={(e) => setMessage(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className="flex items-center justify-center mt-8">
//             <button
//               type="submit"
//               className="py-3 font-medium text-white rounded-full mb-2 bg-[#095668] px-7 w-44"
//               // onClick={handleSubmit}
//             >
//               {t('Send Message')}
//             </button>
//           </div>
//           <div className='flex justify-between'>
//             <button className='ml-4 py-3 font-medium flex  text-white rounded-sm mb-2 bg-[#095668] px-7 w-40'>

//             <svg xmlns="http://www.w3.org/2000/svg" height="1em" className='mb-2'  viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>

//              <span className='ml-2'>Call Us</span>
//             </button>
//             <button className='mr-4 py-3 flex font-medium text-white rounded-sm mb-2 bg-[#095668] px-7 w-40' >
//             <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>

//               <span className='ml-2'>whatsapp</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InquiryForm;
