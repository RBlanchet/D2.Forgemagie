<template>
  <div>
    <div v-if="!equipment">
      <h1>Veuillez selectionner un item</h1>
    </div>
    <div v-else>
      <h1>Objet chargé : {{ equipment.name }}</h1>
      <ul class="mt-4">
        <li v-for="e in equipment.effects">{{ e.rune.name }} : {{ e.value }} (min: {{ e.min }} - {{ e.max }})</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

export default Vue.extend({
  name: 'IndexPage',
  computed: {
    ...mapGetters({
      equipment: 'mage/getEquipment',
    }),
  },
})
</script>
