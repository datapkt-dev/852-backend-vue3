<script setup>
import { ref, watch, computed } from 'vue'
import {useRouter,useRoute } from 'vue-router';
import "@/assets/css/content.scss";

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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



</script>

<template>
  <div class="content-page">
    <div class="home-top">
        <div>
            <div class="edit-btn">
                <span class="material-icons-outlined">
                edit_note
                </span>
                <span>修改</span>
            </div>
            <div>
                <div class="user-img">
                    <span class="material-icons">
                    account_circle
                    </span>
                </div>
                <div>
                    <div>
                        <label>電話：</label>
                        <div>61761797</div>
                    </div>
                    <div>
                        <label>牌照：</label>
                        <div></div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label>地產代理</label>
                    <div></div>
                </div>
                <div>
                    <label>公司牌照</label>
                    <div></div>
                </div>
                <div>
                    <label>地址</label>
                    <div></div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div>賬戶餘額</div>
                <div>0</div>
                <button class="btn btn-primary">
                    購買
                </button>
                <a>上傳收據</a>
            </div>
            <div>
                <div>競價點</div>
                <div>0</div>
                <button class="btn btn-primary">
                    購買
                </button>
                <a>消費詳情</a>
            </div>
            <div>
                <div>租盤方案</div>
                <div>0</div>
                <button class="btn btn-outline-primary">
                    購買
                </button>
            </div>
            <div>
                <div>售盤方案</div>
                <div>0</div>
                <button class="btn btn-outline-primary">
                    購買
                </button>
                <a>尊尚組合方案</a>
            </div>
        </div>
    </div>
    <div class="house-div">
        <div class="house-tab-div">
            <div>
                <div class="tab" :class="tabIndex==0?'active':''" @click="tabIndex = 0">刊登中的樓盤</div>
                <div class="tab" :class="tabIndex==1?'active':''" @click="tabIndex = 1">關閉中的樓盤</div>
            </div>
            <div>
                <button class="btn btn-info">租盤</button>
                <button class="btn btn-outline-info">售盤</button>
            </div>
        </div>
        <div class="filter-list-div">
            <div class="filter-div">
                <div>
                    <label for="checkbox" v-if="tabIndex==1">
                        <input type="checkbox" name="" id="checkbox">
                        全選
                    </label>
                    <button class="btn btn-outline-info" v-if="tabIndex==1">批量刪除</button>
                </div>
                <div>
                    <select name="" id="" v-if="tabIndex==1">
                        <option value="">選擇狀態</option>
                    </select>
                    <select name="" id="">
                        <option value="">物業用途</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇屋苑</option>
                    </select>
                    <select name="" id="">
                        <option value="">選擇間隔</option>
                    </select>
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
            <div class="sysid-div">房源編號：R1132552</div>
            <div>
                <div class="house-img">
                    <img src="" alt="">
                </div>
                <div>
                    <div>
                        汝州街123號
                        <span>[屋苑]</span>
                        <div>未開啟</div>
                    </div>
                    <div>1房1廳中層近上水站園景設備齊全可飼養寵</div>
                    <div>中層/共12層 1房1廳 23呎(實)</div>
                    <div>0人瀏覽</div>
                </div>
                <div>
                    <div><span>10,000</span> 元/月</div>
                    <div>2024-03-07 錄入</div>
                    <div>
                        <!-- <button class="btn btn-info">分享</button> -->
                        <button class="btn btn-info" @click="key==1?router.push('/home/edit-rent'):router.push('/home/edit-sale')">修改</button>
                        <!-- <button class="btn btn-info">複製</button> -->
                    </div>
                </div>
                <div></div>
                <div>
                    <button class="btn btn-block btn-primary mb-1">開啟</button>
                    <button class="btn btn-block btn-outline-danger">刪除</button>
                </div>
            </div>

        </div>
    </div>
    <div v-if="tabIndex==0" class="mt-15 text-center">
        <button class="btn btn-primary mx-1" @click="router.push('/home/add-rent')">刊登租盤廣告</button>
        <button class="btn btn-primary mx-1" @click="router.push('/home/add-sale')">刊登售盤廣告</button>
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
            display: flex;
            align-items: center;
            background: #fff;
            padding: 10px;
            border-radius: 3px;
            margin: 0 10px;
            box-shadow: 0 0 5px rgba(0,0,0,.1);
            &:nth-child(1){
                width: 40%;
                display: block;
                padding: 20px;
                >.edit-btn{
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    padding: 5px 10px;
                    color: #999;
                    cursor: pointer;
                    >span{
                        vertical-align: middle;
                    }
                }
                >div:nth-child(2){
                    width: 100%;
                    display: flex;
                    justify-content: start;
                    >div:nth-child(1).user-img{
                        width: 60px;
                        height: 60px;
                        background: #999;
                        border-radius: 50%;
                        margin-right: 20px;
                        >span{
                            font-size: 60px;
                            color: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    >div:nth-child(2){
                        display: block;
                        >div{
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;
                            >label{
                                width: 80px;
                                font-size: 16px;
                                color: #999;
                            }
                            >div{
                                font-size: 16px;
                                color: #999;
                            }
                        
                        }
                    }
                }
                >div:nth-child(3){
                    margin-top: 10px;
                    border-top: 1px solid #eee;
                    padding: 20px 0 0 0;
                    display: block;
                    >div{
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        >label{
                            width: 80px;
                            font-size: 16px;
                            color: #999;
                        }
                        >div{
                            font-size: 16px;
                            color: #999;
                        }
                    
                    }
                }
            }
            &:nth-child(2){
                width: 60%;
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
                padding: 20px 0;
                >div{
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    margin: 5px;
                    >div{
                        font-size: 16px;
                        margin-bottom: 10px;
                        &:nth-child(2){
                            font-size: 20px;
                            font-weight: 700;
                        }
                    }
                    >button{
                        margin: 10px 0;
                        width: auto;
                        min-width: 120px;
                    }
                    >a{
                        color: var(--bs-primary);
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .house-div{
        margin-top: 20px;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 0 5px rgba(0,0,0,.1);
        .house-tab-div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #F6F6F6;
            >div{
                display: flex;
                >div{
                    cursor: pointer;
                    padding: 10px;
                    min-width: 200px;
                    text-align: center;
                    font-size: 16px;
                    color: #999;
                    &.tab{
                        font-weight: 700;
                        color: #333;
                        &:hover{
                            background: #eee;
                        }
                        &.active{
                            background: #fff;
                            border-top: 2px solid var(--bs-primary);
                            color: var(--bs-primary);
                        }
                        
                    }
                }
            }
            >div{
                display: flex;
                margin-right: 10px;
            }
        }
        .filter-list-div{
            .filter-div{
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;
                >div{
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
        .house-item{
            margin-bottom: 15px;
            width: 100%;
            background: #fff;
            border-radius: 3px;
            box-shadow: 0 0 5px rgba(0,0,0,.1);
            >div{
                padding: 20px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                &:nth-child(1){
                    padding: 20px 20px 0 20px;
                }
                >div{
                    &.house-img{
                        width: 20%;
                        min-height: 120px;
                        background: #999;
                        img{
                            width: 100%;
                        }
                    }
                    &:nth-child(2){
                        width: 30%;
                        padding: 0 15px;
                        >div{
                            margin-bottom: 10px;
                            &:nth-child(1){
                                display: flex;
                                align-items: center;
                                font-size: 16px;
                                font-weight: 700;
                                color: #333;
                                >span{
                                    font-size: 12px;
                                    margin-left: 5px;
                                }
                                >div{
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                            &:nth-child(2){
                                font-size: 14px;
                                color: #333;
                            }
                            &:nth-child(3){
                                font-size: 14px;
                                color: #333;
                            }
                            &:nth-child(4){
                                font-size: 14px;
                                color: #999;
                            }
                        }
                    }
                    &:nth-child(3){
                        width: 30%;
                        padding: 0 15px;
                        text-align: right;
                        align-self: end;
                        >div{
                            margin-bottom: 10px;
                            &:nth-child(1){
                                font-size: 14px;
                                >span{
                                    color: var(--bs-primary);
                                    font-size: 20px;
                                    margin-left: 5px;
                                    font-weight: 700;
                                }
                            }
                            &:nth-child(2){
                                font-size: 14px;
                                color: #999;
                            }
                            &:nth-child(3){
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                    }
                    &:nth-child(4){
                        width: 1px;
                        background: #eee;
                        margin: 0 30px;
                    }
                    &:nth-child(5){
                        width: 20%;
                        align-self: center;
                        
                    }
                }
            }
        }
    }

    @media (max-width: 1200px) {
        .home-top{
            display: flex;
            flex-direction: column;
            margin: 0;
            >div{
                &:nth-child(1),
                &:nth-child(2){
                    margin: 0;
                    width: 100%;
                    margin-bottom: 20px;
                }

                &:nth-child(2){
                    
                    >div{
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        margin: 5px;
                        >button{
                            margin: 10px 0;
                            width: auto;
                            min-width: auto;
                        }
                    }
                }
            }
        }

        .house-div{
            .house-tab-div{
                display: block;
                >div{
                    display: flex;
                    margin: 0;
                    >div{
                        width: 100%;
                    }
                }
                >div:nth-child(2){
                    display: flex;
                    justify-content: end;
                    background: #fff;
                    padding:  10px 10px 0 10px;
                }
            }
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
        .house-list-div{
            .house-item{
                >div{
                    width: 100%;
                    display: block;
                    >div{
                        &.house-img{
                            width: 100%;
                            min-height: 120px;
                        }
                        &:nth-child(2){
                            width: 100%;
                            padding: 0;
                        }
                        &:nth-child(3){
                            width: 100%;
                            padding: 0;
                            text-align: right;
                            >div{
                                margin-bottom: 10px;
                                &:nth-child(3){
                                    justify-content: start;
                                    >button{
                                        width: 100%;
                                    }
                                }
                            }
                        }
                        &:nth-child(4){
                            display: none;
                        }
                        &:nth-child(5){
                            width: 100%;
                            align-self: center;
                            
                        }
                    }
                }
            }
        }
        
    }

</style>