import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './App.css'
import axios from 'axios'

function App() {
  const [isModal1Open, setIsModal1Open] = useState(false)
  const [isModal2Open, setIsModal2Open] = useState(false)

  const [iptName, setIptName] = useState()
  const [iptDate, setIptDate] = useState('')
  const [inicialOption, setInicialOption] = useState()

  const [lista, setLista] = useState([])

  const dataHorario = `${iptDate}T${inicialOption}:00`

  function FormattedToday() {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  function HandleModal(idmodal, abrir_fechar) {
    if (idmodal === 1) {
      setIsModal1Open(abrir_fechar)
    } 
    else {
      if (abrir_fechar) {
        if(FormValidation(iptName, iptDate)) {
          axios.post('https://barbearia-backend-production-ab40.up.railway.app/agendamentos', {
            cliente: iptName,
            dataHorario: dataHorario
          })
          .then(() => {
            axios.get('https://barbearia-backend-production-ab40.up.railway.app/agendamentos')
              .then(response => setLista(response.data))
          })
          setIsModal2Open(true)
          setIsModal1Open(false)
          setIptDate('')
          setInicialOption('')
        } else {
          alert("Preencha corretamente os campos antes de confirmar!")
        }
      } else {
        setIsModal2Open(false) 
      }
    } 
  }

  function FormValidation(iptName, iptDate) {
    return /^[A-Za-z\s]+$/.test(iptName) && /[^ ]/.test(iptName) && (iptDate) && (inicialOption)
  }

  useEffect(() => {
    axios.get('https://barbearia-backend-production-ab40.up.railway.app/agendamentos')
      .then(response => {
        setLista(response.data)
      })
  }, [])

  function DisableOption(optionTime, selectedDate) {
    const now = new Date()
    const selected = new Date(`${selectedDate}T${optionTime}`)

    const isScheduled = lista.some(item => 
      item.data === selectedDate && item.horario.slice(0,5) === optionTime
    );

    return selected < now || isScheduled
  }

  return (
    <main>
      <section>
      <header>
           <nav class="menu"> {/* classe para estilizar as tags superiores */}
            <span class="spnmenu"><a href="#sobre">Sobre</a></span> 
            <span class="spnmenu"><a href="#servicos">Serviços</a></span>
          </nav>
      </header>

        <div id="inicial"> {/* ID para estilizar os parágrafos na página inicial */}
          <h1>SEU CORTE FALA POR VOCÊ ANTES MESMO DE VOCÊ DIZER UMA PALAVRA</h1>
          <h2>Horário de funcionamento: 08h às 19h</h2>
          <div>
             <input type="button" value="Agendar serviço" onClick={() => HandleModal(1, true)} />
          </div>
        </div>
        
           <div> {/*modal alterado: Adicionado ClassName, overlayClassName */}
            <Modal isOpen={isModal1Open} contentLabel="Agendar Serviço" className="modal-content" overlayClassName="modal-overlay">
              <button onClick={() => HandleModal(1, false)} className="button-fechar">X</button>
              <h2 id="agendar">Agendar Serviço</h2>
              <form>
                <div>
                  <div className="form-group">
                    <label>Nome:</label>
                    <input className="input-large" type="text" placeholder='Digite o seu nome' value={iptName} onChange={(e) => setIptName(e.target.value)}/>
                  </div>
                </div>
                <div>
                <div className="form-group">
                  <label>Data:</label>
                  <input className="input-large" type="date" min={FormattedToday()} placeholder="Selecione a data" value={iptDate} onChange={(e) => setIptDate(e.target.value)}/>
                </div>
                </div>
                <div>
                  <div className="form-group">
                    <label>Horário:</label>
                    <select className="input-large" value={inicialOption} onChange={(e) => setInicialOption(e.target.value)}>
                      <option>Selecione um horário</option>
                      <option disabled={DisableOption("08:00", iptDate)}>08:00</option>
                      <option disabled={DisableOption("09:00", iptDate)}>09:00</option>
                      <option disabled={DisableOption("10:00", iptDate)}>10:00</option>
                      <option disabled={DisableOption("11:00", iptDate)}>11:00</option>
                      <option disabled={DisableOption("12:00", iptDate)}>12:00</option>
                      <option disabled={DisableOption("15:00", iptDate)}>15:00</option>
                      <option disabled={DisableOption("16:00", iptDate)}>16:00</option>
                      <option disabled={DisableOption("17:00", iptDate)}>17:00</option>
                      <option disabled={DisableOption("18:00", iptDate)}>18:00</option>
                      <option disabled={DisableOption("19:00", iptDate)}>19:00</option>
                    </select>
                  </div>
                </div>
                <button className="button-confirm" type="button" onClick={() => HandleModal(2, true)}>Confirmar</button>
              </form>
            </Modal>
          </div>

          <Modal isOpen={isModal2Open} contentLabel="Agendamento realizado!" className="modal-realizado">
            <h2 id="fontmodreal">Agendamento realizado!</h2>
            <button type="button" onClick={() => HandleModal(2, false)}>Voltar</button>
          </Modal>
      </section>

      <section id="sobre">
          <div class="container-sobre">
            <h1 class="titsec">Sobre</h1>
            <p>No nosso estúdio, cada corte é mais do que estilo — é identidade. Trabalhamos para realçar a personalidade de cada cliente com técnica, atenção aos detalhes e um atendimento personalizado.</p><br></br>
            <p>Com profissionais experientes e um ambiente acolhedor, buscamos sempre superar expectativas e transformar sua visita em uma experiência única. Aqui, você não vem só cortar o cabelo — vem renovar a confiança.</p>
          </div>
      </section>

      <section id="servicos">
          <h1 class="titsec">Serviços</h1>
          <p>Oferecemos cortes de cabelo e barba personalizados, com técnicas modernas e clássicas, garantindo um visual impecável e de qualidade.</p>
          
      <div className="containercards">
        <div className="card">
          <img
            src="img/corte de cabelo-1200.jpg"
            alt="imagem de um modelo de corte de cabelo"
            style={{ width: "100%" }}
          />
          <div className="textcard">
            <p>Corte de Cabelo</p>
            <br />
            <p>R$49,90</p>
          </div>
        </div>

        <div className="card">
          <img
            src="img/homem fazendo barba.jpg"
            alt="imagem de um homem fazendo barba"
            style={{ width: "100%" }}
          />
          <div className="textcard">
            <p>Cabelo e Barba</p>
            <br />
            <p>R$59,90</p>
          </div>
        </div>
      </div>
      </section>
    </main>
  )
}

export default App