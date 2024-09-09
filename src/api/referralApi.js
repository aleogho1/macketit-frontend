import { useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchReferral = () => {
  return useQuery({
    queryKey: ['referral'],
    queryFn: async () => {
      const res = await API.get(`/referral/history`)
      return res?.data?.referral_history
    },
  })
}
