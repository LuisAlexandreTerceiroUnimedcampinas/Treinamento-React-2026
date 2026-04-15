import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from './modules/auth/LoginPage'
import MainLayout from './components/MainLayout'
import DashboardPage from './modules/dashboard/DashboardPage'
import ConsultasPage from './modules/consultas/ConsultasPage'
import ExamesPage from './modules/exames/ExamesPage'
import AgendamentoPage from './modules/agendamento/AgendamentoPage'

import { PacienteProvider, usePaciente } from './contexts/PacienteContext'

/**
 * Rotas do aplicativo.
 * A autenticação é baseada em `dadosPaciente.paciente` (contexto).
 * - Sem paciente: só permite `/login` e redireciona o resto para login
 * - Com paciente: redireciona `/login` para o app e libera páginas internas
 */
function AppRoutes() {
  const { dadosPaciente } = usePaciente()
  const { paciente } = dadosPaciente

  const loginPageData = {
    header: {
      icon: '🏥',
      title: 'Portal do Paciente',
      subtitle: 'Unimed',
    },
    form: {
      carteirinhaLabel: 'Carteirinha',
      senhaLabel: 'Senha',
      submitText: 'Entrar',
    },
    hint: {
      carteirinha: '0089234000012',
      senha: '123456',
    },
  }

  return (
      <Routes>
      {/* Rota pública: se já estiver logado, redireciona para a home */}
      <Route path="/login" element={!paciente ? <LoginPage data={loginPageData} /> : <Navigate to="/" replace />} />

      {/* Home "inteligente": manda para dashboard se logado, senão para login */}
      <Route path="/" element={<Navigate to={paciente ? '/dashboard' : '/login'} replace />} />

      {/* Rotas protegidas: renderiza o layout apenas quando existir paciente */}
      <Route element={paciente ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
        <Route path="/exames" element={<ExamesPage />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />
      </Route>

      {/* Qualquer rota desconhecida volta para `/` */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  // Providers globais do app:
  // - `PacienteProvider`: estado e ações de autenticação/dados do paciente
  // - `BrowserRouter`: navegação via URL (React Router)
  return (
    <PacienteProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PacienteProvider>
  )
}
