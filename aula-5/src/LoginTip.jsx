function LoginTip({ cardNumber, passwordExample }) {
  return (
    <p className="login-hint">
      Carteirinha: <strong>{cardNumber}</strong> | Senha:
      <strong>{passwordExample}</strong>
    </p>
  )
}

export default LoginTip;
