import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm('service_zre18al', 'template_ova3yvn', form.current, '9kifQ3-MHlv7gLj9c') // Use your actual public key here
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setSuccessMessage('Your registration request has been sent successfully!');
          setErrorMessage('');
        },
        (error) => {
          console.log('FAILED...', error.text);
          setSuccessMessage('');
          setErrorMessage('Failed to send request. Please try again later.');
        }
      )
      .finally(() => {
        setIsSending(false);
        form.current.reset(); // Clear form after submission
      });
  };

  return (
    <div className="p-6 bg-zinc-950  rounded-lg">
      <h2 className="text-xl mb-4">Register</h2>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="user_name" // Ensure this matches your EmailJS template
            className="p-2 w-full border border-gray-300 rounded-md bg-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Organization</label>
          <input
            type="text"
            name="organization" // Ensure this matches your EmailJS template
            className="p-2 w-full border border-gray-300 rounded-md bg-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">LeetCode URL</label>
          <input
            type="url"
            name="leetcode_url" // Ensure this matches your EmailJS template
            className="p-2 w-full border border-gray-300 rounded-md bg-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Codeforces URL</label>
          <input
            type="url"
            name="codeforces_url" // Ensure this matches your EmailJS template
            className="p-2 w-full border border-gray-300 rounded-md bg-zinc-700" 
            required
          />
        </div>
        <div>
          <label className="block mb-1">CodeChef URL</label>
          <input
            type="url"
            name="codechef_url" // Ensure this matches your EmailJS template
            className="p-2 w-full border border-gray-300 rounded-md bg-zinc-700"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSending}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};
