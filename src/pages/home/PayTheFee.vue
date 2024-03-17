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

</script>

<template>
  <div class="content-page">
    <div class="box">
        <StatusDiv :statusId="'3'"/>
    </div>
    <div class="box">
        <div class="box-top flex-space mb-0">
            <div>
                賬戶餘額：0點
            </div>
            <div>
                實付：<span class="text-primary">$300</span>
            </div>
        </div>
    </div>
    <div class="box">
        <div class="box-top">
           訂單信息
        </div>
        <div class="plan-div">
            <table>
                <thead>
                    <tr>
                        <th>購買類型</th>
                        <th>個數</th>
                        <th>總價</th>
                        <th>賬戶扣點</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>租盤-普通刊登</td>
                        <td>1個</td>
                        <td>$300</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="box">
        <div class="box-top">
           PayPal繳費
        </div>
        <div class="paypal">
            <div>
                <div>
                    <label for="" style="white-space: nowrap;"> 
                        <small class="text-danger">*</small> 信用卡號碼（Visa Card / Master Card）	
                    </label>
                    <input type="text" name="" id="">
                </div>
            </div>
            <div>
                <div>
                    <label for="" style="white-space: nowrap;"> 
                        <small class="text-danger">*</small> 有效期（MM / YY）	
                    </label>
                    <input type="text" name="" id="">
                </div>
                <div>
                    <label for="" style="white-space: nowrap;"> 
                        <small class="text-danger">*</small> 安全碼（CVV）卡背最後3個數字	
                    </label>
                    <input type="text" name="" id="">
                </div>
            </div>
            <div>
                此為安全加密頁面 (SSL)，你的信用卡資料會被加密傳輸。所有資料只會傳送到 Paypal 處理，852不會處理或保存妳的信用卡任何資料。
            </div>
        </div>
    </div>
    <div class="box flex-space">
        <button class="btn btn-outline-primary" @click="router.go(-1)">Back</button>
        <button class="btn btn-primary" @click="router.push('/home/add-rent/success')">立即付款</button>
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




    .plan-div{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        
        >table{
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #f0f0f0;
            >thead{
                background-color: var(--bs-gray-200);
                >tr{
                    >th{
                        padding: 20px 0;
                        border-bottom: 1px solid #f0f0f0;
                    }
                }
            }
            >tbody{
                >tr{
                    >td{
                        padding: 20px 0;
                        border-bottom: 1px solid #f0f0f0;
                        text-align: center;
                        >label{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            >input{
                                display: none;
                                &:checked + div{
                                    background-color: var(--bs-primary);
                                    color: #fff;
                                }
                            }
                            >div{
                                width: 20px;
                                height: 20px;
                                border: 1px solid var(--bs-gray);
                                border-radius: 50%;
                                cursor: pointer;
                            }
                        }
                    }
                    &:nth-last-child(1){
                        >td{
                            border-bottom: none;
                        }
                    }
                }
            }
        }
    }

    .paypal{
        >div{
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            >div{
                width: 49%;
                >label{
                    display: block;
                    margin-bottom: 10px;
                }
                >input{
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #f0f0f0;
                    border-radius: 5px;
                }
            }
            &:nth-last-child(1){
                margin-bottom: 0;
                background: var(--badge-primary-bg);
                padding: 15px;
                color: var(--bs-primary);
            }
        }
    }

    @media (max-width: 1200px) {
        
        .box{
            padding:    10px;
        }
    }

</style>