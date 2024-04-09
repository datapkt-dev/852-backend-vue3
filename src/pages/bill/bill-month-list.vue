<script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import "@/assets/css/content.scss";

const router = useRouter();
const route = useRoute();

const isAddEditTenantWindowOpen = ref(false);
const addEditTenantWindowType = ref("add");

const address = ref("");
const category = ref("");
const country = ref("");
const rentStart = ref(null);
const rentEnd = ref(null);
const addressOptions = [
  {
    value: "0",
    label: "OO市",
  },
  {
    value: "1",
    label: "XX市",
  },
];
const categoryOptions = [
  {
    value: "0",
    label: "套房",
  },
  {
    value: "1",
    label: "雅房",
  },
  {
    value: "2",
    label: "整層住家",
  },
  {
    value: "3",
    label: "店面",
  },
];
const countryOptions = [
  {
    value: "TW",
    label: "台灣",
  },
  {
    value: "JP",
    label: "日本",
  },
  {
    value: "US",
    label: "美國",
  },
  {
    value: "VN",
    label: "越南",
  },
];

const getAddressLabel = () => {
  let label = "";
  addressOptions.forEach((item) => {
    if (item.value === address.value) {
      label = item.label;
    }
  });
  return label;
};

const getCategoryLabel = () => {
  let label = "";
  categoryOptions.forEach((item) => {
    if (item.value === category.value) {
      label = item.label;
    }
  });
  return label;
};

const getCountryLabel = () => {
  let label = "";
  countryOptions.forEach((item) => {
    if (item.value === country.value) {
      label = item.label;
    }
  });
  return label;
};

const dataTable = ref(null);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
});

serverOptions.value.rowsPerPage = 10;

const imgUserUrl = (url) => {
  if (url.match("http")) {
    return url;
  } else {
    return new URL(`/src/assets/images/user/${url}`, import.meta.url).href;
  }
};

const tableHeaders = ref([
  { text: "#", value: "id", width: 30 },
  { text: "帳務期數", value: "sid" },
  { text: "該期金額", value: "total" },
  { text: "收款進度", value: "progress" },
  
  { text: "狀態", value: "status" },
  // { text: "該期金額", value: "rent" },
  // { text: "", value: "photo", width: 60 },
  // { text: "房客", value: "name", width: 200 },
  // { text: "電費", value: "electricity" },
  // { text: "水", value: "water" },
  { text: "", value: "options", width: 120 },
]);
const tableItems = ref([
  {
    id: 1,
    options: ["view"],
    sid: "2024年3月",
    month: 3,
    total: 120000,
    progress: 40,
    status: "running",
  },
  {
    id: 2,
    options: ["view"],
    sid: "2024年2月",
    month: 2,
    total: 150000,
    progress: 90,
    status: "running",
  },
  {
    id: 3,
    options: ["view"],
    sid: "2024年1月",
    month: 1,
    total: 130000,
    progress: 100,
    status: "finish",
  },
]);
const serverItemsLength = ref(30);
const tableLoading = ref(false);

const currentPageFirstIndex = computed(
  () => dataTable.value?.currentPageFirstIndex
);
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const isFirstPage = computed(() => dataTable.value?.isFirstPage);
const isLastPage = computed(() => dataTable.value?.isLastPage);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const currentPaginationNumber = computed(
  () => dataTable.value?.currentPaginationNumber
);
const rowsPerPageOptions = computed(() => dataTable.value?.rowsPerPageOptions);
const rowsPerPageActiveOption = computed(
  () => dataTable.value?.rowsPerPageActiveOption
);

const nextPage = () => {
  dataTable.value.nextPage();
};
const prevPage = () => {
  dataTable.value.prevPage();
};

watch(
  serverOptions,
  (value) => {
    // initProjectList(value);
  },
  { deep: true }
);

const editTenant = (row) => {
  isAddEditTenantWindowOpen.value = true;
  addEditTenantWindowType.value = "edit";
};

const isSendEmailWindowOpen = ref(false);
const sendEmailInfo = ref({
  email: "",

});

const openSendEmail = (row) => {
  isSendEmailWindowOpen.value = true;
  sendEmailInfo.value.email = row.email;
};

const ElectricityDegree = ref(0);
const ElectricityBill = 5;

const WaterDegree = ref(0);
const WaterBill = 10;


</script>

<template>
  <div class="content-page">
    <div class="subHeader">
      <div class="subHeader-title"></div>
      <div class="subHeader-btn">
        <button
          class="btn btn-primary mr-0"
          style="cursor: initial"
          v-if="address"
        >
          {{ getAddressLabel() }}
        </button>
        <button
          class="btn btn-primary mr-0"
          style="cursor: initial"
          v-if="category"
        >
          {{ getCategoryLabel() }}
        </button>
        <button
          class="btn btn-primary mr-0"
          style="cursor: initial"
          v-if="country"
        >
          {{ getCountryLabel() }}
        </button>
        <button
          class="btn btn-primary mr-0"
          style="cursor: initial"
          v-if="rentStart != null && rentEnd != null"
        >
          {{ rentStart }}$ ~ {{ rentEnd }}$
        </button>

        <div
          class="line"
          v-if="
            (rentStart != null && rentEnd != null) ||
            category ||
            address ||
            country
          "
        ></div>

        <div class="dropdown dropdown-primary filter">
          <span class="material-icons-outlined"> filter_alt </span>
          過濾
          <div>
            <div>
              <label>地址</label>
              <select v-model="address">
                <option value="">--請選擇--</option>
                <option
                  :value="key.value"
                  v-for="(key, index) in addressOptions"
                  :key="index"
                >
                  {{ key.label }}
                </option>
              </select>
            </div>
            <div>
              <label>承租物件</label>
              <select v-model="category">
                <option value="">--請選擇類型--</option>
                <option
                  :value="key.value"
                  v-for="(key, index) in categoryOptions"
                  :key="index"
                >
                  {{ key.label }}
                </option>
              </select>
            </div>
            <!-- <div>
              <label>國籍</label>
              <select v-model="country">
                <option value="">--請選擇類型--</option>
                <option
                  :value="key.value"
                  v-for="(key, index) in countryOptions"
                  :key="index"
                >
                  {{ key.label }}
                </option>
              </select>
            </div> -->
            <!-- <div>
              <label>租金</label>
              <div class="flex">
                <input
                  type="number"
                  v-model="rentStart"
                  min="0"
                  @blur="isRent('rentStart')"
                />
                ~
                <input
                  type="number"
                  :min="rentStart"
                  :max="1000000"
                  @blur="isRent('rentEnd')"
                  v-model="rentEnd"
                />
              </div>
            </div> -->
            <hr />
          </div>
        </div>

        <!-- <button
          class="btn btn-outline-primary"
          @click="isAddEditTenantWindowOpen = true"
        >
          <span class="material-icons-outlined"> add </span>
          新增合約
        </button> -->
      </div>
    </div>
    <div class="content-title">帳務列表</div>
    <div class="content-body">
      <div class="table-list">
        <div class="table-div-top">
          <div>
            <span class="material-icons-outlined"> request_quote </span>
            <span> List </span>
          </div>
          <div>
            <button class="btn btn-info">
              <span class="material-icons-outlined"> cloud_download </span>
              Export
            </button>
          </div>
        </div>
        <div class="table-div-content">
          <EasyDataTable
            ref="dataTable"
            buttons-pagination
            theme-color="#6c5dd3"
            v-model:server-options="serverOptions"
            :server-items-length="serverItemsLength"
            :headers="tableHeaders"
            :items="tableItems"
            :loading="tableLoading"
            :sort-by="['sys_create_date']"
            table-class-name="customize-table"
            body-text-direction="left"
            rowsPerPageMessage="顯示"
            rowsOfPageSeparatorMessage="至"
            emptyMessage="查無資料"
            alternating
          >
            <template #item-options="row">
              <button
                class="btn btn-outline-primary"
                v-if="row.options.includes('view')"
                @click="router.push(`/bill-list/${row.month}`)"
              >
                詳情
              </button>
            </template>
            <template #item-status="row">
              <div
                class="status"
                :class="row.status === 'running' ? 'running' : 'finish'"
              >
                {{ row.status === 'running' ? '未完成' : '收款完成' }}
              </div>
            </template>
            <template #item-progress="row">
              <div class="progress-box">
                <div class="progress">
                  <div class="progress-bar" :style="{ width: row.progress + '%' }"></div>
                </div>
                {{ row.progress }}%
              </div>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
  <div
    class="window-box-cover"
    :class="isAddEditTenantWindowOpen ? 'active' : ''"
  >
    <div class="window-box">
      <div class="window-box-close" @click="isAddEditTenantWindowOpen = false">
        <span class="material-icons-outlined"> close </span>
      </div>
      <div class="window-box-title" v-if="addEditTenantWindowType==='edit'">帳單內容</div>
      <div class="window-box-content">
        <div class="form-div">
          <div>
            <label for=""><small class="text-danger">*</small> 承租人姓名</label>
            <div>
              <div class="input-group">
                XXX
              </div>
            </div>
          </div>
          <div>
            <label for=""><small class="text-danger">*</small> 承租日期</label>
            <div>
              <div class="input-group">
                2024-01-01
                <span>~</span>
                2025-01-01
              </div>
            </div>
          </div>
          <div>
            <label for=""><small class="text-danger">*</small> 租金</label>
            <div>
              <div class="input-group">
                10000
              </div>
            </div>
          </div>
          <div>
            <label for=""><small class="text-danger">*</small> 電費</label>
            <div>
              <div class="input-group">
                <input type="number"  placeholder="" v-model="ElectricityDegree"  /> x {{ ElectricityBill }} = {{ ElectricityBill * ElectricityDegree }}
              </div>
            </div>
          </div>
          <div>
            <label for=""><small class="text-danger">*</small> 水費</label>
            <div>
              <div class="input-group">
                <input type="number"  placeholder="" v-model="WaterDegree"   /> 
                <span> x </span>
                <span> {{ WaterBill }} </span>
                <span> = </span>
                <span> {{ WaterDegree * WaterBill }}</span>
              </div>
            </div>
          </div>
          <div>
            <label for="">照片</label>
            <div>
              <div class="input-group">
                <input type="file" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- <div class="window-box-btns">
        <button class="btn btn-primary">確定</button>
        <button class="btn btn-outline-primary">取消</button>
      </div> -->
    </div>
  </div>
  <div
    class="window-box-cover"
    :class="isSendEmailWindowOpen ? 'active' : ''"
  >
    <div class="window-box">
      <div class="window-box-close" @click="isSendEmailWindowOpen = false">
        <span class="material-icons-outlined"> close </span>
      </div>
      <div class="window-box-title">發送信件</div>
      <div class="window-box-content">
        <div class="form-div">
          <div>
            <label for=""> Email</label>
            <div>
              {{ sendEmailInfo.email }}
            </div>
          </div>
          <div>
            <label for=""> 主旨</label>
            <div>
              <div class="input-group">
                <input type="text" placeholder="請輸入主旨" />
              </div>
            </div>
          </div>
          <div>
            <label for=""> 內容</label>
            <div>
              <div class="input-group">
                <textarea placeholder="請輸入內容" rows="5"></textarea>
              </div>
            </div>
          </div>
          <div style="justify-content: flex-end;">
            <button class="btn btn-primary ">
              發送
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-box{
  display: flex;
  align-items: center;
  .progress{
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
    border-radius: 10px;
    margin-right: 10px;
    .progress-bar{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: #6c5dd3;
      border-radius: 10px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }

}
</style>
