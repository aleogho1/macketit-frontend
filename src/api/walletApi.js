import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFundWallet = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/payment/credit-wallet`, data)
    },
  })
}
export const useWitdrawFundsh = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/payment/withdraw`, data)
    },
  })
}

export const useActivateMembership = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/payment/membership-fee`, data)
    },
  })
}

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/payment/verify`, data)
    },
  })
}

export const useFetchBallance = () => {
  return useQuery({
    queryKey: ['show_ballance'],
    queryFn: async () => {
      const res = await API.post(`/show_balance`)
      return res?.data
    },
  })
}
export const useFundWalletHistory = () => {
  return useQuery({
    queryKey: ['funding_history'],
    queryFn: async () => {
      const res = await API.get(`/transactions/funding`)
      return res?.data?.funding_history
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

export const useBankDetails = () => {
  return useQuery({
    queryKey: ['get_bank'],
    queryFn: async () => {
      const res = await API.get(`/profile/bank`)
      return res?.data?.bank_details
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
export const useFetchTransactionHistoryEarned = () => {
  return useQuery({
    queryKey: ['transaction_type=earned'],
    queryFn: async () => {
      const res = await API.get(`/transactions?transaction_type=earned`)
      return res?.data?.transactions_history
    },
  })
}
export const useFetchTransactionHistoryOrder = () => {
  return useQuery({
    queryKey: ['transaction_type=orders'],
    queryFn: async () => {
      const res = await API.get(`/transactions?transaction_type=orders`)
      return res?.data?.transactions_history
    },
  })
}
