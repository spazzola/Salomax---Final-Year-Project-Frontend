<template>
  <div>
    <div class="vuecal__event-title" v-html="event.clientDto.name" />
    <p v-if="event.duration > 30">{{ event.service }}</p>
    <p v-if="event.duration >= 30">Total: £{{ event.price }}</p>
  </div>
</template>

<script>
export default {
  name: "AppointmentCard",
  // props: ["event", "showDialogg"],
  props: {
    event: {
      type: Object,
      default: null,
    }
  },
  setup() {


    return {  };
  },
};
</script>