import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function MainLayout(props) {
  /**
   * Layout base das rotas protegidas.
   * - Navbar fixa no topo
   * - `<Outlet />` renderiza a página da rota filha (React Router)
   */
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

