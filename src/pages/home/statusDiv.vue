<script setup>
import { ref } from 'vue'

const props = defineProps({
    statusId: {
        type: String,
        default: '1'
    }
})

console.log(props.statusId);

</script>

<template>
    <div class="status-div">
        <div :class="props.statusId.match(/1/)?'active':''">
            <div>1</div>
            <div>填寫資料</div>
        </div>
        <div :class="props.statusId.match(/2/)?'active':''">
            <div>2</div>
            <div>確認刊登方案</div>
        </div>
        <div :class="props.statusId.match(/3/)?'active':''">
            <div>3</div>
            <div>繳費</div>
        </div>
        <div :class="props.statusId.match(/4/)?'active':''">
            <div>4</div>
            <div>完成刊登</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>


    .status-div{
        display: flex;
        justify-content: space-between;
        >div {
            position: relative;
            display: flex;
            align-items: center;
            background: var(--badge-primary-bg);
            width: calc(25% - 15px);
            padding: 10px 20px 10px 30px;
            height: 60px;
            &::after {
                content: '';
                position: absolute;
                right: -40px;
                top: 0;
                border-right: 20px solid transparent;
                border-left: 20px solid var(--badge-primary-bg);
                border-top: 30px solid transparent;
                border-bottom: 30px solid transparent;
            }
            &:nth-last-child(1)::after {
                display: none;
            }

            
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                border-right: 20px solid transparent;
                border-left: 20px solid #fff;
                border-top: 30px solid transparent;
                border-bottom: 30px solid transparent;
            }
            &:nth-child(1)::before {
                display: none;
            }

            >div:nth-child(1) {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: var(--bs-primary);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                color: #fff;
            }

            >div:nth-child(2){
                margin-left: 10px;

                font-size: 18px;
                font-weight: bold;
            }
        }
        >div.active {
            background: var(--bs-primary);

            &::after {
                border-left: 20px solid var(--bs-primary);
            }

            >div:nth-child(1) {
                background-color: var(--badge-primary-bg);
                color:var(--bs-primary);
            }
            >div:nth-child(2){
                color: #fff;
            }

        }
    }





    @media (max-width: 1200px) {
        .status-div{
            display: block;
            >div {
                padding: 10px;
                width: 100%;
                font-size: 16px;
                margin-bottom: 15px;
                height: auto;
                &::after {
                    display: none;
                }
                &::before {
                    display: none;
                }
                >div:nth-child(1) {
                    width: 20px;
                    height: 20px;
                    font-size: 14px;
                }
            }
        }
    }

</style>