<template>
  <div class="launch-filter">
    <h3>Filters</h3>
    <h2 class="h2">Launch Year</h2>
    <div class="filter-button-row">
      <button
        v-for="year in launchYears"
        :key="year"
        :class="{ active: launchYearFilter === year, 'small-button': true }"
        @click="toggleYearFilter(year)"
      >
        {{ year }}
      </button>
    </div>
  
    <h2 class="h2">Successful Launch</h2>
    <div class="filter-button-row">
      <button :class="{ active: launchSuccessFilter === true, 'small-button': true  }" @click="toggleLaunchFilter(true)">True</button>
      <button :class="{ active: launchSuccessFilter === false , 'small-button': true }" @click="toggleLaunchFilter(false)">False</button>
    </div>
  
    <h2 class="h2">Successful Landing</h2>
    <div class="filter-button-row">
      <button :class="{ active: landingSuccessFilter === true, 'small-button': true  }" @click="toggleLandingFilter(true)">True</button>
      <button :class="{ active: landingSuccessFilter === false , 'small-button': true }" @click="toggleLandingFilter(false)">False</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    launchYears: Array,
    launchYearFilter: Number,
    launchSuccessFilter: Boolean,
    landingSuccessFilter: Boolean,
    toggleYearFilter: Function,
    toggleLaunchFilter: Function,
    toggleLandingFilter: Function
  }
}
</script>

