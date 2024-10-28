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


const imgUserUrl = (url) => {
  if(url.match('http')){
    return url;
  }else{
    return new URL(`/src/assets/images/user/${url}`, import.meta.url).href
  }
}

const tabIndex = ref(1);
const houseTypeTabIndex = ref(0);

const isHouseQABoxOpen = ref(false);

const houseQAHandler = (key) =>{
    isHouseQABoxOpen.value = true;
    console.log(key);
}

const getSampleImg = (key) => {
    return new URL(`/src/assets/images/sample/demo${key}.jpg`, import.meta.url).href
}

</script>

<template>
  <div class="content-page">
    <div class="house-div">
        <div class="filter-list-div">
            <div class="filter-div">
                <div>
                    放售中的樓盤
                </div>
                <div>
                    <select name="" id="" v-if="tabIndex==1">
                        <option value="">選擇樓盤</option>
                        <option value="all">所有樓盤 (2)</option>
                        <option value="y">有效樓盤 (0)</option>
                        <option value="n">無效/過期/隱藏中/審核中的樓盤 (2)</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇租賣</option>
                        <option value="all">不限</option>
                        <option value="sale">放賣</option>
                        <option value="rent">放租</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇等級</option>
                        <option value="all">不限</option>
                        <option value="">普通盤</option>
                        <option value="">置頂盤</option>
                        <option value="">黃金置頂盤</option>
                        <option value="">即走盤</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇區域</option>
                        <option value="all">不限</option>
                        <option value="">全港</option>
                        <option value="">香港島</option>
                        <option value="">九龍</option>
                        <option value="">新界</option>
                        <option value="">離島</option>
                        <option value="">海外</option>
                        <option value="">小學校網</option>
                        <option value="">中學校網</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇類別</option>
                        <option value="all">不限</option>
                        <option value="">住宅</option>
                        <option value="">車位</option>
                        <option value="">工商</option>
                        <option value="">店舖</option>
                        <option value="">土地</option>
                        <option value="">海外</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇面積</option>
                        <option value="all">實用面積</option>
                        <option value="">建築面積</option>
                    </select>
                    <select name="" id="">
                        <option value="">不限</option>
                        <option value="">自定</option>
                        <option value="">300呎以下</option>
                        <option value="">300-500呎</option>
                        <option value="">500-1000呎</option>
                        <option value="">1000-2000呎</option>
                        <option value="">2000呎以上</option>
                    </select>
                    <select name="" id="">
                        <option value="">房間數量</option>
                        <option value="all">不限</option>
                        <option value="">開放式間隔</option>
                        <option value="">1房</option>
                        <option value="">2房</option>
                        <option value="">3房</option>
                        <option value="">4房</option>
                        <option value="">5房 以上</option>
                    </select>
                </div>
                <div>
                    <div>
                        <input type="text">
                        <button class="btn btn-info">物件搜尋</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="house-list-div">
        <div class="house-item" v-for="(key) in 2">
            <div>
                <img :src="getSampleImg(key)" alt="">
            </div>
            <div>
                <div class="title">SDG</div>
                <div class="sub-title">小西灣 藍灣半島</div>
                <div class="building-area">
                    <div>建築面積: 8,888 呎</div><div>@4.5 元</div>
                </div>
                <div class="practical-area">
                    <div>建築面積: 8,888 呎</div><div>@4.5 元</div>
                </div>
                <div class="tag-and-price">
                    <div class="tag-list">
                        <span>已補地價，自由市場</span> 
                        <span>2 房 , 2 浴室</span>
                        <span>向西南 </span>
                        <span>業主盤 </span>
                        <span>私人屋苑 </span>
                        <span>居屋</span> 
                        <span>村屋 </span>
                        <span>基本裝修</span> 
                        <span>包全屋家電</span>
                        <span>電視 </span>
                        <span>全年預繳租金9折</span>
                    </div>
                    <div class="price">
                        <div>租 $40,000 元</div>
                    </div>
                </div>
                <div class="content">
                    <div class="title">樓盤物件管理 (AdsId#3019335 )</div>
                    <hr>
                    <div class="status-div">
                        <div>樓盤狀態: 樓盤等待付款中</div>
                        <div>刊登: 2024-04-23</div>
                        <div>更新: --</div>
                        <div>到期: --</div>
                        <div>Carry Kwok</div>
                    </div>
                    <div class="options-div">
                        <button class="btn btn-info btn-sm">更改資料</button>
                        <button class="btn btn-info">設為封盤</button>
                        <button class="btn btn-info">設為隱藏</button>
                        <button class="btn btn-info">設為已租</button>
                        <button class="btn btn-info">推盤(可推 0 次)</button>
                        <button class="btn btn-info">續期</button>
                        <button class="btn btn-info">複製樓盤</button>
                    </div>
                    <div class="sub-content">
                        <div class="title">自行記事本(不會公開)</div>
                        <hr>
                        <input type="text" disabled>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>


    .house-div{
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 0 5px rgba(0,0,0,.1);
        .filter-list-div{
            .filter-div{
                padding: 10px 20px;
                // display: flex;
                // 100%寬度 換行
                >div{
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    >label{
                        margin-right: 10px;
                    }
                    >button{
                        margin-left: 10px;
                    }
                    >select{
                        margin-right: 10px;
                        padding: 5px 10px;
                        font-size: 14px;
                    }
                    >div{
                        display: flex;
                        align-items: center;
                        >input{
                            width: 150px;
                            padding: 5px 10px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .house-list-div{
        margin-top: 20px;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 0 5px rgba(0,0,0,.1);
        padding: 10px 20px;
        >.house-item{
            position: relative;
            display: flex;
            justify-self: start;
            gap: 20px;
            width: 100%;
            margin-bottom: 40px;
            &::after{
                content: "";
                width: 100%;
                height: 2px;
                background: var(--bs-gray-200);
                position: absolute;
                bottom: -25px;
                left: 0;
            }
            &:nth-last-child(1){
                &::after{
                    display: none;
                }
            }
            >div:nth-child(1){
                width: 200px;
                >img{
                    margin-top: 10px;
                    width: 100%;
                    height: 200px;
                    background: var(--bs-light);
                }
            }
            >div:nth-child(2){
                width: calc(100% - 200px);
                >.title{
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--bs-dark);
                }
                >.sub-title{
                    margin-top: 10px;
                    font-size: 16px;
                    font-weight: 500;
                }
                >.building-area{
                    display: flex;
                    justify-content: start;
                    margin-top: 10px;
                    gap: 10px;
                    >div{
                        font-size: 14px;
                        color: var(--bs-gray);
                    }
                }
                >.practical-area{
                    display: flex;
                    justify-content: start;
                    margin-bottom: 10px;
                    gap: 10px;
                    >div{
                        font-size: 14px;
                        color: var(--bs-gray);
                    }
                }
                >.tag-and-price{
                    display: flex;
                    justify-content: start;
                    margin-bottom: 10px;
                    .tag-list{
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        >span{
                            padding: 5px 10px;
                            background: var(--bs-gray-200);
                            border-radius: 3px;
                            font-size: 12px;
                            font-weight: 500;
                            color: var(--bs-gray-700);
                        }
                    }
                    .price{
                        >div{
                            padding: 5px 10px;
                            background: var(--bs-info);
                            border-radius: 3px;
                            font-size: 14px;
                            font-weight: 500;
                            color: var(--bs-light);
                            white-space: nowrap;
                        }
                    }
                }
                >.content{
                    background: #fff;
                    border-radius: 3px;
                    box-shadow: 0 0 5px rgba(0,0,0,.5);
                    padding: 10px;
                    border-top: 2px solid var(--bs-info);
                    >.title{
                        font-size: 16px;
                        font-weight: 700;
                        color: var(--bs-dark);
                    }
                    >hr{
                        margin: 10px 0;
                        border: 0;
                        border-top: 1px solid var(--bs-gray-200);
                    }
                    >.status-div{
                        display: flex;
                        justify-content: start;
                        gap: 20px;
                        margin-bottom: 10px;
                        >div{
                            position: relative;
                            font-size: 14px;
                            color: var(--bs-gray);
                            &::after{
                                content: "";
                                position: absolute;
                                z-index: 1;
                                right: -12px;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 2px;
                                height: 80%;
                                background: var(--bs-gray-300);
                            }
                            &:nth-last-child(1){
                                &::after{
                                    display: none;
                                }
                            }
                        }
                    }
                    >.options-div{
                        display: flex;
                        justify-content: start;
                        gap: 10px;
                        margin-bottom: 10px;
                        >button{
                            padding: 5px 10px;
                            background: var(--bs-info);
                            border-radius: 3px;
                            border: 0;
                            font-size: 14px;
                            font-weight: 500;
                            color: var(--bs-light);
                        }
                    }
                    >.sub-content{
                        margin-top: 10px;
                        >.title{
                            font-size: 14px;
                            font-weight: 700;
                            color: var(--bs-dark);
                        }
                        >hr{
                            margin: 10px 0;
                            border: 0;
                            border-top: 1px solid var(--bs-gray-200);
                        }
                        >input{
                            width: 100%;
                            padding: 5px 10px;
                            font-size: 14px;
                            color: var(--bs-gray);
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 1200px) {

        .house-div{
            .filter-list-div{
                .filter-div{
                    padding: 10px 20px;
                    display: block;
                    >div{
                        margin-bottom: 10px;
                        display: block;
                        >label{
                            margin-right: 0;
                            margin-bottom: 10px;
                        }
                        >button{
                            margin-left: 10px;
                            margin-bottom: 10px;
                        }
                        >select{
                            margin-bottom: 10px;
                        }
                        >div{
                            display: flex;
                            align-items: center;
                            >input{
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
        
    }

</style>