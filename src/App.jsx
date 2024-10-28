import './index.css'
import Home from './pages/home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Notes from './pages/notes/notes'


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  )
}