import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

function LoginForm() {
  const [carteirinha, setCarteirinha] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://portal-unimed-fake-api.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login`, {
        carteirinha,
        senha,
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
      setError("Falha no login. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" id="login-form">
      <InputField
        id="carteirinha"
        type="text"
        placeholder="Digite sua carteirinha"
        label="Carteirinha"
        value={carteirinha}
        onChange={(e) => {
          setCarteirinha(e.target.value);
          setError("");
        }}
      />

      <InputField
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        label="Senha"
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
          setError("");
        }}
      />

      {error && (
        <div className="error-message" id="login-error">
          {error}
        </div>
      )}

      <button type="submit" className="btn-primary">
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;