import { useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
// import { formatError, showSuccess } from "../utilities/messagePopup";

export const useGetCountry = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['country'],
    queryFn: async () => {
      const res = await API.get(`/countries`)
      return res?.data?.countries
    },
  })
  return { data, isLoading, isError }
}

export const useGetState = (country) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['state', country],
    queryFn: async () => {
      const res = await API.post(`/states`, { country })
      return res?.data?.states
    },
    enabled: !!country,
  })
  return { data, isLoading, isError }
}

export const useGetLga = (state) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lga', state],
    queryFn: async () => {
      const res = await API.post(`/states/lga`, { state })
      return res?.data?.state_lga
    },
    enabled: !!state,
  })
  return { data, isLoading, isError }
}

export const useGetReligion = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['religion'],
    queryFn: async () => {
      const res = await API.get(`/religions`)
      return res?.data?.religions
    },
  })
  return { data, isLoading, isError }
}
