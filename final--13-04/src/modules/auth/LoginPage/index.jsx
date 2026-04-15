import React from 'react'
import './style.css'

import LoginHeader from './Header'
import LoginForm from './Form'
import LoginHint from './Hint'

export default function LoginPage(props) {
  const { data: pageData } = props
  const { header, form, hint } = pageData

  return (
    <main className="login-page">
      <div className="login-card">
        <LoginHeader icon={header.icon} title={header.title} subtitle={header.subtitle} />
        <LoginForm carteirinhaLabel={form.carteirinhaLabel} senhaLabel={form.senhaLabel} submitText={form.submitText} />
        <LoginHint carteirinha={hint.carteirinha} senha={hint.senha} />
      </div>
    </main>
  )
}

