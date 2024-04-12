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
  // {
  //   value: "0",
  //   label: "台北市",
  // },
  // {
  //   value: "1",
  //   label: "新北市",
  // },
];
const categoryOptions = [
  {
    value: "0",
    label: "住宅",
  },
  {
    value: "1",
    label: "寫字樓",
  },
  {
    value: "2",
    label: "工廠大廈",
  },
  {
    value: "3",
    label: "商舖",
  },
  {
    value: "4",
    label: "車位",
  },
  {
    value: "5",
    label: "土地",
  },
];
const countryOptions = [
  // {
  //   value: "TW",
  //   label: "台灣",
  // },
  // {
  //   value: "JP",
  //   label: "日本",
  // },
  // {
  //   value: "US",
  //   label: "美國",
  // },
  // {
  //   value: "VN",
  //   label: "越南",
  // },
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
  { text: "", value: "photo", width: 60 },
  { text: "房客", value: "name", width: 200 },
  // { text: "綁定平台", value: "platform", width: 120 },
  { text: "承租物件", value: "lease" },
  { text: "電話", value: "phone" },
  // { text: "物件承租金額", value: "rent" },
  { text: "信箱", value: "email" },
  { text: "", value: "options", width: 60 },
]);
const tableItems = ref([
  {
    id: 1,
    options: ["view"],
    name: "陳小華",
    platform: "line",
    phone: "0912345678",
    lease: ["住宅", "寫字樓"],
    rent: "10000",
    country: "TW",
    startDate: "2021-01-01",
    endDate: "2021-12-31",
    photo: imgUserUrl("01.webp"),
    email: "zzz@zzz.zz"
  },
  {
    id: 2,
    options: ["view"],
    name: "林月嬌",
    platform: "line",
    phone: "0912345678",
    lease: ["住宅"],
    rent: "10000",
    country: "TW",
    startDate: "2021-01-01",
    endDate: "2021-12-31",
    photo: imgUserUrl("01.webp"),
    email: ""
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
          新增房客
        </button> -->
      </div>
    </div>
    <div class="content-title">房客列表</div>
    <div class="content-body">
      <div class="table-list">
        <div class="table-div-top">
          <div>
            <span class="material-icons-outlined"> recent_actors </span>
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
            <template #item-photo="row">
              <img :src="row.photo" class="img-fluid" />
            </template>
            <template #item-name="row">
              {{ row.name }} ({{ row.country }}) <br />
              {{ row.startDate }} ~ {{ row.endDate }}
            </template>
            <template #item-options="row">
              <button
                class="btn btn-outline-primary"
                v-if="row.options.includes('view')"
                @click="editTenant(row)"
              >
                <!-- <span class="material-icons-outlined">
                            visibility
                            </span> -->
                查看
              </button>
            </template>
            <template #item-email="row">
              <button v-if="row.email" class="btn btn-outline-primary" @click="openSendEmail(row)">發送信件</button>
              <span v-else> - </span>
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
      <div class="window-box-title" v-if="addEditTenantWindowType==='add'">新增房客</div>
      <div class="window-box-title" v-if="addEditTenantWindowType==='edit'">查看房客</div>
      <div class="window-box-content">
        <div class="form-div">
          <div>
            <label for=""><small class="text-danger">*</small> 姓名</label>
            <div>
              <div class="input-group">
                <!-- <div class="text-input"> -->
                <input type="text" placeholder=""  disabled/>
                <!-- </div> -->
              </div>
            </div>
          </div>
          <!-- <div>
            <label for=""><small class="text-danger">*</small> 承租日期</label>
            <div>
              <div class="input-group">
                <input type="date" />
                <span>~</span>
                <input type="date" />
              </div>
            </div>
          </div> -->
          <!-- <div>
            <label for=""><small class="text-danger">*</small> 國籍</label>
            <div>
              <div class="input-group">
                <select>
                  <option value="">--請選擇--</option>
                  <option value="TW">台灣</option>
                  <option value="JP">日本</option>
                  <option value="US">美國</option>
                  <option value="VN">越南</option>
                </select>
              </div>
            </div>
          </div> -->
          <div>
            <label for=""><small class="text-danger">*</small> 電話</label>
            <div>
              <div class="input-group">
                <input type="text" placeholder="請輸入電話" disabled/>
              </div>
            </div>
          </div>
          <!-- <div>
            <label for=""><small class="text-danger">*</small> 綁定平台</label>
            <div>
              <div class="input-group">
                <select>
                  <option value="">--請選擇--</option>
                  <option value="line">Line</option>
                  <option value="facebook">Facebook</option>
                  <option value="google">Google</option>
                </select>
              </div>
            </div>
          </div> -->
          <!-- <div>
            <label for=""><small class="text-danger">*</small> 租金</label>
            <div>
              <div class="input-group">
                <input type="number" placeholder="請輸入租金" />
              </div>
            </div>
          </div> -->
          <!-- <div>
            <label for=""><small class="text-danger">*</small> 租賃物件</label>
            <div>
              <div class="checkbox-group">
                  <label class="checkbox-label">
                      <input type="checkbox" :id="'houseTypeCheckbox-1'">
                      <span></span>
                      <label :for="'houseTypeCheckbox-1'">套房</label>
                  </label>
                  <label class="checkbox-label">
                      <input type="checkbox" :id="'houseTypeCheckbox-2'">
                      <span></span>
                      <label :for="'houseTypeCheckbox-2'">雅房</label>
                  </label>
                  <label class="checkbox-label">
                      <input type="checkbox" :id="'houseTypeCheckbox-3'">
                      <span></span>
                      <label :for="'houseTypeCheckbox-3'">整層住家</label>
                  </label>
                  <label class="checkbox-label">
                      <input type="checkbox" :id="'houseTypeCheckbox-4'">
                      <span></span>
                      <label :for="'houseTypeCheckbox-4'">店面</label>
                  </label>
              </div>
            </div>
          </div> -->
          <!-- <div>
            <label for="">照片</label>
            <div>
              <div class="input-group">
                <input type="file" disabled/>
              </div>
            </div>
          </div> -->

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
        </div>
      </div>
      <div class="window-box-btns">
        <button class="btn btn-primary ">
          發送
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
