<template>
  <button
    :type="type"
    class="
      inline-flex align-center justify-center
      rounded-lg
      font-medium tracking-wide
    "
    :class="{
      [`bg-${color}-50 text-${color}-500 hover:bg-${color}-100`]: !disabled && !dark,
      [`bg-${color}-500 text-white hover:bg-${color}-600`]: !disabled && dark,
      'bg-gray-100 text-gray-500 pointer-events-none cursor-not-allowed': disabled && !dark,
      'px-5 py-3': !small && !extrasmall,
      'px-3 py-2': small && !extrasmall,
      'px-2 py-1': extrasmall,
    }"
    @click="$emit('click')"
  >
    <div class="mr-2 text-xl">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
    <div class="ml-2 text-xl">
      <slot name="append"></slot>
    </div>
  </button>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'InputButton',
  props: {
    type: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'blue',
    },
    small: {
      type: Boolean,
      default: false,
    },
    extrasmall: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    }
  },
})
</script>
