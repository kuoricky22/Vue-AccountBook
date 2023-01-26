import { stringifyExpression } from "@vue/compiler-core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useEventStore = defineStore("event", () => {
  // 消費種類
  const eventConsumeType = ref("");
  // 花費方式
  const eventPayType = ref("");
  // 花費金額
  const eventPrice = ref(0);
  // 花費描述
  const eventRemark = ref("");
  // 所有細項
  const eventDetail = ref([
    { Type: String, Name: String, Price: Number, Remake: String },
  ]);

  function setEventDeatil() {
    let detail = {
      Type: eventConsumeType.value,
      Name: eventPayType.value,
      Price: eventPrice.value,
      Remake: eventRemark.value,
    };
    eventDetail.push(detail);
  }

  return { eventDetail, setEventDeatil };
});
