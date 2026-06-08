import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/add-product' element={<AddProduct />}></Route>
      <Route path='/edit-product/:id' element={<EditProduct />}></Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
