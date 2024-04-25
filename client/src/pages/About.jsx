import aboutAnimation from '../assets/about.svg';
import SocialButton from '../components/SocialButton';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

const socialButtons = [
  {
    icon: faEnvelope,
    url: 'mailto:suman7802@gmail.com',
  },
  {
    icon: faLinkedinIn,
    url: 'https://www.linkedin.com/in/suman7802/2',
  },
  {
    icon: faGithub,
    url: 'https://github.com/suman7802',
  },
  {
    icon: faFacebookF,
    url: 'https://www.facebook.com/suman7802',
  },
  {
    icon: faInstagram,
    url: 'https://www.instagram.com/suman_sharma7802',
  },
];

export default function About() {
  return (
    <div className="p-5 flex flex-col gap-8 min-h-[90vh] items-center justify-center py-5">
      <img src={aboutAnimation} alt="contact" className="lg:w-[50%]" />
      <div className="aboutMe text-2xl flex flex-col px-5 md:w-[50%] items-center text-center">
        <span>
          Hi, I am&nbsp;
          <span className="font-semibold">Suman Sharma</span>.
        </span>
        <span>
          I am a
          <span className="font-semibold text-red-500">
            &nbsp;web developer&nbsp;
          </span>
          &
          <span className="font-semibold text-red-500">
            &nbsp;CS student&nbsp;
          </span>
        </span>
        <span>
          at&nbsp;
          <span className="font-semibold">Patan Multiple Campus.</span>
        </span>
        <div className="social mt-4 flex flex-row gap-3">
          {(socialButtons || []).map((button, index) => (
            <SocialButton key={index} icon={button.icon} url={button.url} />
          ))}
        </div>
      </div>
    </div>
  );
}
