<script setup>
import { storeToRefs } from "pinia";
import { useEventStore } from "../stores/events.js";

const eventStore = useEventStore();
const { setEventDeatil } = eventStore;
const { eventDetail } = storeToRefs(eventStore);
const { Type, Name, Price, Remake } = eventDetail.value;
</script>

<template>
  <div>
    <div class="Input-Form">
      <div class="Input-Box">
        <label for="eventConsumeType">請選擇消費種類</label>
        <select name="eventConsumeType" id="eventConsumeType">
          <option value="1" selected>飲食</option>
          <option value="2">娛樂</option>
          <option value="3">醫療</option>
          <option value="4">繳費</option>
          <option value="5">交通</option>
        </select>
      </div>
      <div class="Input-Box">
        <label for="eventPayType">請選擇花費方式</label>
        <select name="eventPayType" id="eventPayType">
          <option value="Cash" selected>現金</option>
          <option value="CreditCard">信用卡</option>
          <option value="EasyCard">悠遊卡</option>
        </select>
      </div>
      <div class="Input-Box" style="width: 100%">
        <label for="eventPrcie">金額</label
        ><input id="eventPrcie" type="text" />
      </div>
      <div class="Input-Box" style="width: 100%">
        <label for="eventRemark">描述</label
        ><textarea id="eventRemark" cols="30" rows="10"></textarea>
      </div>

      <button type="button">新增</button>
    </div>

    <h1>{{ Type }}</h1>
    <h1>{{ Name }}</h1>
    <h1>{{ Price }}</h1>
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
  border: none;
}
</style>
