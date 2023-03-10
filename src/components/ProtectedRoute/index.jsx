import { Outlet, Navigate } from "react-router-dom";
import GetCookie from '../../hooks/getCookie'
export const ProtectedRoute =()=>{
  const auth = GetCookie('token')

  if(auth !== 'asd'){
    console.log('patras mi loco')
      return <Navigate to='/login' />
  }else{
    return   <Outlet />
  }
}
