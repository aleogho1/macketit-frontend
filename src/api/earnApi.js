import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
import APIFormData from '../services/AxiosInstanceFormdata'

export const useGenerateTask = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/generate-task`, data)
    },
  })
}

export const usePerformTask = (status, platform) => {
  return useQuery({
    queryKey: ['perform_task', status, platform],
    queryFn: async () => {
      const res = await API.get(`/performed-tasks?status=${status}&platform=${platform}`)
      return res?.data?.performed_tasks
    },
  })
}
export const usePerformTaskStatus = (status) => {
  return useQuery({
    queryKey: ['perform_task', status],
    queryFn: async () => {
      const res = await API.get(`/performed-tasks?status=${status}`)
      return res?.data?.performed_tasks
    },
  })
}
export const usePreviewPerformTask = (key) => {
  return useQuery({
    queryKey: ['perform_task', key],
    queryFn: async () => {
      const res = await API.get(`/performed-tasks/${key}`)
      return res?.data?.performed_task
    },
  })
}

export const usePerformTotalTask = () => {
  return useQuery({
    queryKey: ['perform_task_total'],
    queryFn: async () => {
      const res = await API.get(`/performed-tasks`)
      return res?.data?.performed_tasks
    },
  })
}

export const useSubmitPerformTask = () => {
  return useMutation({
    mutationFn: (data) => {
      return APIFormData.post(`/perform-task`, data)
    },
  })
}

export const usePreviewTask = (task_key) => {
  return useQuery({
    queryKey: ['perform_task', task_key],
    queryFn:async () => {
      const res = await API.get(`/user/tasks/${task_key}`)
    }
  })
}
export const useCalcelTask = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.put(`/performed-tasks/cancel/${id}`)
    },
  })
}
export const useGetAdvertTask = (platform) => {
  return useQuery({
    queryKey: ['advert_tasks', platform],
    queryFn:async () => {
      const res = await API.get(`tasks/advert/${platform}`)
      return res?.data?.advert_tasks
    }
  })

}
export const useGetEngageTask = () => {
  return useQuery({
    queryKey: ['tasks_by_goal'],
    queryFn:async () => {
      const res = await API.get(`/tasks/engagement/grouped-by/goal`)
      return res?.data?.tasks_by_goal
    }
  })

}
