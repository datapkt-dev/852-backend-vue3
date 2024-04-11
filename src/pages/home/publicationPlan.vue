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

const planIndex = ref(-1);
const isplane = ref(true);

</script>

<template>
  <div class="content-page">
    <div class="box">
        <StatusDiv :statusId="'2'" :isplane="isplane"/>
    </div>
    <div class="box">
        <div class="box-top">
            是否需要刊登廣告
        </div>
        <div class="plan-div flex" style="justify-content: start;">
        <label class="radiobox" for="radio-isplane-1">
            <input type="radio" name="radio-isplane" id="radio-isplane-1" value="false" @click="isplane=false" :checked="isplane==false">
            <div></div> 不刊登
        </label> 
        <label class="radiobox" for="radio-isplane-2">
            <input type="radio" name="radio-isplane" id="radio-isplane-2"  value="true" @click="isplane=true" :checked="isplane">
            <div></div> 選擇刊登方案
        </label> 
        </div>
    </div>

    <div class="box" v-if="isplane">
        <div class="box-top">
            購買刊登方案
        </div>
        <div class="plan-div">
            <div>
                <div>方案</div>
                <div>專屬權益</div>
                <div>售價</div>
                <div>放盤時間</div>
                <div>預計瀏覽</div>
                <div>瀏覽單價</div>
                <div>購買數量</div>
            </div>
            <div>
                <div>普通刊登</div>
                <div class="choose-box" :class="planIndex == 0?'active':''"  @click="planIndex=0">
                    <div >/</div>
                    <div>$300</div>
                    <div>30日</div>
                    <div>約450次瀏覽/盤</div>
                    <div>$0.66</div>
                    <div>
                        <div class="input-group-inline">
                            <button class="btn btn-outline-dark">
                                <span class="material-icons-outlined">
                                remove
                                </span>
                            </button>
                            <input type="number" min="0">
                            <button class="btn btn-outline-dark">
                                <span class="material-icons-outlined">
                                add
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>VIP置頂</div>
                <div class="choose-box" :class="planIndex == 1?'active':''" @click="planIndex=1">
                    <div>展示在普通方案之前</div>
                    <div>$500</div>
                    <div>30日</div>
                    <div>約1800次瀏覽/盤</div>
                    <div>$0.28</div>
                    <div>
                        <div class="input-group-inline">
                            <button class="btn btn-outline-dark">
                                <span class="material-icons-outlined">
                                remove
                                </span>
                            </button>
                            <input type="number" min="0">
                            <button class="btn btn-outline-dark">
                                <span class="material-icons-outlined">
                                add
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-1 text-gray">TIPS：每個租盤可在30日內啟用，且可無限次更換廣告。多筆長期付費方案</div>
    </div>
    <div class="box" v-if="isplane">
        <div class="box-top">
            多筆長期付費方案
        </div>
        <div class="plan-div">
            <table>
                <thead>
                    <tr>
                        <th>方案</th>
                        <th>售價</th>
                        <th>放盤時間</th>
                        <th>更換廣告次數</th>
                        <th>放盤個數</th>
                        <th>啟用時間</th>
                        <th>單價</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>高級年費計劃</td>
                        <td>$1000</td>
                        <td>30日/個</td>
                        <td>可無限次更換</td>
                        <td>6個</td>
                        <td>12個月內啟用</td>
                        <td>$167</td>
                        <td>
                            <label class="radiobox" for="radio-plane-1">
                                <input type="radio" name="radio-plane" id="radio-plane-1">
                                <div></div>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>至尊年費計劃</td>
                        <td>$1700</td>
                        <td>30日/個</td>
                        <td>可無限次更換</td>
                        <td>12個</td>
                        <td>12個月內啟用</td>
                        <td>$142</td>
                        <td>
                            <label class="radiobox" for="radio-plane-2">
                                <input type="radio" name="radio-plane" id="radio-plane-2">
                                <div></div>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>豪華年費計劃</td>
                        <td>$3000</td>
                        <td>30日/個</td>
                        <td>可無限次更換</td>
                        <td>25個</td>
                        <td>12個月內啟用</td>
                        <td>$120</td>
                        <td>
                            <label class="radiobox" for="radio-plane-3">
                                <input type="radio" name="radio-plane" id="radio-plane-3">
                                <div></div>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="box flex-space">
        <button class="btn btn-outline-primary" @click="router.go(-1)">Back</button>
        <button v-if="isplane" class="btn btn-primary" @click="router.push('/home/add-rent/pay-the-fee')">下一步</button>
        <button v-if="!isplane" class="btn btn-primary" @click="router.push('/home/add-rent/success?isplane=false')">下一步</button>
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
        width: 100%;
        overflow: hidden;
        overflow-x: auto;
        cursor: pointer;
        >div{
            text-align: center;
            border: 1px solid #f0f0f0;
            white-space: nowrap;
            min-width: 200px;
            >div{
                padding: 20px 0;
                border-bottom: 1px solid #f0f0f0;
                &:nth-child(2){
                    padding: 0;
                    >div{
                        padding: 20px 0;
                        border-bottom: 1px solid #f0f0f0;
                    }
                }
                &:nth-last-child(1){
                    border-bottom: none;
                }
            }
            &:nth-child(1){
                width: 30%;
                >div:nth-child(1){
                    background-color: var(--bs-gray-200);
                    font-weight: bold;
                }
                >div:nth-child(2){
                    background: #fcfcfc;
                    padding: 20px 0 !important;
                    border-bottom: 1px solid #f0f0f0;
                }
            }
            &:nth-child(2){
                width: 35%;
                >div:nth-child(1){
                    background-color: var(--badge-primary-bg);
                    font-weight: bold;
                }
            }
            &:nth-child(3){
                width: 35%;
                >div:nth-child(1){
                    background-color: var(--bs-primary);
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
        >table{
            width: 100%;
            min-width: 600px;
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
    .radiobox{
        display: flex;
        justify-content: start;
        align-items: center;
        margin-right: 20px;
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
            margin-right: 10px;
        }
    }
    .choose-box{
        position: relative;
        &::before {
            content: '';
            position: absolute;
            width: calc(100% - 10px);
            height: calc(100% - 10px);
            top: 0;
            left: 0;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }
        &.active{
            &::before {
                content: '';
                border-right: 5px solid var(--bs-primary);
                border-left: 5px solid var(--bs-primary);
                border-top: 5px solid var(--bs-primary);
                border-bottom: 5px solid var(--bs-primary);
            }
            &:after{
                content: '';
                right: 0;
                bottom: 0;
                position: absolute;
                border-top: 20px solid transparent;
                border-bottom: 20px solid var(--bs-primary);
                border-right: 20px solid var(--bs-primary);
                border-left: 20px solid transparent;
            }
        }
    }



    @media (max-width: 1200px) {
        
        .box{
            padding:    10px;
        }
    }

</style>