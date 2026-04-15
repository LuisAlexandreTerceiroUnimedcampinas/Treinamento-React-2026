import React, { createContext, useCallback, useContext, useState } from 'react'

import { get, post } from '../services/api'

/**
 * Contexto responsável por:
 * - Autenticação (login/logout)
 * - Armazenar dados do paciente (perfil, exames e consultas)
 * - Expor funções para atualizar exames/consultas sob demanda
 */
const PacienteContext = createContext(null)
const dadosIniciaisPaciente = {
  paciente: null,
  exames: [],
  consultas: [],
}

export function PacienteProvider(props) {
  const { children } = props

  const [dadosPaciente, setDadosPaciente] = useState(dadosIniciaisPaciente)
  const [error, setError] = useState(null)

  // Faz login na API e, em seguida, carrega exames e consultas do paciente.
  const login = useCallback(async (carteirinha, senha) => {
    setError(null)
    try {
      const paciente = await post('/login', { carteirinha, senha })
      const [exames, consultas] = await Promise.all([
        get(`/exames?pacienteId=${paciente.id}`),
        get(`/consultas?pacienteId=${paciente.id}`),
      ])
      setDadosPaciente({ paciente, exames, consultas })
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais e tente novamente.')
    }
  }, [])

  // Limpa o estado e volta ao "não autenticado".
  const logout = useCallback(() => {
    setDadosPaciente(dadosIniciaisPaciente)
  }, [])

  // Recarrega exames do paciente autenticado.
  const atualizarExames = useCallback(async () => {
    if (!dadosPaciente.paciente?.id) return
    const exames = await get(`/exames?pacienteId=${dadosPaciente.paciente.id}`)
    setDadosPaciente((prev) => ({ ...prev, exames }))
  }, [dadosPaciente.paciente?.id])

  // Recarrega consultas do paciente autenticado.
  const atualizarConsultas = useCallback(async () => {
    if (!dadosPaciente.paciente?.id) return
    const consultas = await get(`/consultas?pacienteId=${dadosPaciente.paciente.id}`)
    setDadosPaciente((prev) => ({ ...prev, consultas }))
  }, [dadosPaciente.paciente?.id])

  return (
    <PacienteContext.Provider value={{ dadosPaciente, login, logout, error, atualizarExames, atualizarConsultas }}>
      {children}
    </PacienteContext.Provider>
  )
}

export function usePaciente() {
  // Hook seguro para consumir o contexto.
  const context = useContext(PacienteContext)
  if (!context) {
    throw new Error('usePaciente deve ser usado dentro de um PacienteProvider')
  }
  return context
}
