import axios from 'axios'

// *** API SETUP ***/

const API = axios.create({
  // baseURL: `https://trendit3-v2-gj9x.onrender.com/api`,
  // baseURL: `https://trendit3-hd9u.onrender.com/api`,
  baseURL: `https://api-staging.trendit3.com/api`,
})

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('signup_token'))?.state?.token
  const access_token = JSON.parse(localStorage.getItem('access_token'))?.state
    ?.token
  req.headers['signup_token'] = token
  req.headers['access_token'] = access_token
  req.headers['Authorization'] = `Bearer ${access_token}`
  req.headers['Content-type'] = 'application/json'
  req.headers['Accept'] = 'application/json'
  req.headers['CALLBACK-URL'] = window.location.origin + `/dashboard/payment`
  return req
})

export default API
