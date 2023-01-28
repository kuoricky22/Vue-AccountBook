<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useEventStore } from "../stores/events.js";

const eventStore = useEventStore();
const { setEventDetail, getEventDetail, editEventDetail, deleteEventDetail } =
  eventStore;
const {
  eventDetail,
  eventPrice,
  eventDate,
  eventRemark,
  eventConsumeType,
  eventPayType,
  eventDateDetail,
  eventDateTotalCost,
  selectConsumeType,
  selectPayType,
  transBtnFunction,
} = storeToRefs(eventStore);

let hasEventDateDetail = ref(false);

watch(eventDateDetail, (nV, oV) => {
  if (nV.length != 0) hasEventDateDetail.value = true;
});
</script>

<template>
  <div>
    <div class="Input-Form">
      <div class="Input-Box" style="width: 100%">
        <label for="eventPayType">請選擇花費日期</label>
        <input
          type="Date"
          v-model="eventDate"
          :disabled="transBtnFunction == '2'"
        />
      </div>
      <div class="Input-Box">
        <label for="eventConsumeType">請選擇消費種類</label>
        <select
          name="eventConsumeType"
          id="eventConsumeType"
          v-model="eventConsumeType"
        >
          <option disabled value="">請選擇</option>
          <option
            v-for="consumetype in selectConsumeType"
            :value="consumetype.val"
          >
            {{ consumetype.type }}
          </option>
        </select>
      </div>
      <div class="Input-Box">
        <label for="eventPayType">請選擇花費方式</label>
        <select name="eventPayType" id="eventPayType" v-model="eventPayType">
          <option disabled value="">請選擇</option>
          <option v-for="payType in selectPayType" :value="payType.type">
            {{ payType.type }}
          </option>
        </select>
      </div>
      <div class="Input-Box" style="width: 100%">
        <label for="eventPrcie">金額</label
        ><input id="eventPrcie" type="text" v-model="eventPrice" />
      </div>
      <div class="Input-Box" style="width: 100%">
        <label for="eventRemark">描述</label
        ><textarea
          id="eventRemark"
          cols="30"
          rows="10"
          v-model="eventRemark"
        ></textarea>
      </div>

      <button type="button" @click="setEventDetail(transBtnFunction)">
        新增/修改
      </button>
    </div>
    <div>
      <div class="list-date-wrapper">
        <div class="list-date" v-for="{ Date } in eventDetail">
          <div @click="getEventDetail(Date)">{{ Date }}</div>
        </div>
      </div>
      <div class="list-detail-wrapper">
        <div class="list-detail-total">
          總花費金額：{{ eventDateTotalCost }}元
        </div>
        <hr />
        <div
          class="list-detail"
          v-for="{
            id,
            Date,
            EventTime,
            ConsumeType,
            PayType,
            Price,
            Remark,
          } in eventDateDetail"
          v-if="hasEventDateDetail"
        >
          <div style="display: flex">
            <div class="item-time" :class="'type-' + ConsumeType">
              {{ EventTime }}
            </div>
            <div>
              <h2>花費方式：{{ PayType }}</h2>
              <h2>金額：{{ Price }}</h2>
              <h2>描述：{{ Remark }}</h2>
            </div>
          </div>
          <div class="item-function-box">
            <button class="edit-btn" @click="editEventDetail(Date, id)">
              修改
            </button>
            <button class="delete-btn" @click="deleteEventDetail(Date, id)">
              刪除
            </button>
          </div>
        </div>
        <div class="list-detail" style="justify-content: center" v-else>
          目前沒有任何資料
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.Input-Form {
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  box-shadow: 1.5px 1.5px 2px #ececec, -1.5px -1.5px 2px #ececec;
}
.Input-Box {
  width: 50%;
  padding: 0.75rem;
}
input {
  width: 100%;
  padding: 0.75rem;
}
label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: bold;
}
textarea {
  width: 100%;
}
button {
  cursor: pointer;
  width: 112px;
  height: 56px;
  margin-right: 0.75rem;
  margin-left: auto;
  background-color: #8d4fff;
  color: #f9f9f9;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  border: none;
}

.list-date-wrapper {
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
  padding: 2.5rem 1.5rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.list-date {
  width: 50px;
  height: 50px;
  position: relative;
  color: #ececec;
  border: none;
  background-color: #262626;
  border-radius: 25px;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
}
.list-date:hover {
  box-shadow: 1px 1px 5px rgba(185, 169, 169, 0.541),
    -1px -1px 5px rgba(185, 169, 169, 0.541);
}
.list-date > div {
  position: absolute;
  top: -2px;
  left: 8px;
}
.list-detail-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  color: #363636;
  margin-top: 1.5rem;
  padding: 2.5rem 1.5rem;
}
.list-detail-total {
  width: 100%;
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
}
.list-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.list-detail:first-child {
  margin-top: 0;
}
.item-time {
  padding-right: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border-right: 5px solid #000;
}
.item-function-box {
  justify-self: end;
  align-self: center;
}
.edit-btn {
  width: 3.5rem;
  height: 2.5rem;
  background-color: rgba(54, 54, 54, 0.8);
}
.delete-btn {
  width: 3.5rem;
  height: 2.5rem;
  background-color: rgba(207, 24, 24, 0.8);
}
.edit-btn:hover {
  background-color: rgba(54, 54, 54);
}
.delete-btn:hover {
  background-color: rgba(207, 24, 24);
}
.type-ENT {
  border-right: 5px solid rgb(207, 24, 24);
}
.type-MED {
  border-right: 5px solid rgb(61, 207, 24);
}
.type-FAD {
  border-right: 5px solid rgb(207, 112, 24);
}
.type-PTF {
  border-right: 5px solid rgb(248, 212, 9);
}
.type-TRA {
  border-right: 5px solid rgb(28, 176, 221);
}
</style>
