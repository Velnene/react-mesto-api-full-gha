import { useState } from "react";

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  function handlesetEmail(e){
    setEmail(e.target.value);
  }
  function handlesetPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(password, email)
  }

  return (
    <div className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={handlesetEmail} placeholder='Email' className="authorization__name" required type="email"/>
        <input value={password} onChange={handlesetPassword} placeholder='Пароль' className="authorization__password" required type="password" />
        <button className="authorization__button">Войти</button>
      </form>
    </div>
  )
}
export default Login;