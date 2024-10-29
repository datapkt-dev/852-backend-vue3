<script setup>
import { ref, watch, computed } from 'vue'
import {useRouter,useRoute } from 'vue-router';
import "@/assets/css/content.scss";

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { storeToRefs  } from 'pinia';
import { useCommonStore } from '@/store/commonStore'

const commonStore = useCommonStore()
const { accountVerify } = storeToRefs(commonStore);

const router = useRouter();
const route = useRoute();

const getSampleImg = (key) => {
    return new URL(`/src/assets/images/sample/demo${key}.jpg`, import.meta.url).href
}

const stepStatus = ref(1)

const nextHandler = () => {
    stepStatus.value += 1
}

const backHandler = () => {
    stepStatus.value -= 1
}


</script>

<template>
  <div class="content-page">
    <div class="edit-house-top">
        <div class="title">新增放盤</div>
        <hr>
        <div class="step-and-reset">
            <div class="step-div">
                <div :class="[
                    stepStatus >= 1 ? 'active' : '',
                    stepStatus == 1 ? 'now' : ''
                ]">
                    <span class="material-icons">
                        menu
                    </span>
                    放盤類別
                </div>
                <div :class="[
                    stepStatus >= 2 ? 'active' : '',
                    stepStatus == 2 ? 'now' : ''
                ]">
                    <span class="material-icons">
                        edit
                    </span>
                    放盤內容
                </div>
                <div :class="[
                    stepStatus >= 3 ? 'active' : '',
                    stepStatus == 3 ? 'now' : ''
                ]">
                    <span class="material-icons">
                        preview
                    </span>
                    預覽
                </div>
                <div :class="[
                    stepStatus >= 4 ? 'active' : '',
                    stepStatus == 4 ? 'now' : ''
                ]">
                    <span class="material-icons">
                        thumb_up_alt
                    </span>
                    完成
                </div>
            </div>
            <div class="reset-div">
                <button class="btn btn-sm btn-primary">
                    <span class="material-icons">
                    restore
                    </span>
                    重設
                </button>
            </div>
        </div>
    </div>
    <div class="edit-house-content">
        <!-- 業主或地產代理 * 業主 地產代理-->
        <div>
            <label>業主或地產代理 *</label>
            <div class="radio-choose-div">
                <label for="houseOwner1">
                    <input type="radio" id="houseOwner1" name="houseOwner" value="1">
                    <span>業主</span>
                </label>
                <label for="houseOwner2">
                    <input type="radio" id="houseOwner2" name="houseOwner" value="2">
                    <span>地產代理</span>
                </label>
            </div>
        </div>
        <!-- 租賣 * 放賣 放租-->
        <div>
            <label>租賣 *</label>
            <div class="radio-choose-div">
                <label for="houseType1">
                    <input type="radio" id="houseType1" name="houseType" value="1">
                    <span>放賣</span>
                </label>
                <label for="houseType2">
                    <input type="radio" id="houseType2" name="houseType" value="2">
                    <span>放租</span>
                </label>
            </div>
        </div>

        <!-- 本地/海外 * 本地(香港) 海外-->
        <div>
            <label>本地/海外 *</label>
            <div class="radio-choose-div">
                <label for="houseLocal1">
                    <input type="radio" id="houseLocal1" name="houseLocal" value="1">
                    <span>本地(香港)</span>
                </label>
                <label for="houseLocal2">
                    <input type="radio" id="houseLocal2" name="houseLocal" value="2">
                    <span>海外</span>
                </label>
            </div>
        </div>

        <div>
            <label for="">放盤類別 *</label>
            <div>
                <div class="input-group">
                    <select name="" id="">
                        <option value="">--select--</option>
                        <option value="">住宅</option>
                        <option value="">車位</option>
                        <option value="">工商</option>
                        <option value="">店鋪</option>
                        <option value="">土地</option>
                    </select>
                    <select name="" id="">
                        <option value="">--select--</option>
                        <option value="">工商大廈</option>
                        <option value="">寫字樓</option>
                    </select>
                    <select name="" id="">
                        <option value="">--select--</option>
                        <option value="">私人住宅土地</option>
                        <option value="">村屋土地</option>
                        <option value="">農地</option>
                        <option value="">倉地</option>
                        <option value="">貨倉</option>
                        <option value="">康樂地</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <label for="">項目是否多於一伙或是發展商項目? *  </label>
            <div class="radio-choose-div">
                <label for="houseMore1">
                    <input type="radio" name="houseMore" id="houseMore1" value="1">
                    <span>只有一伙</span>
                </label>
                <label for="houseMore2">
                    <input type="radio" name="houseMore" id="houseMore2" value="2">
                    <span>多於一伙或是新盤</span>
                </label>
            </div>
        </div>
        <div>
            <label for="">選擇使用個人帳戶或已加入的套餐 *</label>
            <div class="input-group">
                <!-- <label for="">
                    <input type="radio" name="houseAccount" id="houseAccount1" value="1">
                    <span>使用個人帳戶</span>
                </label>
                <label for="">
                    <input type="radio" name="houseAccount" id="houseAccount2" value="2">
                    <span>使用已加入的套餐</span>
                </label> -->
            </div>
        </div>
        <hr>
        <label for="">
            <input type="checkbox" name="houseAgree" id="houseAgree">
            <span>已知及同意: 有關放盤成功送出後，以上資料均不能修改</span>
        </label>
        <div class="options-div">
            <div>
                <button class="btn btn-gray" @click="backHandler()" v-if="stepStatus!=1 && stepStatus!=4">
                    <span class="material-icons">
                        arrow_back
                    </span>
                    上一步
                </button>
            </div>
            <div>
                <button class="btn btn-primary" @click="nextHandler()" v-if="stepStatus!=4">
                    下一步
                    <span class="material-icons">
                        arrow_forward
                    </span>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.edit-house-top{
    display: flex;
    flex-direction: column;
    .title{
        font-size: 20px;
        font-weight: bold;
    }
    .step-and-reset{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        .step-div{
            display: flex;
            border: 1px solid var(--bs-gray-400);
            border-radius: 5px;
            overflow: hidden;
            div{
                position: relative;
                display: flex;
                align-items: center;
                padding: 10px 20px 10px 20px;
                font-size: 12px;
                span{
                    margin-right: 5px;
                }
                &::before{
                    content: '';
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    right: 0;
                    background: var(--bs-gray-400);
                }
                &::after{
                    content: '';
                    z-index: 1;
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    border-right: 1px solid var(--bs-gray-400);
                    border-top: 1px solid var(--bs-gray-400);
                    right: -6px;
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                }
                &.active{
                    background: #eee;
                    &::after{
                        background: #eee;
                    }
                    &.now{
                        color: var(--bs-primary);
                        span{
                            color: var(--bs-primary);
                        }
                    }
                }
                &:nth-last-child(1){
                    &::before{
                        display: none;
                    }
                    &::after{
                        display: none;
                    }
                }
                &:nth-child(1){
                    padding: 10px 20px 10px 15px;
                }
            }
        }
        .reset-div{
            button{
                display: flex;
                align-items: center;
                span{
                    margin-right: 5px;
                }
            }
        }
    }
}

.edit-house-content{
    margin-top: 20px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,.1);
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    >div{
        display: flex;
        justify-self: start;
        gap: 20px;
        align-items: center;
        >label{
            font-size: 16px;
            width: 150px;
            text-align: right;
            color: var(--bs-gray);
        }
        >.radio-choose-div{
            display: flex;
            background: var(--bs-gray-200);
            border-radius: 5px;
            overflow: hidden;
            label{
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;
                &::before{
                    content: '';
                    position: absolute;
                    width: 6px;
                    height: 100%;
                    background: #fff;
                    right: -3px;
                    z-index: 1;
                }
                &::after{
                    content: 'or';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    right: -15px;
                    border-radius: 50%;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: var(--bs-gray-500);
                    z-index: 2;
                }
                &:nth-last-child(1){
                    &::before{
                        display: none;
                    }
                    &::after{
                        display: none;
                    }
                }
                input{
                    display: none;
                }
                span{
                    padding: 10px 30px;
                    white-space: nowrap;
                    transition: 0.3s ease-in-out;
                    cursor: pointer;
                }
                input:checked + span{
                    background: var(--bs-primary);
                    color: #fff;
                }
            }
        }
        select{
            color: var(--bs-gray);
            width: auto;
        }
    }
    .options-div{
        display: flex;
        justify-content: space-between;
        gap: 20px;
        button{
            display: flex;
            align-items: center;
            span{
                margin-left: 5px;
            }
        }
    }
}

</style>