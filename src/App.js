import { useState } from 'react'
import './App.css'
import { Page } from './components/page'
import { getInfo } from './services/dataGet'

function App() {
  const [url, setUrl] = useState('')
  const [page, setPage] = useState()

  function handleInput(event) {
    setUrl(event.target.value)
  }

  const getUrlInfo = async () => {
    try {      
        const data = await getInfo(url)
        if(data.url){       
          const file = data.url.split('/')
          file[0] = '/produccion'
          const name_file = file[file.length - 1]
          file.pop()
          setPage({
            external_url: file.join('/'),
            ftp_folder: name_file.split('?')[0],
            id_static: null,
          })
        }else {
          const file = data.externalDataUrl.split('/')
          file[0] = '/produccion'
          const name_file = file[file.length - 1]
          file.pop()
          setPage({
            external_url: file.join('/'),
            ftp_folder: name_file,
            id_static: data.id,
          })
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
      <div className="row" style={{ padding: '0 180px' }}>
        <div className="column col-md-6">
          <input type="text" onChange={handleInput} />
          <button className="outline" onClick={getUrlInfo}>
            cargar url
          </button>
          <hr />
          <div className="column">
            {page ? (
              <Page
                external_url={page.external_url}
                ftp_folder={page.ftp_folder}
              />
            ) : null}
            <br />
            {page ? <b>ID static page: {page.id_static ? page.id_static : 'Does not include'}</b> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
