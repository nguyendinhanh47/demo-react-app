
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from './components/Signin';
import { Register } from './components/Register';
import { Home } from './Page/Home';
import { Profile } from './components/Profile';
import { AuthRoute, ProtectedRoute } from './HOC/Route';
import { Products } from './components/Products';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<AuthRoute > <Signin /></AuthRoute>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<ProtectedRoute ><Profile /></ProtectedRoute>}></Route>
        <Route path='/products' element={<ProtectedRoute ><Products /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
