<template>
  <appointment-details
    :showDialog="showAppointmentDetailsDialog"
    @hide-dialog="hideDialogs"
    @open-edit-dialog="onShowAppointmentEditDialog"
    :appointment="selectedEvent"
  />
  <appointment-add
    :showDialog="showAppointmentAddDialog"
    @hide-dialog="hideDialogs"
  />

  <appointment-edit
    v-if="isEventSelected"
    :showDialog="showAppointmentEditDialog"
    @hide-dialog="hideDialogs"
    :selectedAppointment="selectedEvent"
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
          @view-change="onChangeMonth"
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
        :disable-views="['years', 'year', 'month']"
        @ready="scrollToCurrentTime"
        :on-event-click="onAppointmentClick"
        :events="appointments"
        :selected-date="selectedDate"
        @view-change="onChangeMonth"
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
import AppointmentEdit from "./AppointmentEdit.vue";

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
    AppointmentEdit,
  },
  setup() {
    const store = useStore();
    const currentDate = ref(new Date());
    const selectedDate = ref(currentDate.value);
    const currentMonth = ref(selectedDate.value.getMonth() + 1)
    const appointments = ref([]);

    let selectedEvent = ref({});
    const isEventSelected = ref(false);
    const showAppointmentDetailsDialog = ref(false);
    const showAppointmentAddDialog = ref(false);
    const showAppointmentEditDialog = ref(false);

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
      e.stopPropagation();
    }

    function onShowAppointmentAddDialog() {
      showAppointmentAddDialog.value = true;
    }

    function onShowAppointmentEditDialog() {
      hideDialogs();
      isEventSelected.value = true;
      showAppointmentEditDialog.value = true;
    }

    function changeSelectedDate(event, e) {
      selectedDate.value = e;
    }

    function hideDialogs() {
      showAppointmentDetailsDialog.value = false;
      showAppointmentAddDialog.value = false;
      showAppointmentEditDialog.value = false;
      fetchData();
    }

    async function onChangeMonth ({ startDate }) {
        if ((startDate.getMonth() + 1) != currentMonth.value) {
          currentMonth.value = startDate.getMonth() + 1;
          await fetchData();
        }
    }

    async function fetchData() {
      console.log("fetching");
      const employeeId = localStorage.getItem("id");
      const studioId = localStorage.getItem("studioId");
      const params = {
        month: selectedDate.value.getMonth() + 1,
        year: selectedDate.value.getFullYear(),
        employeeId,
        studioId,
      };
      
      await store.dispatch("appointment/loadMonthAppointments", params);
      const fetchedAppointments =
        store.getters["appointment/getAllAppointments"];
      appointments.value = fetchedAppointments.map((appointment) => {
        return {
          id: appointment.id,
          start: formatDate(appointment.startDate),
          end: formatDate(appointment.endDate),
          clientDto: appointment.clientDto,
          employeeDto: appointment.employeeDto,
          price: appointment.price,
          duration: 50,
          isFinished: appointment.isFinished,
          appointmentDetailsDto: appointment.appointmentDetailsDto,
        };
      });
    }

    function formatDate(date) {
      const day = date.substring(0, 2);
      const month = date.substring(3, 5);
      const year = date.substring(6, 10);
      const hour = date.substring(11, 13);
      const minute = date.substring(14, 16);

      return `${year}/${month}/${day} ${hour}:${minute}`;
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
      isEventSelected,
      showAppointmentDetailsDialog,
      changeSelectedDate,
      hideDialogs,
      showAppointmentAddDialog,
      onShowAppointmentAddDialog,
      showAppointmentEditDialog,
      onShowAppointmentEditDialog,
      onChangeMonth
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
