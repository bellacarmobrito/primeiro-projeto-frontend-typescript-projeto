import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import useAuth from "./hooks/useAuth";
import TeacherDetail from "./pages/TeacherDetail";


type Props = {
  redirectTo: string
}

function ProtectedRoutes({redirectTo}:Props){
  const {handleGetToken} = useAuth()

  return handleGetToken() ? <Outlet/> : <Navigate to={redirectTo}/>
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>

  <Route element={<ProtectedRoutes redirectTo="/"/>} >
      <Route path="/main" element={<Main />}></Route>
      <Route path="/teacher-detail" element={<TeacherDetail />}></Route>
  </Route>
    </Routes>
  );
}

export default MainRoutes;
