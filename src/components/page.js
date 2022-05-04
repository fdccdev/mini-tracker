import React from 'react'

export const Page = ({ external_url, ftp_folder }) => {
  const copyClipboard = () => {
    navigator.clipboard.writeText(external_url.slice(0, 46))
  }
  return (
    <div>
      <p>Ruta ftp: </p>
      <pre>{external_url}</pre>
      <p>Nombre archivo:</p>
      <pre>{ftp_folder}</pre>
      <button onClick={copyClipboard}>Copy</button>
    </div>
  )
}
