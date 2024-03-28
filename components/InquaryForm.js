import React, { useState } from 'react';
import axios from 'axios';
import { FiPhoneCall, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function InquaryForm({ refNumber }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    `Hi I found your property with ${
      refNumber ? 'Ref: ' + refNumber : ''
    } on House Point Egypt. Please Contact me, Thanks`
  );
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://house-point-api.onrender.com/contact/submit',
        {
          name,
          mobile: phone,
          email,
          message,
        }
      );

      setName('');
      setPhone('');
      setEmail('');
      setMessage('');

      setAlert({ type: 'success', message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error:', error);

      setAlert({ type: 'error', message: 'Failed to send the message.' });
    }
  };

  const handleAlertDismiss = () => {
    setAlert(null);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-3xl mx-auto p-32 bg-white rounded-md shadow-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-[#095668]'>
          Contact Form
        </h2>

        {alert && (
          <div
            className={`p-4 mb-6 ${
              alert.type === 'success' ? 'bg--[#095668]' : 'bg-red-200'
            } border border-gray-300 rounded`}
          >
            <p className='text-lg'>{alert.message}</p>
            <button
              className='text-sm text-gray-600 hover:text-gray-800 font-medium'
              onClick={handleAlertDismiss}
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-1'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='w-full p-2 border border-gray-300 rounded'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='phone'
              className='block text-gray-700 font-bold mb-1'
            >
              Phone
            </label>
            <input
              type='text'
              id='phone'
              className='w-full p-2 border border-gray-300 rounded'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-1'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full p-2 border border-gray-300 rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='message'
              className='block text-gray-700 font-bold mb-1'
            >
              Message
            </label>
            <textarea
              id='message'
              className='w-full p-2 border border-gray-300 rounded'
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full bg-[#095668] text-white px-4 py-2 rounded font-bold hover:bg-gray-600'
          >
            Send Message
          </button>

          <div className='flex justify-between items-center mt-6 space-x-4'>
            <a
              href='tel:+1234567890'
              className='text-gray-600 hover:text-gray-800'
              title='Call Us'
            >
              <FiPhoneCall className='w-6 h-6' />
              <span className='ml-2'>Call Us</span>
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=1234567890&text=${message}`}
              className='text-gray-600 hover:text-gray-800'
              target='_blank'
              title='WhatsApp'
            >
              <FaWhatsapp className='w-6 h-6' />
              <span className='ml-2'>WhatsApp</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
