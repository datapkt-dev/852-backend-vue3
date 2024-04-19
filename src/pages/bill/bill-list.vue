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
  { text: "房客", value: "name", width: 200 },
  { text: "該期金額", value: "total" },
  { text: "帳務類型", value: "lease" },
  { text: "狀態", value: "status" },
  { text: "電話", value: "phone" },
  { text: "", value: "options", width: 120 },
]);
const tableItems = ref([
  {
    id: 1,
    options: ["view"],
    name: "王小明",
    total: 120000,
    lease: ["住宅租金", "水費", "電費"],
    status: "Pending",
    phone: "0123456789",
  },
  {
    id: 2,
    options: ["view"],
    name: "陳小華",
    lease: ["車位租金"],
    total: 150000,
    status: "Overdue",
    phone: "0123456789",
  },
  {
    id: 3,
    options: ["view"],
    name: "林月嬌",
    lease: ["住宅租金", "水費", "電費"],
    total: 130000,
    status: "Paid",
    phone: "0123456789",
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
              <label for="">狀態</label>
              <select name="" id="">
                <option value="">--select--</option>
                <option value="">待收款</option>
                <option value="">逾期</option>
                <option value="">已繳款</option>
              </select>
            </div>
            <!-- <div>
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
            </div> -->
            <!-- <div>
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
            </div> -->
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
            <div>
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
            </div>
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
    <div class="content-title">帳務詳情</div>
    <div class="content-body">
      <div class="table-list">
        <div class="table-div-top">
          <div>
            <span class="material-icons-outlined"> request_quote </span>
            <span> List </span>
          </div>
          <div>
            <!-- <button class="btn btn-info">
              <span class="material-icons-outlined"> cloud_download </span>
              Export
            </button> -->
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
                @click="editTenant(row)"
              >
                詳情
              </button>
            </template>
            <template #item-status="row">

                
              <select :value="row.status">
                <option value="">--select--</option>
                <option value="Pending">待收款</option>
                <option value="Overdue">逾期</option>
                <option value="Paid">已繳款</option>
              </select>

                <!-- <span v-if="row.status == 'Pending'">待收款</span>
                <span v-if="row.status == 'Paid'">已繳款</span>
                <span v-if="row.status == 'Overdue'">逾期</span> -->
            </template>
            <template #item-lease="row">
              <div>
                <span class="tag" v-for="(item, index) in row.lease" :key="index">
                  {{ item }}
                </span>
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
    <div class="window-box" style="width: 500px;">
      <div class="window-box-close" @click="isAddEditTenantWindowOpen = false">
        <span class="material-icons-outlined"> close </span>
      </div>
      <div class="window-box-title" v-if="addEditTenantWindowType==='edit'">
        
        王小明2024年03月帳務
      </div>
      <div class="window-box-content">
        <div class="form-div">
          <div>
            <label for="">租金</label>
            <div>
              <div class="input-group">
                10000
              </div>
            </div>
          </div>
          <div>
            <label for="">電費</label>
            <div>
              <div class="input-group">
                <input type="number" style="width:200px"  placeholder="" v-model="ElectricityDegree"  />
                <span style="white-space: nowrap"> 度 x ${{ ElectricityBill }}/度 =  {{ ElectricityDegree * ElectricityBill }}</span>
              </div>
            </div>
          </div>
          <div>
            <label for="">水費</label>
            <div>
              <div class="input-group">
                <input type="number"  style="width:200px" placeholder="" v-model="WaterDegree"   /> 
                <span style="white-space: nowrap"> 度 x ${{ WaterBill }}/度  =  {{ WaterDegree * WaterBill }}</span>
              </div>
            </div>
          </div>
          <div>
            <label for=""> 總金額</label>
            <div>
              <div class="input-group">
                {{ 10000 + ElectricityDegree * ElectricityBill + WaterDegree * WaterBill }}
              </div>
            </div>
          </div>
          <div>
            <label for="">狀態</label>
            <div>
              <div class="input-group">
                <select>
                  <option value="">--select--</option>
                  <option value="">待收款</option>
                  <option value="">逾期</option>
                  <option value="">已繳款</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label for=""> 電話</label>
            <div>
              <div class="input-group">
                0123456789
              </div>
            </div>
          </div>
          <div style="justify-content: center;">
            <button class="btn btn-primary">Save</button>
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
