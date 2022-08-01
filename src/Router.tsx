import { Route, Routes } from "react-router-dom";
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { Perfil } from './Pages/Perfil'

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}
