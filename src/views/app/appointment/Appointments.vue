<template>
  <appointment-details
    :showDialog="showAppointmentDetailsDialog"
    @hide-dialog="hideDialog"
    :appointment="selectedEvent"
  />
  <appointment-add
    :showDialog="showAppointmentAddDialog"
    @hide-dialog="hideDialog"
  />

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
        <base-button
          text="New Appointment"
          class="btn-add-appointment"
          @clicked="onShowAppointmentAddDialog"
        />
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
        :events="appointments"
        :selected-date="selectedDate"
        ref="vuecal"
      >
        <template #event="{ event }">
          <appointment-card
            :event="event"
            :showDialog="showAppointmentDetailsDialog"
          />
        </template>
      </VueCal>
    </div>
    <the-footer />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import LeftMenu from "../../../components/app/leftmenu/LeftMenu.vue";
import TheFooter from "../../../components/web-page/footer/TheFooter.vue";
import AppointmentCard from "./AppointmentCard.vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import AppointmentDetails from "./AppointmentDetails.vue";
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
    AppointmentAdd,
  },
  setup() {
    const store = useStore();
    const currentDate = ref(new Date());
    const selectedDate = ref(currentDate.value);
    //let appointments = ref([]);
    const appointments = ref([]);

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
      fetchData();
    }

    async function fetchData() {
      const params = {
        month: 2,
        year: 2023,
        employeeId: 1,
        studioId: 1,
      };
      await store.dispatch("appointment/loadMonthAppointments", params);
      appointments.value = store.getters["appointment/getAllAppointments"];
      const fetchedAppointments = store.getters["appointment/getAllAppointments"];
      appointments.value = fetchedAppointments.map((appointment) => {
        return {
          start: formatDate(appointment.startDate),
          end: formatDate(appointment.endDate),
          clientDto: appointment.clientDto,
          price: appointment.price,
          duration: 50,
          isFinished: appointment.isFinished,
          appointmentDetailsDto: appointment.appointmentDetailsDto
        }
      })
    }

    function formatDate(date) {
      const day = date.substring(0, 2);
      const month = date.substring(3, 5);
      const year = date.substring(6, 10);
      const hour = date.substring(11, 13);
      const minute = date.substring(14, 16);
      
      return `${year}/${month}/${day} ${hour}:${minute}`
    }
    onBeforeMount(async () => {
      await fetchData();
    });

    return {
      selectedDate,
      scrollToCurrentTime,
      onAppointmentClick,
      appointments,
      selectedEvent,
      showAppointmentDetailsDialog,
      changeSelectedDate,
      hideDialog,
      showAppointmentAddDialog,
      onShowAppointmentAddDialog,
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
