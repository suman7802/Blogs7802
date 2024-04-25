import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import PopUpNav from './PopUpNav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBars,
  faPlus,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get('blog7802');

  const togglePopUpNav = (event) => {
    event.stopPropagation();
    setShow((show) => !show);
  };

  useEffect(() => {
    const hidePopUpNav = () => {
      setShow(false);
    };
    if (show) document.addEventListener('click', hidePopUpNav);
    return () => document.removeEventListener('click', hidePopUpNav);
  }, [show]);

  const handleLogout = () => {
    document.cookie =
      'blog7802=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/';
    navigate('/auth');
    toast.success('Logout success');
  };

  return (
    <>
      <nav className="flex flex-row items-center justify-between p-5">
        <Link
          to="/"
          className="font-bold text-[4vh] cursor-pointer text-red-500">
          Blogs7802
        </Link>

        <div className="hidden lg:flex flex-row gap-9 items-center justify-between">
          <Link to="/" className="text-black">
            Home
          </Link>
          <Link to="/user" className="text-black">
            Manage
          </Link>
          <Link to="/about" className="text-black cursor-pointer">
            About Me
          </Link>
          <Link to="/contact" className="text-black cursor-pointer">
            Contact
          </Link>
        </div>

        <div className="burger flex flex-row gap-4 items-center justify-between">
          <FontAwesomeIcon
            icon={faBars}
            className="h-6 lg:hidden"
            onClick={togglePopUpNav}
          />

          {!isLoggedIn ? (
            <Link
              to="/auth"
              className="user hidden lg:flex flex-row items-center justify-between gap-3 text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="" />
              &nbsp;Sign in
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="user hidden lg:flex flex-row items-center justify-between gap-3 text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="" />
              &nbsp;Sign Out
            </button>
          )}

          <Link
            to="/add"
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-4 rounded-[5vh] cursor-pointer">
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Post Blog
          </Link>
        </div>
      </nav>
      {show && <PopUpNav />}
    </>
  );
}
