import React, { useState } from 'react'
import Modal from 'react-modal'
import './App.css'

function App() {
  const [isModal1Open, setIsModal1Open] = useState(false)
  const [isModal2Open, setIsModal2Open] = useState(false)

  const [iptName, setIptName] = useState()
  const [iptDate, setIptDate] = useState()

  const [inicialOption, setInicialOption] = useState()
  

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
      if(FormValidation(iptName, iptDate)) {
        setIsModal2Open(abrir_fechar)
        setIsModal1Open(false)
      }
      else {
        alert("Preencha corretamente os campos antes de confirmar!")
      }
    } 
  }

 function FormValidation(iptName, iptDate) {
    return /^[A-Za-z\s]+$/.test(iptName) && /[^ ]/.test(iptName) && (iptDate) && (inicialOption)
}

function DisableOption(optionTime, selectedDate) {

  const now = new Date()
  const selected = new Date(`${selectedDate}T${optionTime}`)

  return selected < now
}

  return (
    <main>
      <section>
      <header>
        <nav>
          <ul>
              <div class="container"> {/* classe para estilizar as tags superiores */}
              <div class="sobre">
                <li><a href="#sobre">Sobre</a></li>
              </div>
              
              <div class="servicos">
                <li><a href="#servicos">Serviços</a></li>
              </div>
            </div>
          </ul>
        </nav>
      </header>

        <div id="inicial"> {/* ID para estilizar os parágrafos na página inicial */}
          <h1>SEU CORTE FALA POR VOCÊ ANTES MESMO DE VOCÊ DIZER UMA PALAVRA</h1>
          <h2>Horário de funcionamento: 08h às 19h</h2>
        </div>

        <input type="button" value="Agendar serviço" onClick={() => HandleModal(1, true)} />


        
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
    
      </section>

      <section id="sobre">
        <div id="borda"> {/* ID para melhorar a tag sobre */}
          <h1>Sobre</h1>
          <p>No nosso estúdio, cada corte é mais do que estilo — é identidade. Trabalhamos para realçar a personalidade de cada cliente com técnica, atenção aos detalhes e um atendimento personalizado.</p>
          <p>Com profissionais experientes e um ambiente acolhedor, buscamos sempre superar expectativas e transformar sua visita em uma experiência única. Aqui, você não vem só cortar o cabelo — vem renovar a confiança.</p>
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

