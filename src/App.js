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
        <nav>
           <div class="container"> {/* classe para estilizar as tags superiores */}
          <ul> 
              <li class="sobre"><a href="#sobre">Sobre</a></li> 
              <li class="servicos"><a href="#servicos">Serviços</a></li>
          </ul>
        </div>
        </nav>
      </header>

<<<<<<< HEAD
        {/* <header>
=======
        <header>
>>>>>>> e000423c2180a436afd4efbabce4e22e100df252
          <nav>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#servicos">Serviços</a></li>
            </ul>
          </nav>
<<<<<<< HEAD
        </header> */}
=======
        </header>
>>>>>>> e000423c2180a436afd4efbabce4e22e100df252

        <div id="inicial"> {/* ID para estilizar os parágrafos na página inicial */}
          <h1>SEU CORTE FALA POR VOCÊ ANTES MESMO DE VOCÊ DIZER UMA PALAVRA</h1>
          <h2>Horário de funcionamento: 08h às 19h</h2>
        

        <input type="button" value="Agendar serviço" onClick={() => HandleModal(1, true)} />
<<<<<<< HEAD
=======
        
          <Modal isOpen={isModal1Open} contentLabel="Agendar Serviço">
            <h2>Agendar Serviço</h2>
            <form>
              <div>
                <label>Nome:</label>
                <input type="text" value={iptName} onChange={(e) => setIptName(e.target.value)}/>
              </div>
              <div>
                <label>Data:</label>
                <input type="date" min={FormattedToday()} value={iptDate} onChange={(e) => setIptDate(e.target.value)}/>
              </div>
              <div>
                <label>Horário:</label>
                <select value={inicialOption} onChange={(e) => setInicialOption(e.target.value)}>
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
              <button type="button" onClick={() => HandleModal(2, true)}>Confirmar</button>
            </form>
            <button onClick={() => HandleModal(1, false)}>Fechar</button>
          </Modal>
          <Modal isOpen={isModal2Open} contentLabel="Agendamento realizado!">
            <h2>Agendamento realizado</h2>
            <button type="button" onClick={() => HandleModal(2, false)}>Voltar</button>
          </Modal>
    
>>>>>>> e000423c2180a436afd4efbabce4e22e100df252

        <Modal isOpen={isModal2Open} contentLabel="Agendamento realizado!">
          <h2>Agendamento realizado</h2>
          <button type="button" onClick={() => HandleModal(2, false)}>Voltar</button>
        </Modal>
<<<<<<< HEAD
        </div> 
=======

>>>>>>> e000423c2180a436afd4efbabce4e22e100df252
      </section>

      <section id="sobre">
        <div id="borda"> {/* ID para melhorar a tag sobre */}
          <div class="container-sobre">
            <h1>Sobre</h1>
            <p>No nosso estúdio, cada corte é mais do que estilo — é identidade. Trabalhamos para realçar a personalidade de cada cliente com técnica, atenção aos detalhes e um atendimento personalizado.</p>
            <p>Com profissionais experientes e um ambiente acolhedor, buscamos sempre superar expectativas e transformar sua visita em uma experiência única. Aqui, você não vem só cortar o cabelo — vem renovar a confiança.</p>
          </div>
        </div>
      </section>

      <section id="servicos">
          <h1>Serviços</h1>
          <p>Oferecemos cortes de cabelo e barba personalizados, com técnicas modernas e clássicas, garantindo um visual impecável e de qualidade.</p>
        
      </section>
    </main>
  )
}

export default App
<<<<<<< HEAD
=======

>>>>>>> e000423c2180a436afd4efbabce4e22e100df252
