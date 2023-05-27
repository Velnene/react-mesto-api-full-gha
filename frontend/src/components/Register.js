import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  function handlesetEmail(e) {
    setEmail(e.target.value);
  }
  function handlesetPassword(e) {
    setPassword(e.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    props.onRegister(email, password)
  }

  return (
    <div className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form onSubmit={handleRegister}>
        <input value={email} onChange={handlesetEmail} name='email' placeholder='Email' className="authorization__name" required type="email" />
        <input value={password} onChange={handlesetPassword} name='password' placeholder='Пароль' className="authorization__password" required type="password" />
        <button className="authorization__button">Регистрация</button>
        <Link className="authorization__link" to='/signin'>Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}
export default Register;