import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Task from './Pages/Task'
import Pnf from './Pages/Pnf'
import Footer from './Components/Footer'
import Nav from './Components/Nav'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/login' element={<Auth insideLogin={true} />} />
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/:id/task' element={<Task />} />
        <Route path='/*' element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
