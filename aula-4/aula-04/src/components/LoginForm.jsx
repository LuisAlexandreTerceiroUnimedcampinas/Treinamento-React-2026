import InputField from './InputField'
import Button from './Button'

function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault()
    alert('Login enviado com sucesso.')
  }

  return (
    <form className="login-form" id="login-form" onSubmit={handleSubmit}>
      <InputField
        label="Carteirinha"
        type="text"
        id="carteirinha"
        placeholder="Digite sua carteirinha"
      />

      <InputField
        label="Senha"
        type="password"
        id="senha"
        placeholder="Digite sua senha"
      />

      <div className="error-message" id="login-error"></div>

      <Button type="submit" variant="primary">
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm