import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import LoginTip from "./LoginTip";

function LoginPage({ setPatient }) {
  return (
    <main className="login-page" id="login-page">
      <div className="login-card">
        <LoginHeader title="Portal do Paciente" brand="Unimed" icon="🩸" />
        <LoginForm setPatient={setPatient} />
        <LoginTip cardNumber="0089234000012" passwordExample={123456} />
      </div>
    </main>
  )
}

export default LoginPage;
