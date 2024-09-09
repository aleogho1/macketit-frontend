import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useDownloadTransHistory = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post('/download_transaction_history', data)
    },
  })
}

export const useFetchTransactionHistory = () => {
  return useQuery({
    queryKey: ['transaction_history'],
    queryFn: async () => {
      const res = await API.get(`/transactions`)
      return res?.data?.transactions_history
    },
  })
}
