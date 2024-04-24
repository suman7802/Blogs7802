import contactAnimation from '../assets/contact.svg';
import Form from '../components/Contact';

export default function Contact() {
  return (
    <div className="p-5 flex flex-col gap-5 lg:flex-row lg:h-[90vh] lg:items-center justify-around">
      <img src={contactAnimation} alt="contact" className="lg:w-[50%]" />
      <Form />
    </div>
  );
}
