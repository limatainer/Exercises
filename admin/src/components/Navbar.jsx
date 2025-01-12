import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../contexts/AuthContext';
import Logo from '/logo.png';
export default function Navbar() {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink className="text-white text-2xl font-bold flex" to="/">
          <img className="w-16 h-16 mr-2" src={Logo} alt="logo" />
          CadastRAR
        </NavLink>
        <ul className="flex space-x-4" role="menu">
          {!user ? (
            <>
              <li role="none">
                <NavLink to="/login" className="btn" role="menuitem">
                  Login
                </NavLink>
              </li>
              <li role="none">
                <NavLink to="/register" className="btn" role="menuitem">
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li role="none">
                <NavLink to="/submissions" className="btn" role="menuitem">
                  Submissions
                </NavLink>
              </li>
              <li role="none">
                <NavLink to="/posts/create" className="btn" role="menuitem">
                  Register
                </NavLink>
              </li>
              <li role="none">
                <button onClick={logout} className="btn" role="menuitem">
                  Sair
                </button>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about" className="btn" role="menuitem">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
