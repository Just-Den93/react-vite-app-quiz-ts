import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { QuizProvider } from './context/QuizContext'
import { ModalProvider } from './context/ModalContext'
import Sidebar from './components/layout/Sidebar/Sidebar'
import QuizCard from './components/features/Quiz/QuizCard/QuizCard'
import QuizPage from './components/features/Quiz/QuizPage/QuizPage'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <QuizProvider>
        <App 
          Sidebar={Sidebar}
          QuizCard={QuizCard}
          QuizPage={QuizPage}
        />
      </QuizProvider>
    </ModalProvider>
  </React.StrictMode>
)