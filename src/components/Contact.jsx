import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://about-me-update-1.onrender.com/send-email', formData);
      console.log('Email sent successfully:', response.data);
      // Optionally handle success response here
    } catch (error) {
      console.error('Failed to send email:', error);
      // Optionally handle error response here
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='w-full h-fit min-h-[70vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit} className="flex flex-col w-2/4 gap-5 justify-center items-center">
        <div className="formin w-full flex gap-3 flex-col">
          <fieldset className="border-2 border-white rounded-lg p-4">
            <legend className="text-xl">Enter your name</legend>
            <div className="text-xl">
              <input
                type="text"
                className="h-16 text-xl bg-transparent w-full rounded-lg border-2 border-white outline-none px-4"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="border-2 border-white rounded-lg p-4">
            <legend className="text-xl">Enter your email</legend>
            <input
              type="email"
              className="h-fit  bg-red-600  text-xl bg-transparent w-full  rounded-lg border-white outline-none border-2"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="border-2 border-white rounded-lg p-4">
            <legend className="text-xl">Enter your mobile number</legend>
            <input
              type="number"
              className="h-fit  text-xl bg-red-600  bg-transparent w-full  rounded-lg border-white outline-none border-2"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </fieldset>
          <p className="text-xl">Enter a message (if any)</p>
          <textarea
            className="h-[20vh] text-xl bg-transparent w-full  rounded-lg border-white outline-none border-2"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <input
          type="submit"
          className="h-fit w-full   text-xl bg-white rounded-full border-none px-8 text-black"
          value="Contact"
        />
      </form>
    </div>
  );
};

export default Contact;
