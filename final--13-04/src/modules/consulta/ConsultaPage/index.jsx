import React from 'react'
import './style.css'

import ConsultaHeader from './Header'
import ConsultaContent from './Content'

export default function ConsultaPage(props) {
  const { data: pageData } = props
  const { header, content } = pageData

  return (
    <div className="consulta-page">
      <ConsultaHeader icon={header.icon} title={header.title} userName={header.userName} logoutText={header.logoutText} />
      <ConsultaContent title={content.title} countId={content.countId} listId={content.listId} placeholder={content.placeholder} />
    </div>
  )
}

