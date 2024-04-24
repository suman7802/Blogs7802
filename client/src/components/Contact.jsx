import emailjs from 'emailjs-com';
import {useRef, useState} from 'react';

export default function Form() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({name: '', email: '', message: ''});

  const handleChange = ({target: {name, value}}) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'suman',
          from_email: form.email,
          to_email: 'mansu7802@gmail.com',
          reply_to: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert('Message sent');
          setTimeout(() => {
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          alert('Message not sent');
          console.error(error);
        }
      );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 lg:w-[35%]`}>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        required
        value={form.name}
        onChange={handleChange}
        className={`px-5 py-2 outline-none border border-red-500 rounded-xl`}
      />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={handleChange}
        className={`px-5 py-2  border border-red-500 rounded-xl outline-none`}
      />

      <textarea
        id="message"
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        className={`px-5 py-2 md:h-32 border border-red-500 rounded-xl outline-none`}
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 bg-red-500 rounded-xl text-white hover:bg-red-600`}>
        {loading ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
