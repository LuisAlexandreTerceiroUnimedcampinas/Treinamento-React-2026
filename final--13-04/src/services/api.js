import axios from 'axios'

/**
 * Cliente HTTP (Axios) centralizado.
 * - Usa `VITE_API_URL` quando definido (ex.: `.env`)
 * - Caso contrário, aponta para a fake API usada no treinamento
 *
 * Os helpers abaixo retornam `response.data` para simplificar os módulos.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://portal-unimed-fake-api.onrender.com',
})

export async function get(endpoint) {
  const response = await api.get(endpoint)
  return response.data
}

export async function post(endpoint, data) {
  const response = await api.post(endpoint, data)
  return response.data
}

export async function patch(endpoint, data) {
  const response = await api.patch(endpoint, data)
  return response.data
}

