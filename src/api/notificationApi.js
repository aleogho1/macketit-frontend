import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useGetNotification = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await API.post(`/notifications`)
      return res?.data?.notifications
    },
  })
}
export const useGetNotificatioByType = (type) => {
  return useQuery({
    queryKey: ['notifications', type],
    queryFn: async () => {
      const res = await API.get(`/notifications?type=${type}`)
      return res?.data?.notifications
    },
  })
}
export const useGetActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await API.post(`/activities`)
      return res?.data?.user_notification
    },
  })
}
export const useGetMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await API.post(`/messages`)
      return res?.data?.user_notification
    },
  })
}

export const useGlobalSearch = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/global_search`, data)
    },
  })
}
