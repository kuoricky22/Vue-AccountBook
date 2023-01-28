import { defineStore } from "pinia";
import { ref } from "vue";
import { uuid } from "vue-uuid";

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
  const eventRemark = ref([]);
  // 各別日期細項
  const eventDateDetail = ref([]);
  // 該日期的總花費
  const eventDateTotalCost = ref("0");
  // 所有細項
  let eventDetail = ref([
    {
      Date: "25",
      Detail: [
        {
          id: "1",
          Date: "2023-08-25",
          EventTime: timeFormat(),
          ConsumeType: "ENT",
          PayType: "信用卡",
          Price: "123123123.00",
          Remark: "123123",
        },
        {
          id: "2",
          Date: "2023-08-25",
          EventTime: timeFormat(),
          ConsumeType: "MED",
          PayType: "信用卡",
          Price: "123123123.00",
          Remark: "123123",
        },
      ],
    },
    {
      Date: "24",
      Detail: [
        {
          id: "1",
          Date: "2023-08-24",
          EventTime: timeFormat(),
          ConsumeType: "MED",
          PayType: "現金",
          Price: "123123123.00",
          Remark: "123123",
        },
      ],
    },
  ]);

  const transBtnFunction = ref("1");
  const eventDetailID = ref("");

  function setEventDetail(btnFunction) {
    if (btnFunction === "1") {
      let detail = {
        Date: new Date(eventDate.value).getDate().toString(),
        Detail: [
          {
            id: uuid.v4(),
            Date: new Date(eventDate.value).toISOString().slice(0, 10),
            EventTime: timeFormat(),
            ConsumeType: eventConsumeType.value,
            PayType: eventPayType.value,
            Price: eventPrice.value,
            Remark: eventRemark.value.toString(),
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
    } else {
      let editDetail = {
        Date: new Date(eventDate.value).toISOString().slice(0, 10),
        ConsumeType: eventConsumeType.value,
        PayType: eventPayType.value,
        Price: eventPrice.value,
        Remark: eventRemark.value.toString(),
      };

      eventDetail.value.map((eventArray) => {
        eventArray.Detail.filter(
          (x) => x.Date === new Date(eventDate.value).toISOString().slice(0, 10)
        ).map((eventDetail) => {
          if (eventDetail.id === eventDetailID.value) {
            eventDetail.ConsumeType = editDetail.ConsumeType;
            eventDetail.PayType = editDetail.PayType;
            eventDetail.Price = editDetail.Price;
            eventDetail.Remark = editDetail.Remark;
          }
        });
      });
      transBtnFunction.value = "1";
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

  function editEventDetail(date, id) {
    let tempArray = [];
    let filterArray = [];
    eventRemark.value = [];

    eventDetailID.value = id;
    eventDetail.value.map((eventArray) => {
      if (eventArray.Date === date.slice(8, 10)) {
        tempArray = eventArray.Detail;
      }
    });

    filterArray = JSONParse(tempArray.filter((x) => x.id === id));

    eventDate.value = new Date(date).toISOString().slice(0, 10);
    eventConsumeType.value = filterArray[0].ConsumeType;
    eventPayType.value = filterArray[0].PayType;
    eventPrice.value = filterArray[0].Price;
    eventRemark.value.push(filterArray[0].Remark);
    transBtnFunction.value = "2";
  }

  function deleteEventDetail(date, id) {
    eventDetail.value.map((eventArray) => {
      if (eventArray.Date === date.slice(8, 10)) {
        eventArray.Detail = JSONParse(
          eventArray.Detail.filter((x) => x.id !== id)
        );
      }
    });
    getEventDetail(date.slice(8, 10));
  }

  function getEventDetail(date) {
    let totalCost = 0;
    eventDateDetail.value = [];
    eventDetail.value.map((eventArray) => {
      if (eventArray.Date === date) {
        eventDateDetail.value = eventDateDetail.value.concat(
          JSONParse(eventArray.Detail)
        );
      }
    });
    
    eventDateDetail.value.map((eventCost) => {
      totalCost += parseFloat(eventCost.Price);
      eventCost.Price = moneyFormat.format(eventCost.Price);
    });
    eventDateTotalCost.value = moneyFormat.format(totalCost);
  }

  function timeFormat() {
    return (
      new Date().getHours().toString().padStart(2, "0") +
      ":" +
      new Date().getMinutes().toString().padStart(2, "0")
    );
  }

  function JSONParse(value) {
    return JSON.parse(JSON.stringify(value));
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
    eventDetailID,
    eventDateDetail,
    eventDateTotalCost,
    selectConsumeType,
    selectPayType,
    transBtnFunction,
    setEventDetail,
    getEventDetail,
    editEventDetail,
    deleteEventDetail,
  };
});
