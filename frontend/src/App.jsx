import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import VehiculoGasto from './pages/apoderados/VehiculoGasto';
import TipoGasto from './pages/apoderados/TipoGasto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/vehiculo-gasto" element={<VehiculoGasto/>}/>
        <Route path="/tipo-gasto" element={<TipoGasto/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;