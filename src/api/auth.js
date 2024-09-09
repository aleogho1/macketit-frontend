import { useMutation } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
// import { formatError, showSuccess } from "../utilities/messagePopup";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/signup`, data)
    },
  })
}

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/verify-email`, data)
    },
  })
}

export const useVerifyEmailResendOtp = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/resend-code`, data)
    },
  })
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/complete-registration`, data)
    },
  })
}
export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/login`, data)
    },
  })
}

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/forgot-password`, data)
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/reset-password`, data)
    },
  })
}

export const useVerify2Fa = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/verify-2fa`, data)
    },
  })
}

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.delete(`/logout`, data)
    },
  })
}
export const useDeleteAcc = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.delete(`/delete-account`, data)
    },
  })
}
// social login
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: () => {
      return API.get(`/gg_login`)
    },
  })
}

export const useFacebookLogin = () => {
  return useMutation({
    mutationFn: () => {
      return API.get(`/facebook_login`)
    },
  })
}
// social sign up
export const useGoogleSignu = () => {
  return useMutation({
    mutationFn: () => {
      return API.get(`/gg_signup`)
    },
  })
}
