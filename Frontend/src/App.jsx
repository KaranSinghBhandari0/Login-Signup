import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/adminPage' element={<Admin/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/Signup' element={<Signup/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
