import { stringifyExpression } from "@vue/compiler-core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useEventStore = defineStore("event", () => {
  // 消費日期
  const eventDate = ref("");
  // 消費種類
  const eventConsumeType = ref("");
  // 花費方式
  const eventPayType = ref("");
  // 花費金額
  const eventPrice = ref("");
  // 花費描述
  const eventRemark = ref("");
  // 各別日期細項
  const eventDateDetail = ref([]);
  // 所有細項
  let eventDetail = ref([
    {
      Date: "25",
      Detail: [
        {
          EventTime: timeFormat(),
          ConsumeType: "ENT",
          PayType: "信用卡",
          Price: "$123,123,123.00",
          Remake: "123123",
        },{
          EventTime: timeFormat(),
          ConsumeType: "MED",
          PayType: "信用卡",
          Price: "$123,123,123.00",
          Remake: "123123",
        },
      ],
    },
    {
      Date: "24",
      Detail: [
        {
          EventTime: timeFormat(),
          ConsumeType: "MED",
          PayType: "現金",
          Price: "$123,123,123.00",
          Remake: "123123",
        },
      ],
    },
  ]);

  const eventPriceFormat = computed(() => moneyFormat.format(eventPrice.value));

  function setEventDetail() {
    let detail = {
      Date: new Date(eventDate.value).getDate().toString(),
      Detail: [
        {
          EventTime: timeFormat(),
          ConsumeType: eventConsumeType.value,
          PayType: eventPayType.value,
          Price: eventPriceFormat.value,
          Remake: eventRemark.value,
        },
      ],
    };
    if (
      eventDetail.value.some(
        (m) => m.Date === new Date(eventDate.value).getDate().toString()
      )
    ) {
      setEvent(eventDetail.value, detail);
    } else {
      eventDetail.value = [...eventDetail.value, detail];
    }

    getEventDetail(new Date(eventDate.value).getDate().toString());
  }

  function setEvent(eventArray, newEvent) {
    eventArray.map((eventArray) => {
      if (eventArray.Date === newEvent.Date) {
        eventArray.Detail = eventArray.Detail.concat(newEvent.Detail);
      }
    });
  }

  function getEventDetail(date) {
    eventDateDetail.value = [];
    eventDetail.value.map((eventArray) => {
      if (eventArray.Date === date) {
        eventDateDetail.value = eventDateDetail.value.concat(JSON.parse(JSON.stringify(eventArray.Detail)));
      }
    });
  }

  function timeFormat(){
    return new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')
  } 

  
  // 選擇消費種類
  const selectConsumeType = ref([
    { val: "FAD", type: "飲食" },
    { val: "ENT", type: "娛樂" },
    { val: "MED", type: "醫療" },
    { val: "PTF", type: "繳費" },
    { val: "TRA", type: "交通" },
  ]);
  // 選擇花費方式
  const selectPayType = ref([
    { val: "Cash", type: "現金" },
    { val: "CreditCard", type: "信用卡" },
    { val: "EasyCard", type: "悠遊卡" },
  ]);

  const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return {
    eventDetail,
    eventDate,
    eventConsumeType,
    eventPayType,
    eventPrice,
    eventRemark,
    eventDateDetail,
    selectConsumeType,
    selectPayType,
    setEventDetail,
    getEventDetail,
  };
});
