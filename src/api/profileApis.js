import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
import APIFormData from '../services/AxiosInstanceFormdata'
// import { formatError, showSuccess } from "../utilities/messagePopup";

export const useUserProfile = () => {
  return useMutation({
    mutationFn: (formData) => {
      return APIFormData.post(`/profile/edit`, formData)
    },
  })
}

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['get_profile'],
    queryFn: async () => {
      const res = await API.get(`/profile`)
      return res?.data?.user_profile
    },
  })
}
