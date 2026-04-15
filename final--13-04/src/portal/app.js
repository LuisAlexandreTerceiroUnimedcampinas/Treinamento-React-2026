import axios from 'axios'

/**
 * Versão "vanilla JS" do portal (sem React) para fins didáticos.
 * - Faz login via API fake
 * - Alterna telas manipulando o DOM (login vs. app)
 * - Busca e renderiza consultas como cards
 *
 * Observação: o app React principal fica em `src/App.jsx` e `src/main.jsx`.
 */
export function initPortal() {
  const API_URL = 'https://portal-unimed-fake-api.onrender.com'

  const loginPage = document.querySelector('#login-page')
  const appContainer = document.querySelector('#app-container')
  const loginForm = document.querySelector('#login-form')
  const carteirinhaInput = document.querySelector('#carteirinha')
  const senhaInput = document.querySelector('#senha')
  const carteirinhaError = document.querySelector('#carteirinha-error')
  const senhaError = document.querySelector('#senha-error')
  const loginError = document.querySelector('#login-error')

  const userName = document.querySelector('#user-name')
  const btnLogout = document.querySelector('#btn-logout')
  const consultasList = document.querySelector('#consultas-list')
  const consultasCount = document.querySelector('#consultas-count')

  if (
    !loginPage ||
    !appContainer ||
    !loginForm ||
    !carteirinhaInput ||
    !senhaInput ||
    !carteirinhaError ||
    !senhaError ||
    !loginError ||
    !userName ||
    !consultasList ||
    !consultasCount
  ) {
    return
  }

  function validateLogin() {
    // Validação simples de "campo obrigatório" com feedback na tela.
    let isValid = true

    carteirinhaError.textContent = ''
    senhaError.textContent = ''
    loginError.textContent = ''
    carteirinhaInput.classList.remove('input-error')
    senhaInput.classList.remove('input-error')

    if (!carteirinhaInput.value.trim()) {
      carteirinhaError.textContent = 'A carteirinha Ã© obrigatÃ³ria.'
      carteirinhaInput.classList.add('input-error')
      isValid = false
    }

    if (!senhaInput.value.trim()) {
      senhaError.textContent = 'A senha Ã© obrigatÃ³ria.'
      senhaInput.classList.add('input-error')
      isValid = false
    }

    return isValid
  }

  function formatDateTime(dateString) {
    // Formata data/hora no padrão pt-BR para exibir nos cards de consulta.
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function getStatusLabel(status) {
    // Mapeia status vindo da API para um rótulo amigável.
    const labels = {
      agendada: 'Agendada',
      realizada: 'Realizada',
      cancelada: 'Cancelada',
    }
    return labels[status] || status
  }

  async function authenticate(carteirinha, senha) {
    // Chama a rota de login. Retorna o paciente quando credenciais estiverem OK.
    try {
      const response = await axios.post(`${API_URL}/login`, { carteirinha, senha })
      return response.data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  function createConsultaCard(consulta) {
    // Cria um card (DOM) com os detalhes de uma consulta.
    const card = document.createElement('div')
    card.className = 'consulta-card'

    card.innerHTML = `
      <div class="consulta-card__header">
        <span class="consulta-card__especialidade">${consulta.especialidade}</span>
        <span class="status-badge status-badge--${consulta.status}">
          ${getStatusLabel(consulta.status)}
        </span>
      </div>
      <p class="consulta-card__medico">${consulta.medico}</p>
      <div class="consulta-card__details">
        <span>ðŸ“… ${formatDateTime(consulta.data)}</span>
        <span>ðŸ“ ${consulta.local}</span>
      </div>
    `

    return card
  }

  async function showApp(paciente) {
    // Alterna UI para o "modo logado" e busca as consultas do paciente.
    loginPage.style.display = 'none'
    appContainer.style.display = 'block'

    if (paciente?.nome) {
      userName.textContent = paciente.nome.split(' ')[0]
    }

    consultasList.innerHTML = ''

    try {
      const response = await axios.get(`${API_URL}/consultas`, {
        params: { pacienteId: paciente.id },
      })
      const consultas = response.data

      consultasCount.textContent = `${consultas.length} consulta(s) encontrada(s)`

      consultas.forEach(function (consulta) {
        const card = createConsultaCard(consulta)
        consultasList.appendChild(card)
      })
    } catch (err) {
      console.log(err)
    }
  }

  function handleLogout() {
    // Volta para a tela de login e limpa estado visual.
    appContainer.style.display = 'none'
    loginPage.style.display = 'flex'

    loginForm.reset()
    carteirinhaError.textContent = ''
    senhaError.textContent = ''
    loginError.textContent = ''

    consultasList.innerHTML = ''
    consultasCount.textContent = ''
  }

  const onSubmit = async function (event) {
    // Handler do submit: valida campos, chama API e mostra a tela principal.
    event.preventDefault()

    if (!validateLogin()) return

    const btnSubmit = loginForm.querySelector('[type="submit"]')
    btnSubmit.disabled = true
    btnSubmit.textContent = 'Entrando...'

    try {
      const paciente = await authenticate(carteirinhaInput.value.trim(), senhaInput.value)

      console.log('Paciente autenticado:', paciente)

      if (paciente) {
        await showApp(paciente)
      } else {
        loginError.textContent = 'Carteirinha ou senha incorretos.'
      }
    } catch (error) {
      loginError.textContent = 'Erro ao conectar com o servidor. Tente novamente.'
    } finally {
      btnSubmit.disabled = false
      btnSubmit.textContent = 'Entrar'
    }
  }

  loginForm.addEventListener('submit', onSubmit)
  btnLogout?.addEventListener('click', handleLogout)

  return function cleanup() {
    loginForm.removeEventListener('submit', onSubmit)
    btnLogout?.removeEventListener('click', handleLogout)
  }
}
