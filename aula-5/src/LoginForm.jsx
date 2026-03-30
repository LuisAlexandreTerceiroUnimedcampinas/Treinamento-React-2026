import { useState } from "react";
import axios from "axios";

import InputField from "./InputField";

function LoginForm({ setPatient }) {
  const [cardNumber, setCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const apiUrl = "https://portal-unimed-fake-api.onrender.com";

  console.log("Carteirinha:", cardNumber);
  console.log("Senha:", password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, { carteirinha: cardNumber, senha: password })
      console.log("Login successful:", response.data);
      setPatient(response.data);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Falha no login. Verifique suas credenciais e tente novamente.");
    }
  };

  return (

    <form onSubmit={handleSubmit} className="login-form" id="login-form">
      <InputField
        id="carteirinha"
        type="text"
        placeholder="Digite sua carteirinha"
        label="Carteirinha"
        value={cardNumber}
        onChange={(event) => setCardNumber(event.target.value)}
      />

      <InputField
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        label="Senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {loginError && <div className="error-message" id="login-error">{loginError}</div>}

      <button type="submit" className="btn-primary">Entrar</button>
    </form>
  )
}

export default LoginForm;
