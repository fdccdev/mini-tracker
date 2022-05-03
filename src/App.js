import { useState } from 'react'
import './App.css'
import {getInfo} from './services/dataGet'

function App() {
  const [url, setUrl] = useState('')
  const [page, setPage] = useState()

  function handleInput(event) {
    setUrl(event.target.value)
  }

  const copyClipboard = () => {
    navigator.clipboard.writeText(page.external_url.slice(0, 46))
  }

  const is_not_in_index_of = -1

  const getUrlInfo = async () => {
    try {
      if (url.indexOf('staticPageId') !== is_not_in_index_of) {
        const data = await getInfo(url)
        const file = data.externalDataUrl.split('/')
        file[0] = '/produccion'
        const name_file = file[file.length - 1]
        file.pop()
        setPage({
          external_url:file.join('/'),
          ftp_folder: name_file,
          id_static: data.id,
        })
      } else {
        alert('La url no es valida!')
      }
      return {}
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>Mini-tracker</h1>
      <hr />
      <div className="row" style={{ padding: '20px' }}>
        <div className="column">
          <input type="text" onChange={handleInput} />
          <button className="outline" onClick={getUrlInfo}>
            cargar url
          </button>
          <hr />
          <div className="column">
            {page ? (
              <div>
                <p>Ruta ftp: </p>
                <pre>{page.external_url}</pre>
                <p>Nombre archivo:</p>
                <pre>{page.ftp_folder}</pre>
                <button onClick={copyClipboard}>Copy</button>
              </div>
            ) : null}
            <br />
            {page ? <b>ID static page: {page.id_static}</b> : null}
          </div>
        </div>
        <div className="column">
          <iframe
            className="iframe-info"
            width={'135%'}
            height={'600'}
            src={url}
            title="iframe-preview"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default App
