import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';

export default function PopUpNav() {
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get('blog7802');

  const handleLogout = () => {
    document.cookie =
      'blog7802=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/';
    navigate('/auth');
    toast.success('Logout success');
  };

  return (
    <div className="popup-nav z-10 absolute inset-x-0 flex flex-col gap-5 py-5 justify-center items-center bg-red-500 rounded-b-xl lg:hidden">
      <Link to="/blogs" className="text-white cursor-pointer">
        Blogs
      </Link>
      <Link to="/user" className="text-white cursor-pointer">
        Manage
      </Link>
      <Link to="/about" className="text-white cursor-pointer">
        About Me
      </Link>
      <Link to="/contact" className="text-white cursor-pointer">
        Contact
      </Link>

      {!isLoggedIn ? (
        <Link to="/auth" className="text-white cursor-pointer">
          sign in
        </Link>
      ) : (
        <button onClick={handleLogout} className="text-white cursor-pointer">
          &nbsp;Sign Out
        </button>
      )}
    </div>
  );
}
