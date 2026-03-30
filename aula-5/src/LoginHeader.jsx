function LoginHeader({ title, brand, icon }) {
  return (
    <header className="login-header">
      <span className="login-header__icon">{icon}</span>
      <h1>{title}</h1>
      <p>{brand}</p>
    </header>
  )
}

export default LoginHeader;