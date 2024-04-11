<script setup>
import { ref, watch, computed } from 'vue'
import {useRouter,useRoute } from 'vue-router';
import "@/assets/css/content.scss";

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter();
const route = useRoute();

import { useCommonStore } from '@/store/commonStore'
const commonStore = useCommonStore()


const imgUserUrl = (url) => {
  if(url.match('http')){
    return url;
  }else{
    return new URL(`/src/assets/images/user/${url}`, import.meta.url).href
  }
}

const tabIndex = ref(1);

const googleUserData = ref({
    name: "",
    email: "",
    picture: "",
});

if(localStorage.getItem('user')){
    googleUserData.value = JSON.parse(localStorage.getItem('user'));
}

const isVisableSend = ref(false);
const canResend = ref(false);
const count_show = ref(60);
const sendHandler = () =>{
    isVisableSend.value = true;

    let count = 60;
    const timer = setInterval(() => {
        count--;
        count_show.value = count;
        if(count == 0){
            clearInterval(timer);
            canResend.value = true;
        }
    }, 1000);
    
}

const sendHaendler = (type) =>{
    commonStore.setAccountVerify(type)
}

const VerificationPhone = ref('')
const VerificationCode = ref('')

const VerificationCodeSendHandler = () =>{
    commonStore.setPhoneVerify(true)
}

</script>

<template>
  <div class="content-page">
    <div class="content-title">
        個人資料
    </div>
    <div class="content-body">
        <div class="home-top">
            <div>
                <div class="form-div">
                    <div>
                        <label for=""><small class="text-danger">*</small> 審核狀態</label>
                        <div>
                            <div v-if="commonStore.accountVerify==0">未送審</div>
                            <div v-if="commonStore.accountVerify==1">審核中</div>
                            <div v-if="commonStore.accountVerify==2">已審核</div>
                        </div>
                    </div>
                    <div>
                        <label for=""><small class="text-danger">*</small> 頭像</label>
                        <div>
                            <div class="input-group">
                                <img :src="googleUserData.picture" alt="" style="width: 100px; height: 100px; border-radius: 50%;"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for=""><small class="text-danger">*</small> 電子郵件</label>
                        <div>
                            <div class="input-group">
                                <input type="text" v-model="googleUserData.email" readonly />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for=""><small class="text-danger">*</small> 姓名</label>
                        <div>
                            <div class="input-group">
                                <input type="text" v-model="googleUserData.name" readonly />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for=""><small class="text-danger">*</small> 手機</label>
                        <div>
                            <div class="input-group ">
                                <div>
                                    <input type="text" v-model="VerificationPhone"  placeholder="輸入手機號碼" :disabled="isVisableSend || commonStore.phoneVerify"/>
                                </div>
                                <button class="btn btn-outline-primary" @click="sendHandler()"  v-if="isVisableSend==false && !commonStore.phoneVerify" :disabled="VerificationPhone==''">
                                    發送驗證碼
                                </button>
                                <div v-if="isVisableSend && !commonStore.phoneVerify" :disabled="!canResend">沒有收到嗎?</div>
                                <button class="btn btn-outline-primary" @click="sendHandler()"  v-if="isVisableSend && !commonStore.phoneVerify" :disabled="!canResend">
                                    重發驗證碼 {{count_show}}
                                </button>
                                <div v-if="isVisableSend && !commonStore.phoneVerify">
                                    <input type="text" v-model="VerificationCode" placeholder="輸入驗證碼" />
                                </div>
                                <button class="btn btn-primary" v-if="isVisableSend && !commonStore.phoneVerify" :disabled="VerificationCode==''" @click="VerificationCodeSendHandler()">
                                    立即驗證
                                </button>
                                <div v-if="commonStore.phoneVerify">
                                    <span class="text-success">已驗證</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="home-top mt-1" v-if="commonStore.phoneVerify">
            <div class="text-center">
                <button class="btn btn-primary" v-if="commonStore.accountVerify==0" @click="sendHaendler(1)">送審</button>
                <button class="btn btn-primary" v-if="commonStore.accountVerify==2"  @click="sendHaendler(1)">儲存並重新送審</button>

                <button class="btn btn-light" v-if="commonStore.accountVerify==1"  @click="sendHaendler(2)"> 測試用按鈕 (轉成 已審核)</button>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

    .home-top{
        display: flex;
        justify-content: space-between;
        margin: 0 -10px; 
        >div{
            position: relative;
            align-items: center;
            background: #fff;
            padding: 10px;
            border-radius: 3px;
            margin: 0 10px;
            box-shadow: 0 0 5px rgba(0,0,0,.1);
            width: 100%;
        }
    }


    @media (max-width: 1200px) {

        
    }

</style>