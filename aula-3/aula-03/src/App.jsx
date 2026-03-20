import './App.css'

function App() {
  return (
    <>
      <section id="center">
        
  <main class="login-page" id="login-page">
    <div class="login-card">
      <header class="login-header">
        <span class="login-header__icon">🏥</span>
        <h1>Portal do Paciente</h1>
        <p>Unimed</p>
      </header>

      <form class="login-form" id="login-form">
        <div class="form-group">
          <label for="carteirinha">Carteirinha</label>
          <input type="text" id="carteirinha" placeholder="Digite sua carteirinha" />
          <span class="error-message" id="carteirinha-error"></span>
        </div>

        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" id="senha" placeholder="Digite sua senha" />
          <span class="error-message" id="senha-error"></span>
        </div>

        <div class="error-message" id="login-error"></div>

        <button type="submit" class="btn-primary">Entrar</button>
      </form>

      <p class="login-hint">
        Carteirinha: <strong>0089234000012</strong> | Senha:
        <strong>123456</strong>
      </p>
    </div>
  </main>		
		
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App