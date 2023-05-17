import logo from '../images/logo.svg'
import { Link, Route, Routes } from 'react-router-dom';


function Header({ email, onClick, route, title }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className='header__menu'>
        <p className='header__email'>{email}</p>
        <Link onClick={onClick} className='header__authorization' to={route}>{title}</Link>
      </div>
    </header>
  )
}
export default Header;