import {Link} from 'react-router-dom';

export default function PopUpNav() {
  return (
    <div className="popup-nav z-10 absolute inset-x-0 flex flex-col gap-5 py-5 justify-center items-center bg-red-500 rounded-b-xl lg:hidden">
      <Link to="/blogs" className="text-white cursor-pointer">
        Blogs
      </Link>
      <Link to="/about" className="text-white cursor-pointer">
        About Me
      </Link>
      <Link to="/contact" className="text-white cursor-pointer">
        Contact
      </Link>
      <Link to="/auth" className="text-white cursor-pointer">
        sign in
      </Link>
    </div>
  );
}
