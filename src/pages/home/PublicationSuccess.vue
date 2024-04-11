<script setup>
import { ref, watch, computed } from 'vue'
import {useRouter,useRoute } from 'vue-router';
import "@/assets/css/content.scss";

import StatusDiv from '@/pages/home/statusDiv.vue'


import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter();
const route = useRoute();

const pageType = computed(() => {
  return route.params.pageType;
})

const isplane = ref(true);

// get from url ?isplane=false
if(route.query.isplane == 'false'){
  isplane.value = false;
}

</script>

<template>
  <div class="content-page">
    <div class="box">
        <StatusDiv :statusId="'4'" :isplane="isplane"/>
    </div>
    <div class="box success-box">
        <span class="material-icons-outlined">
        check_circle
        </span>
        <div>刊登成功</div>
    </div>
    <div class="box text-center">
        <button class="btn btn-primary" @click="router.push('/home')">回到主頁</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

    .box {
        margin-bottom: 15px;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        >.box-top {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            >span {
                font-size: 14px;
                font-weight: normal;
                color: #999;
            }
        }
    }

    .success-box {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        padding: 60px 0;
        >span {
            font-size: 80px;
            color: var(--bs-primary);
            margin-bottom: 30px ;
        }
    }


    @media (max-width: 1200px) {
        
        .box{
            padding:    10px;
        }
    }

</style>