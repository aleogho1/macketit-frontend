import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchBank = () => {
  return useQuery({
    queryKey: ['fetch_bank'],
    queryFn: async () => {
      const res = await API.get(`/banks`)
      return res?.data?.supported_banks
    },
  })
}

export const useVerifyBank = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/banks/verify/account`, data)
    },
  })
}

export const useUpdateBankDetils = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/profile/bank`, data)
    },
  })
}
