import './App.css'
import LoginHeader from './components/LoginHeader'
import LoginForm from './components/LoginForm'
import LoginHint from './components/LoginHint'

function App() {
  return (
    <main className="login-page" id="login-page">
      <div className="login-card">
        <LoginHeader />
        <LoginForm />
        <LoginHint />
      </div>
    </main>
  )
}

export default App