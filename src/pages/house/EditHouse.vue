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
        <template v-if="stepStatus == 1">
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


        </template>
        <template v-if="stepStatus == 2">
            <div class="title">
                主要內容
            </div>
            <div class="box">
                <div class="input-group">
                    <label for="">屋苑或大廈名稱</label>
                    <input type="text">
                </div>
                <div class="flex-div">
                    <div class="input-group">
                        <label for="">屋苑或大廈樓齡</label>
                        <div class="input-group-inline">
                            <input type="number">
                            <label for="">年</label>
                            <input type="checkbox" name="houseAge" id="houseAge">
                            <label>新落成盤</label>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="">座數及單位 (公開顯示) </label>
                        <input type="number">
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group">
                        <label for="">街名及門牌</label>
                        <input type="text">
                    </div>
                    <div class="input-group">
                        <label for="">街名及門牌 英文</label>
                        <input type="text">
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="input-group">
                    <label for="">搜尋標籤選擇</label>
                    
                    <!-- 住宅 分類標籤 -->
                    <div class="input-group-inline group-list">
                        <label for="">住宅 分類標籤:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="houseTag" id="houseTag1"><label for="houseTag1">私人屋苑</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag2"><label for="houseTag2">居屋</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag3"><label for="houseTag3">村屋</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag4"><label for="houseTag4">獨立屋</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag5"><label for="houseTag5">公屋</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag6"><label for="houseTag6">洋樓</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag7"><label for="houseTag7">唐樓</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag8"><label for="houseTag8">分間單位</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag9"><label for="houseTag9">單幢式大廈</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag10"><label for="houseTag10">分組</label></span>
                            <span><input type="checkbox" name="houseTag" id="houseTag11"><label for="houseTag11">短租</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 特色 -->
                    <div class="input-group-inline group-list">
                        <label for="">特色:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="houseFeature" id="houseFeature1"><label for="houseFeature1">有景觀</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature2"><label for="houseFeature2">有裝修</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature3"><label for="houseFeature3">連電器</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature4"><label for="houseFeature4">連傢俬</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature5"><label for="houseFeature5">獨家盤</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature6"><label for="houseFeature6">可養貓狗</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature7"><label for="houseFeature7">連車位</label></span>
                            <span><input type="checkbox" name="houseFeature" id="houseFeature8"><label for="houseFeature8">單位特色</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 有景觀 -->
                    <div class="input-group-inline group-list">
                        <label for="">有景觀:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="view" id="view1"><label for="view1">望山景</label></span>
                            <span><input type="checkbox" name="view" id="view2"><label for="view2">望園景</label></span>
                            <span><input type="checkbox" name="view" id="view3"><label for="view3">望開揚景</label></span>
                            <span><input type="checkbox" name="view" id="view4"><label for="view4">望樓景</label></span>
                            <span><input type="checkbox" name="view" id="view5"><label for="view5">望市景</label></span>
                            <span><input type="checkbox" name="view" id="view6"><label for="view6">望海景</label></span>
                            <span><input type="checkbox" name="view" id="view7"><label for="view7">望河景</label></span>
                            <span><input type="checkbox" name="view" id="view8"><label for="view8">望池景</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 有裝修 -->
                    <div class="input-group-inline group-list">
                        <label for="">有裝修:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="decoration" id="decoration1"><label for="decoration1">基本裝修</label></span>
                            <span><input type="checkbox" name="decoration" id="decoration2"><label for="decoration2">雅緻裝修</label></span>
                            <span><input type="checkbox" name="decoration" id="decoration3"><label for="decoration3">豪華裝修</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 連電器 -->
                    <div class="input-group-inline group-list">
                        <label for="">連電器:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="appliances" id="appliance1"><label for="appliance1">包含全屋家電</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance2"><label for="appliance2">電視</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance3"><label for="appliance3">微波爐</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance4"><label for="appliance4">冷氣機</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance5"><label for="appliance5">洗衣機</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance6"><label for="appliance6">熱水爐</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance7"><label for="appliance7">雪櫃</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance8"><label for="appliance8">烘乾機</label></span>
                            <span><input type="checkbox" name="appliances" id="appliance9"><label for="appliance9">抽油煙機</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 連傢俬 -->
                    <div class="input-group-inline group-list">
                        <label for="">連傢俬:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="furniture" id="furniture1"><label for="furniture1">電視櫃</label></span>
                            <span><input type="checkbox" name="furniture" id="furniture2"><label for="furniture2">衣櫃</label></span>
                            <span><input type="checkbox" name="furniture" id="furniture3"><label for="furniture3">梳化</label></span>
                            <span><input type="checkbox" name="furniture" id="furniture4"><label for="furniture4">床</label></span>
                            <span><input type="checkbox" name="furniture" id="furniture5"><label for="furniture5">椅子</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 連電位 -->
                    <div class="input-group-inline group-list">
                        <label for="">連車位:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="unitFeature" id="unitFeature1"><label for="unitFeature1">室內車位</label></span>
                            <span><input type="checkbox" name="unitFeature" id="unitFeature2"><label for="unitFeature2">露天車位</label></span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <!-- 單位特色 -->
                    <div class="input-group-inline group-list">
                        <label for="">單位特色:</label>
                        <div class="flex-wrap">
                            <span><input type="checkbox" name="unitCharacteristic" id="unitCharacteristic1"><label for="unitCharacteristic1">閣樓</label></span>
                            <span><input type="checkbox" name="unitCharacteristic" id="unitCharacteristic2"><label for="unitCharacteristic2">平台</label></span>
                            <span><input type="checkbox" name="unitCharacteristic" id="unitCharacteristic3"><label for="unitCharacteristic3">天台</label></span>
                            <span><input type="checkbox" name="unitCharacteristic" id="unitCharacteristic4"><label for="unitCharacteristic4">後花園</label></span>
                            <span><input type="checkbox" name="unitCharacteristic" id="unitCharacteristic5"><label for="unitCharacteristic5">開放式廚房</label></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="flex-div">
                    <div class="input-group">
                        <label for="">出租價</label>
                        <div class="input-group-inline">
                            <input type="number">
                            <label for="">每月租金</label>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="">全年預繳折扣優惠</label>
                        <select name="" id=""></select>
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group">
                        <label for="">建築面積(平方呎)</label>
                        <input type="text">
                    </div>
                    <div class="input-group">
                        <label for="">實用面積(平方呎)</label>
                        <div class="input-group-inline">
                            <input type="text">
                            <input type="checkbox" name="" id="">
                            <label for="">面積資料未核實</label>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <label for="">起租日期</label>
                    <input type="date">
                </div>
                <div class="input-group">
                    <label for="">租金已包</label>
                    <div class="flex-wrap">
                        <span>
                            <input type="checkbox" name="" id="">
                            <label for="">差餉地租</label>
                        </span>
                        <span>
                            <input type="checkbox" name="" id="">
                            <label for="">管理費</label>
                        </span>
                        <span>
                            <input type="checkbox" name="" id="">
                            <label for="">煤氣</label>
                        </span>
                        <span>
                            <input type="checkbox" name="" id="">
                            <label for="">水電</label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="flex-div">
                    <div class="input-group">
                        <label for="">放盤標題</label>
                        <input type="text"> <small>0/40</small>
                    </div>
                    <div class="input-group">
                        <label for="">放盤標題 <small>英文</small></label>
                        <input type="text"> <small>0/100</small>
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group">
                        <label for="">單位介紹</label>
                        <input type="text"> <small>0/1000</small>
                    </div>
                    <div class="input-group">
                        <label for="">單位介紹 <small>英文</small></label>
                        <input type="text"> <small>0/2000</small>
                    </div>
                </div>
                <div class="input-group">
                    <label for="">座向(客廳)</label>
                    <div class="flex-wrap">
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">N/A</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">東</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">東南</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">南</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">西南</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">西</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">西北</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">北</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">東北</label>
                        </span>
                    </div>
                </div>
                <div class="input-group">
                    <label for="">單位樓層</label>
                    <div class="flex-wrap">
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">N/A</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">全幢</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">高層</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">中層</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">低層</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">地下</label>
                        </span>
                        <span>
                            <input type="radio" name="" id="">
                            <label for="">地庫</label>
                        </span>
                    </div>
                </div>
                <div class="input-group">
                    <label for="">房間及浴室</label>
                    <div class="input-group-inline">
                        <select name="" id="">
                            <option value="">--房間數量--</option>
                            <option value="">N/A</option>
                            <option value="">開放式間隔</option>
                            <option value="">1房</option>
                            <option value="">2房</option>
                            <option value="">3房</option>
                            <option value="">4房</option>
                            <option value="">5+房</option>
                        </select>
                        <select name="" id="">
                            <option value="">--浴室數量--</option>
                            <option value="">N/A</option>
                            <option value="">1浴室</option>
                            <option value="">2浴室</option>
                            <option value="">3浴室</option>
                            <option value="">4浴室</option>
                            <option value="">5+浴室</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="title">
                聯絡人
            </div>
            <div class="box">
                <div class="flex-div">
                    <div>聯絡人 #1</div>
                    <div style="text-align: right;">
                        <button class="btn btn-outline-primary">增加</button>
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group-inline title-value">
                        <input class="title-input" type="text" value="中文名" style="width: 100px;">
                        <input class="value-input" type="text">
                    </div>
                    <div class="input-group-inline title-value">
                        <input class="title-input" type="text" value="英文名" style="width: 100px;">
                        <input class="value-input" type="text">
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group-inline title-value">
                        <div class="title-input">
                            <span class="material-icons">
                            phone
                            </span>
                        </div>
                        <input class="value-input" type="text">
                        <select class="value-input" name="" id="">
                            <option value="">香港(+852)</option>
                        </select>
                    </div>
                    <div class="input-group-inline">
                        <div style="display: flex;height: 40px;align-items:center;">
                            <input type="checkbox" name="" id="">
                            <label for="">WhatsApp</label>
                        </div>
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group-inline title-value">
                        <div class="title-input">
                            <span class="material-icons">
                            phone
                            </span>
                        </div>
                        <input class="value-input" type="text">
                        <select class="value-input" name="" id="">
                            <option value="">香港(+852)</option>
                        </select>
                    </div>
                    <div class="input-group-inline">
                        <div style="display: flex;height: 40px;align-items:center;">
                            <input type="checkbox" name="" id="">
                            <label for="">WhatsApp</label>
                        </div>
                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group-inline title-value">
                        <div class="title-input">
                            <span class="material-icons">
                                question_answer
                            </span>
                        </div>
                        <input class="value-input" type="text">
                    </div>
                    <div>

                    </div>
                </div>
                <div class="flex-div">
                    <div class="input-group-inline">
                        <div style="display: flex;height: 40px;align-items:center;">
                            <input type="checkbox" name="" id="">
                            <label for="">隱藏我的電話，等買家留言</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title">
                圖片上傳
            </div>
            <div class="box">
                <div class="house-img-list">
                    <div class="house-img-item">
                        <div class="delete-btn">
                            <span class="material-icons">
                                delete
                            </span>
                        </div>
                        <img :src="getSampleImg(1)" alt="">
                    </div>
                    <div class="house-img-item">
                        <div class="delete-btn">
                            <span class="material-icons">
                                delete
                            </span>
                        </div>
                        <img :src="getSampleImg(2)" alt="">
                    </div>
                    <div class="add-house-img-btn">
                        <span class="material-icons">
                        add_photo_alternate
                        </span>
                        <span>圖片上傳</span>
                    </div>
                </div>
            </div>

        </template>
        <template v-if="stepStatus == 3">
            <div class="title">
                預覽
            </div>
            <div class="preview-box">
                <div class="sub-title">
                    <span class="material-icons">home</span>
                    樓盤編號 # 3018203 預覽
                </div>
                <div class="preview-div">
                    <div class="title">
                        香港仔 兆群大廈 [業主盤]<br>
                        低層 A室<br>
                        sadad
                    </div>
                    <div class="sub-title">
                        sadsa
                    </div>
                    <div class="content">
                        <div>
                            <span>住宅</span>
                            <span>私人屋苑</span>
                            <span>居屋</span>
                            <span>村屋</span>
                            <span class="active">全年預繳租金9折</span>
                        </div>
                        <div>
                            <span>7 個月前 刊登</span>
                            <span>瀏覽人次#0</span>
                        </div>
                        <div>
                            <span><span class="material-icons">check</span>有景觀</span>
                            <span><span class="material-icons">check</span>有裝修</span>
                            <span><span class="material-icons">check</span>連電器</span>
                            <span><span class="material-icons">check</span>連傢俬</span>
                            <span><span class="material-icons">check</span>獨家盤</span>
                            <span><span class="material-icons">check</span>可養貓狗</span>
                            <span><span class="material-icons">check</span>單位特色</span>
                            <span><span class="material-icons">check</span>望園景</span>
                            <span><span class="material-icons">check</span>望樓景</span>
                            <span><span class="material-icons">check</span>雅緻裝修</span>
                            <span><span class="material-icons">check</span>包全屋家電</span>
                            <span><span class="material-icons">check</span>衣櫃</span>
                            <span><span class="material-icons">check</span>茶几</span>
                            <span><span class="material-icons">check</span>連租約</span>
                            <span><span class="material-icons">check</span>連套房</span>
                            <span><span class="material-icons">check</span>有會所</span>
                        </div>
                    </div>
                </div>
                <div class="preview-table">
                    <table cellspacing="0" cellpadding="8">
                        <tr>
                            <td>電話 QRCode</td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>每月租金</td>
                            <td>
                                租 $60,000 元
                                <hr>
                                放盤人提供全年預繳租金優惠<br>
                                全年預繳租金: $648,000（已包含9折）<br>
                                共節省: $72,000
                                <hr>
                                已補地價，自由市場
                            </td>
                        </tr>
                        <tr>
                            <td>租金已包</td>
                            <td>差餉地租, 管理費 / 水電 / 煤氣</td>
                        </tr>
                        <tr>
                            <td>建築面積</td>
                            <td>
                                4,000 平方呎 
                                <hr>
                                呎租: @15
                            </td>
                        </tr>
                        <tr>
                            <td>實用面積</td>
                            <td>
                                4,000 平方呎 
                                <hr>
                                呎租: @15
                            </td>
                        </tr>
                        <tr>
                            <td>地區屋苑</td>
                            <td>
                                兆群大廈
                                <hr>
                                香港島 香港仔<br>
                                座數及單位: 灣仔大廈 低層 A 室<br>
                                屋苑樓齡: 31 年<br>
                                <a href="#">查看 灣仔大廈 屋苑成交價、圓則等資料</a>
                            </td>
                        </tr>
                        <tr>
                            <td>起租日期</td>
                            <td>可隨時起租</td>
                        </tr>
                        <tr>
                            <td>單位樓層</td>
                            <td>低層</td>
                        </tr>
                        <tr>
                            <td>房間及浴室</td>
                            <td>3 房 1 浴室</td>
                        </tr>
                        <tr>
                            <td>每月管理費</td>
                            <td>$111,111 元</td>
                        </tr>
                        <tr>
                            <td>小學校網</td>
                            <td>相關樓盤 18校網(南區)</td>
                        </tr>
                        <tr>
                            <td>中學校網</td>
                            <td>相關樓盤 南區(HK4)</td>
                        </tr>
                        <tr>
                            <td>物業地址</td>
                            <td>asdadsd</td>
                        </tr>
                    </table>
                </div>
                <div class="contact-person">
                    <div class="title">
                        放盤聯絡人
                    </div>
                    <div class="info">
                        <div>
                            <img src="" alt="" class="user-img">
                        </div>
                        <div>
                            <div class="title">huio ghjbhjk</div>
                            <div class="phone">
                                <div>
                                    <div>
                                        Tel: <span>852-76543xxx</span>
                                    </div>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary"> 
                                        <span class="material-icons">
                                            phone
                                        </span>
                                        致電
                                    </button>
                                </div>
                            </div>
                            <div class="phone">
                                <div>
                                    <div>
                                        Tel: <span>852-76543xxx</span>
                                    </div>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary"> 
                                        <span class="material-icons">
                                            phone
                                        </span>
                                        致電
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="message">
                        <button class="btn btn-sm btn-primary"> 
                            <span class="material-icons">
                                mail
                            </span>
                            發訊
                        </button>
                    </div>
                </div>
                
                <div class="box">
                    <div class="house-img-list">
                        <div class="house-img-item">
                            <div class="delete-btn">
                                <span class="material-icons">
                                    delete
                                </span>
                            </div>
                            <img :src="getSampleImg(1)" alt="">
                        </div>
                        <div class="house-img-item">
                            <div class="delete-btn">
                                <span class="material-icons">
                                    delete
                                </span>
                            </div>
                            <img :src="getSampleImg(2)" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </template>
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
                    background: #f6f6f6;
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
    .title{
        font-size: 20px;
        font-weight: bold;
        border-bottom: 2px solid var(--bs-gray-300);
    }
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
    .box{
        position: relative;
        width: 100%;
        padding: 15px;
        border: var(--bs-gray-400) 1px solid;
        background: var(--bs-gray-100); 
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 20px;
        .input-group{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;
        }
        >.flex-div{
            width: 100%;
        }
        input,
        select{
            width: 100%;
            background: #fff !important;
            border: var(--bs-gray-400) 1px solid !important;
        }
        input[type="checkbox"]{
            width: auto !important;
            margin-right: 5px;
        }
        input[type="radio"]{
            width: auto !important;
            margin-right: 5px;
        }

        .house-img-list{
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            >.house-img-item{
                position: relative;
                width: 150px;
                height: 150px;
                border: var(--bs-gray-400) 1px solid;
                border-radius: 5px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .delete-btn{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 30px;
                    height: 30px;
                    background: rgba(0,0,0,.5);
                    color: #fff;
                    border-radius: 0 5px 0 5px;
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                }
            }
            >.add-house-img-btn{
                position: relative;
                width: 150px;
                height: 150px;
                background: #ccc;
                border-radius: 5px;
                cursor: pointer;
                >span:nth-child(1){
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 60px;
                    color: #fff;
                }
                >span:nth-child(2){
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: #999;
                    text-align: center;
                    align-items: center;
                    color: #fff;
                }
            }
        }
    }

    .preview-box{
        position: relative;
        width: 100%;
        padding: 15px;
        border: 2px solid var(--bs-primary);
        display: flex;
        flex-direction: column;
        gap: 10px;
        >.sub-title{
            width: 100%;
            border-bottom: 1px solid var(--bs-gray-400);
            display: flex;
            align-items: center;
            gap: 5px;
        }
        >.preview-div{
            padding: 10px;
            border: 1px solid var(--bs-gray-400);
            border-radius: 5px;
            background: var(--bs-gray-100);
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            >.title{
                border: 0;
                font-size: 16px;
                font-weight: bold;
            }
            >.sub-title{
                border-bottom: 1px solid var(--bs-gray-400);
                font-size: 14px;
                font-weight: default;
            }
            >.content{
                display: flex;
                flex-direction: column;
                gap: 10px;
                >div{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    >span{
                        padding: 5px 10px;
                        border: 1px solid var(--bs-gray-400);
                        border-radius: 5px;
                        background: #fff;
                        color: var(--bs-gray);
                        font-size: 12px;
                        align-items: center;
                        display: flex;
                        gap: 5px;
                        &.active{
                            background: var(--bs-gray);
                            color: #fff;
                            border-color: var(--bs-gray);
                        }
                        >.material-icons{
                            font-size: 14px;
                            color: var(--bs-primary);
                        }
                    }
                }
            }
        }
        >.preview-table{
            width: 100%;
            border: 1px solid var(--bs-gray-400);
            // background: var(--bs-gray-100);
            // padding: 10px;
            border-radius: 5px;
            overflow: hidden;
            table{
                width: 100%;
                border-collapse: collapse;
                tr{
                    border-bottom: 1px solid var(--bs-gray-400);
                    &:nth-last-child(1){
                        border-bottom: 0;
                    }
                    td{
                        padding: 10px;
                        text-align: left;
                        &:nth-child(1){
                            background: var(--bs-gray-100);
                            border-right: 1px solid var(--bs-gray-400);
                        }
                    }
                }
            }
        }
        >.contact-person{
            width: 100%;
            border: 1px solid var(--bs-gray-400);
            border-radius: 5px;
            background: var(--bs-gray-100);
            padding: 10px;
            >.title{
                font-size: 16px;
                font-weight: bold;
            }
            >.info{
                display: flex;
                align-items: center;
                gap: 10px;
                >div{
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                    >img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        object-fit: cover;
                        background: var(--bs-gray-400);
                    }

                    &:nth-child(2){
                        flex-direction: column;
                        gap: 10px;
                        width: 100%;
                        >.title{
                            font-size: 14px;
                            font-weight: default;
                            border: 0;
                            color: var(--bs-gray)
                        }
                        >.phone{
                            display: flex;
                            gap: 10px;
                            justify-content: space-between;
                            >div{
                                display: flex;
                                gap: 5px;
                                align-items: center;
                                font-size: 14px;
                                >span{
                                    color: var(--bs-gray);
                                }
                                button{
                                    display: flex;
                                    align-items: center;
                                    padding: 5px;
                                    gap: 5px;
                                    >span{
                                        font-size: 14px;
                                    }
                                }

                            }
                        }
                    }
                }
            }
            >.message{
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                >span{
                    color: var(--bs-gray);
                }
                button{
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    gap: 5px;
                    >span{
                        font-size: 14px;
                    }
                }

            }
        }
    }
}

</style>