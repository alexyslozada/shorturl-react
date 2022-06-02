import Axios from "axios"

import { API_URL } from "../config/configuration"

const HttpStatusUnauthorized = 401

// Set base URL
Axios.defaults.baseURL = API_URL

Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`

// TODO: Handle status diff to 2xx
