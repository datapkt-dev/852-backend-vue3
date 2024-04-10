<script setup>
import { ref, watch, computed } from 'vue'
import {useRouter,useRoute } from 'vue-router';
import "@/assets/css/content.scss";

import StatusDiv from '@/pages/home/statusDiv.vue'

import HouseTypeArray from '@/assets/json/houseTypeArray.json'
import HouseViewArray from '@/assets/json/houseViewArray.json'
import HouseQuipmentArray from '@/assets/json/houseQuipmentArray.json'
import HouseFacilityArray from '@/assets/json/houseFacilityArray.json'
import HouseRentIncludesArray from '@/assets/json/houseRentIncludesArray.json'
import HouseIdentityArray from '@/assets/json/houseIdentityArray.json'


import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter();
const route = useRoute();

const pageType = computed(() => {
  return route.params.pageType;
})

console.log(pageType.value);

const imgUserUrl = (url) => {
  if(url.match('http')){
    return url;
  }else{
    return new URL(`/src/assets/images/user/${url}`, import.meta.url).href
  }
}

const houseTypeIndex = ref(0);
const houseTypeChildrenIndex = ref(0);
const houseViewIndex = ref(0);
const houseQuipmentIndex = ref(0);
const houseFacilityIndex = ref(0);

watch(houseTypeIndex, (val) => {
  houseTypeChildrenIndex.value = 0;
})

</script>

<template>
  <div class="content-page">
    <div class="box" v-if="pageType.match(/add-sale|add-rent/)">
        <div class="box-top" v-if="pageType.match(/add-rent|edit-rent/)">
            {{ pageType.match(/add-rent/) ?'刊登租盤廣告':'編輯租盤廣告' }}
            <span>
                （<small class="text-danger">*</small> 為必填項）
            </span>
        </div>
        <div class="box-top" v-if="pageType.match(/add-sale|edit-sale/)">
            {{ pageType.match(/add-sale/) ?'刊登售盤廣告':'編輯售盤廣告' }}
            <span>
                （<small class="text-danger">*</small> 為必填項）
            </span>
        </div>
        <StatusDiv :statusId="'1'"/>
    </div>
    <div class="box">
        <div class="box-top">
            物業資料
        </div>
        <div class="form-div">
            <div>
                <label for=""><small class="text-danger">*</small> 物業用途</label>
                <div>
                    <div class="radio-group">
                        <label v-for="(item,index) in HouseTypeArray" :key="index" class="radio-label">
                            <input type="radio" :id="'houseTypeRadio-'+index" :checked="houseTypeIndex==index" @click="houseTypeIndex=index">
                            <span></span>
                            <label :for="'houseTypeRadio-'+index">{{item.name}}</label>
                        </label>
                    </div>
                    <div class="radio-group" v-if="HouseTypeArray[houseTypeIndex].children">
                        <label v-for="(item,index) in HouseTypeArray[houseTypeIndex].children" :key="index" class="radio-label">
                            <input type="radio" :id="'houseTypeChildrenRadio-'+index" :checked="houseTypeChildrenIndex==index" @click="houseTypeChildrenIndex=index">
                            <span></span>
                            <label :for="'houseTypeChildrenRadio-'+index">{{item.name}}</label>
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <label for=""><small class="text-danger">*</small> 屋苑/樓盤</label>
                <div>
                    <div class="input-group">
                        <div class="text-input">
                            <input type="text" placeholder="請輸入屋苑關鍵字">
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label for="">樓齡 </label>
                <div>
                    <div class="input-group">
                        <div class="text-input word-0-1">
                            <input type="number">
                            <span>年</span>
                        </div>
                        <div class="text-gray">
                            輸入樓齡，更好地獲得曝光（不足一年可填寫一年）
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label for=""><small class="text-danger">*</small> 單位資料</label>
                <div>
                    <div class="input-group">
                        <div class="text-input word-0-1">
                            <input type="number">
                            <span>房</span>
                        </div>
                        <div class="text-input word-0-1">
                            <input type="number">
                            <span>廳</span>
                        </div>
                        <div class="">
                            <input type="checkbox">
                            <span>開放式</span>
                        </div>
                        <div class="text-input word-1-1">
                            <input type="number">
                            <span>實用</span>
                            <span>平方呎</span>
                        </div>
                        <div class="text-input word-1-1">
                            <input type="number">
                            <span>建築</span>
                            <span>平方呎</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label for="" v-if="pageType.match(/add-rent|edit-rent/)">出租樓層</label>
                <label for="" v-if="pageType.match(/add-sale|edit-sale/)">出售樓層</label>
                <div>
                    <div class="input-group">
                        <select id="seleceFloor" autocomplete="off" style="width: 130px;"><option value="0" selected="selected">選擇樓層範圍</option> <option value="1002">高層</option> <option value="1003">中層</option> <option value="1004">低層</option> <option value="1005">頂樓加建</option> <option value="1001">地下</option> <option value="1006">整栋</option> <option value="9000">輸入具體樓層</option></select>
                    </div>
                </div>
            </div>

            <div>
                <label for="">總樓層 </label>
                <div>
                    <div class="input-group">
                        <div class="text-input word-1-1">
                            <input type="number">
                            <span>共</span>
                            <span>層</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label for="">補充資料</label>
                <div>
                    <div class="input-group">
                        <select name="position" style="width: 130px;"><option value="0">選擇坐向</option> <option value="1">東</option> <option value="2">東北</option> <option value="3">北</option> <option value="4">西北</option> <option value="5">西</option> <option value="6">西南</option> <option value="7" selected="selected">南</option> <option value="8">東南</option> <option value="99">不明</option></select>
                        <select name="design" style="width: 130px;"><option value="">選擇裝修程度</option> <option value="1">未裝修</option> <option value="3">簡易裝修</option> <option value="4" selected="selected">雅緻裝修</option> <option value="5">豪華裝修</option></select>
                    </div>
                </div>
            </div>

            
            <div>
                <label for="">景觀</label>
                <div>
                    <div class="checkbox-group">
                        <label v-for="(item,index) in HouseViewArray" :key="index" class="checkbox-label">
                            <input type="checkbox" :id="'houseViewCheckbox-'+index">
                            <span></span>
                            <label :for="'houseViewCheckbox-'+index">{{item.name}}</label>
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label for="">提供設備</label>
                <div>
                    <div class="checkbox-group">
                        <label v-for="(item,index) in HouseQuipmentArray" :key="index" class="checkbox-label">
                            <input type="checkbox" :id="'houseQuipmentCheckbox-'+index">
                            <span></span>
                            <label :for="'houseQuipmentCheckbox-'+index">{{item.name}}</label>
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label for="">屋苑設施</label>
                <div>
                    <div class="checkbox-group">
                        <label v-for="(item,index) in HouseFacilityArray" :key="index" class="checkbox-label">
                            <input type="checkbox" :id="'houseFacilityCheckbox-'+index">
                            <span></span>
                            <label :for="'houseFacilityCheckbox-'+index">{{item.name}}</label>
                        </label>
                    </div>
                </div>
            </div>
            <div v-if="pageType.match(/add-sale|edit-sale/)">
                <label for=""> <small class="text-danger">*</small> 售價 </label>
                <div>
                    <div class="input-group">
                        <div class="text-input word-0-1">
                            <input type="number" class="rent">
                            <span>萬元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="pageType.match(/add-sale|edit-sale/)">
                <label for="">可否議價</label>
                <div>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" :id="'houseIsBargainCheckbox-'+index">
                            <span></span>
                            <label :for="'houseRentIncludesCheckbox-'+index">不支持議價</label>
                        </label>
                    </div>
                </div>
            </div>
            <div v-if="pageType.match(/add-sale|edit-sale/)">
                <label for=""> 管理費 </label>
                <div>
                    <div class="input-group">
                        <div class="text-input word-0-1">
                            <input type="number" class="rent">
                            <span>元/月</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="box" v-if="pageType.match(/add-rent|edit-rent/)">
        <div class="box-top">
            租賃信息
        </div>
        <div class="form-div">
            

            <div>
                <label for=""> <small class="text-danger">*</small> 租金 </label>
                <div>
                    <div class="input-group">
                        <div class="text-input word-0-1">
                            <input type="number" class="rent">
                            <span>元/月</span>
                        </div>
                        <select id="deposit_s" name="deposit_s" style="width: 200px; padding-left: 50px;"><option value="99">面議</option> <option value="1">一個月租金</option> <option value="2" selected="selected">二個月租金</option> <option value="3">三個月租金</option> <option value="98">其他</option></select>
                    </div>
                </div>
            </div>
            <div>
                <label for="">租金包含</label>
                <div>
                    <div class="checkbox-group">
                        <label v-for="(item,index) in HouseRentIncludesArray" :key="index" class="checkbox-label">
                            <input type="checkbox" :id="'houseRentIncludesCheckbox-'+index">
                            <span></span>
                            <label :for="'houseRentIncludesCheckbox-'+index">{{item.name}}</label>
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label for="">可否議價</label>
                <div>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" :id="'houseIsBargainCheckbox-'+index">
                            <span></span>
                            <label :for="'houseRentIncludesCheckbox-'+index">不支持議價</label>
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label for=""> 其他說明 </label>
                <div>
                    <div class="input-group">
                        <select name="cook" style="width: 200px;"><option value="1" selected="selected">可明火煮食</option> <option value="2">不可明火煮食</option></select>
                        <select name="pet" style="width: 200px;"><option value="1" selected="selected">可飼養寵物</option> <option value="2">不可飼養寵物</option></select>
                        <select name="sublet" style="width: 200px;"><option value="1">可分租</option> <option value="2" selected="selected">不可分租</option></select>
                    </div>
                </div>
            </div>
            <div>
                <label for=""> <small class="text-danger">*</small> 廣告標題 </label>
                <div>
                    <div class="input-group">
                        <input type="text" placeholder="如：中環優質寫字樓，實施完善，價平質優">
                        <input type="text" placeholder="E.g: high-quality community, luxurious decoration, preferential price">
                    </div>
                    <div class="text-info px-1">
                        請填寫標題，刊登完成後網站或APP只會顯示前20位數字、字母、漢字和一些常用標點符號。
                    </div>
                </div>
            </div>
            <div>
                <label for="">屋況說明	</label>
                <div>
                    <div class="input-group">
                        <textarea name="" id="" rows="10" placeholder=""></textarea>
                        <textarea name="" id="" rows="10" placeholder=""></textarea>
                    </div>
                </div>
            </div>
            <div>
                <label for="">相片</label>
                <div>
                    <div class="input-group">
                        <input type="file" name="" id="">
                    </div>
                </div>
            </div>
            <div>
                <label for="">VR睇樓	</label>
                <div>
                    <div class="input-group">
                        <input type="text" name="" id="">
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div class="box">
        <div class="box-top">
            聯絡資料
        </div>
        <div class="form-div">
            

            
            <div>
                <label for=""> <small class="text-danger">*</small> 身份</label>
                <div>
                    <div class="checkbox-group">
                        <label v-for="(item,index) in HouseIdentityArray" :key="index" class="checkbox-label">
                            <input type="checkbox" :id="'houseIdentityCheckbox-'+index">
                            <span></span>
                            <label :for="'houseIdentityCheckbox-'+index">{{item.name}}</label>
                        </label>
                    </div>
                </div>
            </div>
            <!-- <div>
                <label for="">聯絡人</label>
                <div>
                    <div class="input-group">
                        <input type="text" name="" id="">
                    </div>
                </div>
            </div> -->


        </div>
    </div>
    <div class="box">
        <div class="box-top">
            房屋問答
        </div>
        <div class="form-div">
            

            
            <div class="qa-item">
                <img src="@/assets/images/user/01.webp" alt="">
                <div>
                    <div>
                        <span>No.123456</span>
                        <span>2024-01-01</span>
                    </div>
                    <div>
                        電費怎麼算?
                        <button class="btn btn-sm">
                            <span class="material-icons-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                    <div>
                        <span>回覆：</span>
                        <span>

                        </span>
                    </div>
                    <div>
                        <textarea name="" id="" rows="10" maxlength="500"></textarea>
                    </div>
                    <div>
                        0/500
                        <button class="btn btn-primary">提交回覆</button>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div class="box text-right">
        <button class="btn btn-primary" @click="router.push('/home/add-rent/publication-plan')">下一步</button>
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



    .rent{
        width: 200px !important;
    }


    .qa-item{
        display: flex;
        margin-bottom: 20px;
        align-items: self-start;
        >img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 20px;
            background: var(--bs-gray-400);
        }
        >div{
            flex: 1;
            >div{
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            >div:nth-child(1){
                display: flex;
                justify-content: start;
                margin-bottom: 10px;
                >span{
                    font-size: 14px;
                    color: #999;
                    &:first-child{
                        margin-right: 10px;
                        color: var(--bs-primary);
                    }
                }
            }
            >div:nth-child(2){
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
                >button{
                    margin-left: 10px;
                }
            }
            >div:nth-child(3){
                background: #F6F6F6;
                justify-self: start;
                font-size: 16px;
                padding: 10px;
                margin-bottom: 10px;
            }
            >div:nth-child(4){
                margin-bottom: 10px;
                >textarea{
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
            }
            >div:nth-child(5){
                display: flex;
                justify-content: space-between;
                >button{
                    padding: 5px 20px;
                }
            }
        }
    }


    @media (max-width: 1200px) {
        .box{
            padding:    10px;
        }
    }

</style>