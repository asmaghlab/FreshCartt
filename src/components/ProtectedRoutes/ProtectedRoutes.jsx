import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth.context'
import { Navigate, useLocation } from 'react-router'
import PageSkeleton from '../Skeleton/PageSkeleton'

export default function ProtectedRoutes({ children }) {

  const { isAuthenticated, isLoading } = useContext(AuthContext)


  const location = useLocation()

  if (isLoading) {
    return <PageSkeleton />
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />
  } else {
    return children



  }

}
