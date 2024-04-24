import NavBar from './components/NavBar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Auth from './pages/Auth';
import Authors from './pages/Authors';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './components/User';
import {UserProvider} from './context/User';

export default function App() {
  return (
    <div className="relative text-lg xl:text-xl 2xl:text-2xl">
      <BrowserRouter>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/*" index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/user/*" element={<User />} />
            <Route path="/author/:id/*" element={<Authors />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
