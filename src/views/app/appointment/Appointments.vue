<template>
  <appointment-details :showDialog="showAppointmentDetailsDialog" @hide-dialog="hideDialog" :appointment="selectedEvent"/>
  <appointment-add :showDialog="showAppointmentAddDialog" @hide-dialog="hideDialog"/>

  <div class="container" style="height: 100%; width: 100vw">
    <div class="row header">
      <div class="col-5">
        <header>
          <h1>S-max</h1>
        </header>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-md-4 col-sm-4" style="height: 100%">
        <left-menu />
      </div>
      <div class="col-xl-3">
        <base-button text="New Appointment" class="btn-add-appointment" @clicked="onShowAppointmentAddDialog"/>
        <vue-cal
          class="vuecal--rounded-theme vuecal--green-theme"
          xsmall
          hide-view-selector
          :time="false"
          active-view="month"
          :disable-views="['week']"
          style="width: 100%; height: 300px"
          @cell-click="changeSelectedDate('cell-click', $event)"
        >
        </vue-cal>
      </div>
      <VueCal
        id="vuecal"
        class="col-xl-9"
        style="height: 720px"
        :time-from="6 * 60"
        :time-to="22 * 60"
        :time-step="30"
        :time-cell-height="60"
        :hideViewSelector="false"
        :disable-views="['years', 'year']"
        @ready="scrollToCurrentTime"
        :on-event-click="onAppointmentClick"
        :events="events"
        :selected-date="selectedDate"
        ref="vuecal"
      >
        <template #event="{ event }">
          <appointment-card :event="event" :showDialog="showAppointmentDetailsDialog" />
        </template>
      </VueCal>
    </div>
    <the-footer />
  </div>
</template>

<script>
import { ref } from "vue";
import LeftMenu from "../../../components/app/leftmenu/LeftMenu.vue";
import TheFooter from "../../../components/web-page/footer/TheFooter.vue";
import AppointmentCard from "./AppointmentCard.vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import AppointmentDetails from './AppointmentDetails.vue';
import AppointmentAdd from "./AppointmentAdd.vue";

export default {
  name: "Appointments",
  components: {
    LeftMenu,
    TheFooter,
    VueCal,
    AppointmentCard,
    BaseButton,
    AppointmentDetails,
    AppointmentAdd
  },
  setup() {
    const currentDate = ref(new Date());
    const selectedDate = ref(currentDate.value);
    const events = [
      {
        start: "2023-02-19 16:00",
        end: "2023-02-19 16:50",
        title: "",
        price: 30,
        duration: 50,
        note: "",
        clientDto: {
          name: "Alice",
          surname: "Carter",
          phoneNumber: "111111111",
        },
        isFinished: false,
        appointmentDetailsDto: [
          {
            name: 'Manicure'
          },
          {
            name: "Pedicure"
          }
        ]
      },
    ];

    let selectedEvent = ref({});
    const showAppointmentDetailsDialog = ref(false);
    const showAppointmentAddDialog = ref(false);

    function scrollToCurrentTime() {
      const calendar = document.querySelector("#vuecal .vuecal__bg");
      const hours =
        currentDate.value.getHours() + currentDate.value.getMinutes() / 60;
      calendar.scrollTo({
        top: hours * 60,
        behavior: "smooth",
      });
    }

    function onAppointmentClick(event, e) {
      selectedEvent.value = event;
      showAppointmentDetailsDialog.value = true;
      // console.log("triggered");
      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    }

    function onShowAppointmentAddDialog() {
      showAppointmentAddDialog.value = true;
    }

    function changeSelectedDate(event, e) {
      selectedDate.value = e;
    }

    function hideDialog() {
      showAppointmentDetailsDialog.value = false;
      showAppointmentAddDialog.value = false;
    }

    return {
      selectedDate,
      scrollToCurrentTime,
      onAppointmentClick,
      events,
      selectedEvent,
      showAppointmentDetailsDialog,
      changeSelectedDate,
      hideDialog,
      showAppointmentAddDialog,
      onShowAppointmentAddDialog
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.header {
  height: 15% !important;
  text-align: left;
  padding: 1rem;
}

h1 {
  font-size: 6rem;
  font-weight: bolder;
  color: #4abdac;
}

.row {
  height: 100%;
  flex-wrap: nowrap;
}

.vuecal::before {
  padding: 0;
}

.vuecal__flex[column] {
  flex: none;
}

.vuecal__title-bar {
  background-color: blue !important;
}

.btn-add-appointment {
  /* color: black !important; */
  width: 100%;
  height: 45.7px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
