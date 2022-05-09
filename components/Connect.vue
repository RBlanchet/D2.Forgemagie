<template>
  <div class="flex flex-col justify-center mt-40 items-center">
    <img class="w-44 m-auto" src="https://upload.wikimedia.org/wikipedia/fr/a/a3/Dofus_emeraude.png" alt="Dofus">
    <h1 class="text-xl font-bold">Connection au client</h1>
    <p class="text-base mt-4">Votre client n'est pas encore connecté, veuillez patienter</p>
  </div>
</template>

<script>
import Vue from 'vue';
import {mapActions} from 'vuex';

export default Vue.extend({
  name: "connect",
  methods: {
    ...mapActions({
      'connectInterceptor': 'interceptor/connect',
    })
  },
  mounted: async function() {
    await this.connectInterceptor();
  },
})
</script>

<style scoped>

</style>
