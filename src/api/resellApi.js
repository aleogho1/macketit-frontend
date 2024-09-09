import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
import APIFormData from '../services/AxiosInstanceFormdata'

export const useSellProduct = () => {
  return useMutation({
    mutationFn: (data) => {
      return APIFormData.post(`/items/new`, data)
    },
  })
}

export const useFetchItems = () => {
  return useQuery({
    queryKey: ['get_items'],
    queryFn: async () => {
      const res = await API.get(`/items`)
      return res?.data?.all_items
    },
  })
}

export const useFetchSingleItems = () => {
  return useQuery({
    queryKey: ['get_single_items'],
    queryFn: async (id) => {
      const res = await API.get(`/items/${id}`)
      console.log(res?.data, 'resss')
      return res?.data?.all_items
    },
  })
}
