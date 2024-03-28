import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

function Login() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_BASE_URL + '/user/login', {
        email,
        password,
      });

      // Handle the successful login response here
      localStorage.setItem('user', response.data.user.firstName);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('token', response.data.token);
      // Route to the home page after success
      router.push('/');
    } catch (err) {
      setAlertMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <div className='grid h-screen w-screen place-items-center bg-[#095668] px-4 text-sm font-medium'>
        <div className='w-full max-w-sm bg-white rounded-lg shadow'>
          <div className='mt-4'>
            <Link href='/' title='House Point Egypt Home Page'>
              <span>
                <img
                  src='/images/HPlogo.png'
                  alt='Logo'
                  className='px-10 flex justify-center mt-2 cursor-pointer'
                  title='House Point Egypt Logo'
                />
              </span>
            </Link>
          </div>

          <form className='p-4 md:p-5 lg:p-6' onSubmit={handleSubmit}>
            <div className='grid gap-y-3'>
              <input
                className='px-4 py-3 transition border rounded-md outline-none focus:border-purple-400 border-slate-600 text-slate-600 placeholder:text-slate-400'
                placeholder={t('email@example.com')}
                value={email}
                onChange={handleEmailChange}
              />
              <div className='relative'>
                <input
                  className='px-4 py-3 transition border rounded-md outline-none focus:border-purple-400 border-slate-600 text-slate-600 placeholder:text-slate-400'
                  placeholder={t('Password')}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  className='absolute transform -translate-y-1/2 top-1/2 right-3 text-slate-600'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <button className='flex items-center justify-center px-4 py-3 text-white transition border rounded-md gap-x-2 from-custom-blue to-custom-blue-gradient-light border-slate-600 bg-gradient-to-r'>
                <svg
                  style={{ color: 'rgb(203, 213, 225)' }}
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='bi bi-envelope'
                  viewBox='0 0 16 16'
                >
                  {/* Email icon path */}
                </svg>
                {isArabic ? t('Sign in with Email') : 'Sign in with Email'}
              </button>
              <div className='flex items-center px-3 my-3'>
                <hr className='w-full border-slate-600' />
                <span className='mx-3 text-slate-500'>
                  {isArabic ? t('or') : 'or'}
                </span>
                <hr className='w-full border-slate-600' />
              </div>
              <Link
                href='/signup'
                className='py-2 text-center text-white rounded bg-custom-blue'
                rel='noopener noreferrer'
                title='Sign Up'
              >
                Sign Up
              </Link>
            </div>

            {alertMessage && (
              <div
                className={`${
                  alertMessage.includes('success')
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                } p-2 rounded mt-3`}
              >
                {alertMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React from 'react';
// import Link from 'next/link';
// import { useTranslation } from 'react-i18next';

// function Login() {
//   const { t, i18n } = useTranslation();
//   const isArabic = i18n.language === 'ar';

//   return (
//     <div>
//       <div className="grid h-screen w-screen place-items-center bg-[#095668] px-4 text-sm font-medium">
//         <div className="w-full max-w-sm bg-white rounded-lg shadow">
//           <div className="mt-4">
//             <Link href="/">
//               <span>
//                 <img
//                   src="/images/logo_200_85.png"
//                   alt="Logo"
//                   className="flex justify-center mt-2 ml-16 cursor-pointer"
//                 />
//               </span>
//             </Link>
//           </div>

//           <form className="p-4 md:p-5 lg:p-6">
//             <div className="grid gap-y-3">
//               <button className="flex items-center justify-center px-4 py-3 transition border rounded-md gap-x-2 border-slate-600 bg-gradient-to-r text-slate-600 hover:text-purple-400">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   className="w-5 h-5"
//   fill="currentColor"
//   viewBox="0 0 24 24"
// >
//   <path
//     d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
//   />
// </svg>

//                 {isArabic
//                   ? t('Sign in with Facebook')
//                   : 'Sign in with Facebook'}
//               </button>

//               <button className="flex items-center justify-center px-4 py-3 transition border rounded-md gap-x-2 border-slate-600 bg-gradient-to-r text-slate-600 hover:text-purple-400">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   fill="currentColor"
//                   className="bi bi-google"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
//                   fill="text-slate-600"
//                 ></path>
//               </svg>
//               {isArabic ? t('Sign in with Google') : 'Sign in with Google'}
//             </button>
//           </div>

//           <div className="flex items-center px-3 my-3">
//             <hr className="w-full border-slate-600" />
//             <span className="mx-3 text-slate-500">{isArabic ? t('or') : 'or'}</span>
//             <hr className="w-full border-slate-600" />
//           </div>

//           <div className="grid gap-y-3">
//             <input
//               className="px-4 py-3 transition border rounded-md outline-none focus:border-purple-400 border-slate-600 text-slate-600 placeholder:text-slate-400"
//               placeholder={t('email@example.com')}
//             />
//             <button className="flex items-center justify-center px-4 py-3 transition border rounded-md gap-x-2 from-custom-blue to-custom-blue-gradient-light border-slate-600 bg-gradient-to-r text-slate-300 hover:text-purple-400">
//               <svg
//                 style={{ color: 'rgb(203, 213, 225)' }}
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="currentColor"
//                 className="bi bi-envelope"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
//                   fill="#cbd5e1"
//                 ></path>
//               </svg>
//               {isArabic ? t('Sign in with Email') : 'Sign in with Email'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Login;
