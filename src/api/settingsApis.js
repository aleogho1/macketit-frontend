import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useUpdateNoticePrefence = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/settings/notifications`, data)
    },
  })
}

export const useUpdateUserPrefence = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/settings/preferences`, data)
    },
  })
}

export const useUpdateSecPrefence = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/settings/two-fa`, data)
    },
  })
}

export const useComplete2Fa = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/settings/activate/complete-google-2fa`, data)
    },
  })
}

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/settings/password`, data)
    },
  })
}

export const useGetNoticPrefence = () => {
  return useQuery({
    queryKey: ['notice_prefrence'],
    queryFn: async () => {
      const res = await API.get(`/settings/notifications`)
      return res?.data?.notification_preference
    },
  })
}
export const useGetUserPrefence = () => {
  return useQuery({
    queryKey: ['user_preference'],
    queryFn: async () => {
      const res = await API.get(`/settings/preferences`)
      return res?.data?.user_preferences
    },
  })
}

export const useGetSecurityPrefrence = () => {
  return useQuery({
    queryKey: ['sec_prefence'],
    queryFn: async () => {
      const res = await API.get(`/settings/security`)
      return res?.data?.security_settings
    },
  })
}

export const useActivateGoogleAuth = () => {
  return useQuery({
    queryKey: ['google_auth'],
    queryFn: async () => {
      const res = await API.get(`/settings/activate/google-2fa`)
      return res?.data?.qr_code_data
    },
  })
}

export const useDeactivateGoogleAuth = () => {
  return useMutation(async () => {
    const res = await API.get(`/settings/deactivate/google-auth-app`)
    return res?.data
  })
}
