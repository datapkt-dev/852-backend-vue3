import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
    // 定義狀態
    const phoneVerify = ref(false)
    const accountVerify = ref(2) // 0 1 2

    // 定義 getters
    const getPhoneVerify = () => phoneVerify.value
    const getAccountVerify = () => accountVerify.value

    // 定義 actions
    const setPhoneVerify = (value) => {
        phoneVerify.value = value
    }

    const setAccountVerify = (value) => {
        accountVerify.value = value
    }

    // 返回狀態、getters 和 actions
    return {
        phoneVerify,
        accountVerify,
        getPhoneVerify,
        getAccountVerify,
        setPhoneVerify,
        setAccountVerify
    }
})