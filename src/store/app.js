// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    phone: "",
    otp_result: null
  }),
})
