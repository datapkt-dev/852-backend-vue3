import { defineStore } from 'pinia'

export const useCommonStore  = defineStore('common', {
    state: () => ({ 
        phoneVerify: false,
        accountVerify: 0, // 0 1 2
        
    }),
    getters: {
        getPhoneVerify() {
            return this.phoneVerify
        },
        getAccountVerify() {
            return this.accountVerify
        }
    },
    actions: {
        setPhoneVerify(value) {
            this.phoneVerify = value

        },
        setAccountVerify(value) {
            this.accountVerify = value
        }
    },
})