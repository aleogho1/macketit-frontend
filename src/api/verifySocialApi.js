import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useVerifySocial = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/users/social-profiles/new`, data)
    },
  })
}

export const useGetSocialLinks = () => {
  return useQuery({
    queryKey: ['get_social'],
    queryFn: async () => {
      const res = await API.get(`/verified_socials`)
      return res?.data
    },
  })
}

export const useGetDeleteLinks = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.delete(`/users/social-profiles/${data}`,)
    },
  })
}
