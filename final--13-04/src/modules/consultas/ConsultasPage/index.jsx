import React, { useState } from 'react'
import ConsultasTable from './ConsultasTable'

import { usePaciente } from '../../../contexts/PacienteContext'

export default function ConsultasPage() {
  /**
   * Lista de consultas do paciente.
   * - Lê `consultas` do contexto
   * - Permite atualizar chamando `atualizarConsultas()` na API
   */
  const { dadosPaciente, atualizarConsultas } = usePaciente()
  const { consultas } = dadosPaciente
  const [carregando, setCarregando] = useState(false)

  const handleAtualizar = async () => {
    setCarregando(true)
    await atualizarConsultas()
    setCarregando(false)
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Consultas</h2>
        <button className="btn-primary" type="button" onClick={handleAtualizar} disabled={carregando}>
          {carregando ? 'Atualizando...' : 'Atualizar dados'}
        </button>
      </div>
      {consultas && consultas.length > 0 ? (
        <ConsultasTable consultas={consultas} />
      ) : (
        <p className="muted">Não há consultas disponíveis.</p>
      )}
    </div>
  )
}
