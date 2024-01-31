<template>
  <svg :width="data_.width + 2" :height="data_.height + 2">
    <rect x="1" y="1" :width="data_.width" :height="data_.height" :fill="DinamicFill" stroke="blue" stroke-width="5" />
    <text dominant-baseline="central" x="50%" y="50%" dy=".3em">{{ data_.text_ }}</text>
  </svg>
</template>

<script>
export default {
  name: 'SvgElement',
  props: {
    data_: Object,
  },
  computed: {
    DinamicFill() {
      if (!this.data_.hasFill){
        return 'none'
      }
      return this.data_.fillColor
    }
  }
}
</script>

<style>
text {
  text-anchor: middle;
  pointer-events: auto;
  /* Cancel the svg’s pointer-events */
  fill: currentColor;
}
</style>