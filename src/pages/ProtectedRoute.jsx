/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useGetProfile } from '../api/profileApis'
import LoadingState from '../components/auth/LoadingState'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children }) => {
  const { data: profileDeatils, isPending, error } = useGetProfile()

  if (profileDeatils) {
    return children
  }
  if (error?.response?.status === '401') {
    toast.error('Unauthorized, Please Login!!')
    return <Navigate to='/login' />
  }
  if (isPending) {
    return <LoadingState />
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute
