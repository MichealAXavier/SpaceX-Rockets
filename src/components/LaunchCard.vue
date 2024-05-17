<template>
  <div class="launch-card" :class="{ 'selected': isSelected }" @click="selectCard">
    <img :src="launch.links.mission_patch_small" :alt="launch.mission_name" class="launch-image">
    <div class="launch-details">
      <h2 class="h3" >{{ launch.mission_name }}</h2>
      <div class="mission"> 
        <div class="mission-item" v-if="launch.mission_id.length === 0">
          <span class="label">Mission_id</span>
          <span class="value"> No data</span>
        </div>
        <div class="mission-item" v-else>
          <span class="label">Mission Id</span> 
          <span class="value">{{ launch.mission_id[0] }} </span>
        </div>
        <div class="mission-item">
          <span class="label">Launch Year</span>
          <span class="value"> {{launch.launch_year}}</span>
        </div>
        <div class="mission-item">
          <span class="label">Successful Launch</span>
          <span class="value"> {{ launch.launch_success ? 'True' : 'False' }}</span>
        </div>
        <div class="mission-item">
          <span class="label">Successful Landing</span>
          <span class="value"> {{ launch.rocket.first_stage.cores[0].land_success ? 'True' : 'False' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useMyStore } from '../stores/counter.js';

export default {
  props: {
    launch: Object
  },
  computed: {
    isSelected() {
      const selectedCard = useMyStore().selectedCard;
      return selectedCard && selectedCard.id === this.launch.id;
    }
  },
  methods: {
    selectCard() {
      this.$emit('onFlightSelect')
     // const store = useMyStore();
      // const selectedCard = store.selectedCard;

      // if (!selectedCard || selectedCard.id !== this.launch.id) {
      //   store.setSelectedCard(this.launch);
      // } else {
      //   store.clearSelectedCard();
      // }
      // this.$router.replace({
      //   name: 'LaunchCard',
      //   params: { flightNo: selectedCard.flightNo }
      // });
    }
  }
};
</script>



<style scoped>
.launch-card {
  cursor: pointer;
}

.selected {
  border: 2px solid blue; 
}
</style>
