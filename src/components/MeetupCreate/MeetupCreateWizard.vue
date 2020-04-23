<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{ currentStep }} of {{ allStepsCount }}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <component
        :is="currentComponent"
        @stepUpdated="mergeStepData"
        ref="currentComponent"
        :meetupToCreate="form"
      />
    </keep-alive>

    <progress class="progress" :value="currentProgress" max="100"
      >{{ currentProgress }}%</progress
    >
    <div class="controll-btns m-b-md">
      <button
        v-if="currentStep !== 1"
        @click="moveToPreviousStep"
        class="button is-primary m-r-sm"
      >
        Back
      </button>
      <button
        v-if="currentStep !== allStepsCount"
        :disabled="!canProceed"
        @click="moveToNextStep"
        class="button is-primary"
      >
        Next
      </button>
      <!-- Confirm Data -->
      <button @click="emitMeetupConfirm" v-else class="button is-primary">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import MeetupLocation from "./MeetupLocation";
import MeetupDetail from "./MeetupDetail";
import MeetupDescription from "./MeetupDescription";
import MeetupConfirmation from "./MeetupConfirmation";
export default {
  components: {
    MeetupLocation,
    MeetupDetail,
    MeetupDescription,
    MeetupConfirmation
  },
  data() {
    return {
      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null
      },
      currentStep: 1,
      canProceed: false,
      formSteps: [
        "MeetupLocation",
        "MeetupDetail",
        "MeetupDescription",
        "MeetupConfirmation"
      ]
    };
  },
  computed: {
    currentProgress() {
      return (100 / this.allStepsCount) * this.currentStep;
    },
    allStepsCount() {
      return this.formSteps.length;
    },
    currentComponent() {
      return this.formSteps[this.currentStep - 1];
    }
  },
  methods: {
    moveToNextStep() {
      this.currentStep++;
      this.$nextTick(() => {
        this.canProceed = !this.$refs["currentComponent"].$v.$invalid;
      });
    },
    moveToPreviousStep() {
      this.currentStep--;
      this.canProceed = true;
    },
    mergeStepData({ data, isValid }) {
      this.form = { ...this.form, ...data };
      this.canProceed = isValid;
    },
    emitMeetupConfirm() {
      this.$emit("meetupConfirmed", this.form);
    }
  }
};
</script>

<style scoped>
.meetup-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}
</style>
