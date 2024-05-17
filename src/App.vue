<template>
  <div>
    <h1>SpaceX Launch Programs</h1>
    <div class="container">
      <div class="section1">
        <CardFilter
          :launchYears="launchYears"
          :launchYearFilter="launchYearFilter"
          :launchSuccessFilter="launchSuccessFilter"
          :landingSuccessFilter="landingSuccessFilter"
          :toggleYearFilter="toggleYearFilter"
          :toggleLaunchFilter="toggleLaunchFilter"
          :toggleLandingFilter="toggleLandingFilter"
        />
      </div>
      <div class="section2">
        <div class="launch-cards">
          <LaunchCard v-for="launch in filteredLaunches" :key="launch.flight_number" :launch="launch" @onFlightSelect="onFlightSelect(launch)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import CardFilter from './components/CardFilter.vue';
import LaunchCard from './components/LaunchCard.vue';
import { useMyStore } from './stores/counter.js';
import {useRouter, useRoute} from 'vue-router'

export default {
  components: {
    CardFilter,
    LaunchCard
  },
  props:{
    flightNo:{
      type:[Number, String]
    }
  },
  setup() {
    const launches = ref([]);
    const launchYears = ref([]);
    const launchYearFilter = ref(null);
    const launchSuccessFilter = ref(null);
    const landingSuccessFilter = ref(null);

    const filteredLaunches = computed(() => {
      let filtered = launches.value;
      if (launchYearFilter.value != null) {
        filtered = filtered.filter(launch => launch.launch_year === launchYearFilter.value);
      }
      if (launchSuccessFilter.value != null) {
        filtered = filtered.filter(launch => launch.launch_success === launchSuccessFilter.value);
      }
      if (landingSuccessFilter.value != null) {
        filtered = filtered.filter(launch => {
          const landSuccess = launch.rocket.first_stage.cores[0].land_success;
          return landSuccess == landingSuccessFilter.value;
        });
      }
      return filtered;
    });

    const fetchLaunches = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_year=&launch_success=&landing_success=');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        launches.value = data;
        launchYears.value = Array.from(new Set(data.map(launch => launch.launch_year)));
        updateStore()
      } catch (error) {
        console.error('Error fetching SpaceX launches:', error);
      }
    };
  const route = useRoute()
    onMounted(
      fetchLaunches,
      
      
      );
      function updateStore(){
        const launchList = launches.value
        if(launchList?.length){
          const flightNo = route?.params?.flightNo
          if(flightNo){
            const selectedFlight = launchList.find(launch => launch.flight_number == flightNo)
            if(selectedFlight){
              onFlightSelect(selectedFlight)
            }
      }
        }
      }

    const toggleYearFilter = (year) => {
      launchYearFilter.value = launchYearFilter.value === year ? null : year;
    };

    const toggleLaunchFilter = (success) => {
      launchSuccessFilter.value = launchSuccessFilter.value === success ? null : success;
    };

    const toggleLandingFilter = (success) => {
      landingSuccessFilter.value = landingSuccessFilter.value === success ? null : success;
    };
    const flightStore = useMyStore()
    const router = useRouter()

    function onFlightSelect(launch, updateRoute = true){
       flightStore.setSelectedCard(launch);
       if(updateRoute){
        router.replace({
        name: 'LaunchCard',
        params: { flightNo: launch.flight_number }
      });
       }
       
    }

    return {
      launches,
      launchYears,
      launchYearFilter,
      launchSuccessFilter,
      landingSuccessFilter,
      filteredLaunches,
      toggleYearFilter,
      toggleLaunchFilter,
      toggleLandingFilter,
      onFlightSelect
    };
  }
};
 
</script>

