import axios from 'axios';
import Equipment from './../../model/Equipment';
import Effect from './../../model/Effect';

export default {
  namespaced: true,
  state: () => ({
    equipment: null,
    reliquat: null,
  }),
  getters: {
    getEquipment: state => state.equipment,
  },
  actions: {
    setEquipment: async function({commit}, object) {
      try {
        const rune = (await axios.get(`https://fr.dofus.dofapi.fr/resources/${object.objectGID}`));
        if (rune.type === 'Rune de forgemagie') {
          return;
        }
      } catch (e) {}
      try {
        const data = (await axios.get(`https://fr.dofus.dofapi.fr/equipments/${object.objectGID}`)).data;
        const effects = object.effects.map(e => new Effect(e.ID, e.actionId, e.value));
        const equipment = new Equipment(
          object.objectGID,
          data.name,
          effects,
        )
        equipment.getEffects().forEach(e => {
          const stat = data.statistics.find(s => Object.keys(s)[0].includes(e.rune.name));
          e.setMin(Object.values(stat)[0].min).setMax(Object.values(stat)[0].max);
        })
        commit('SET_EQUIPMENT', equipment);
      } catch (err) {}
    },
    removeEquipment: async function({commit}, object) {
      commit('SET_EQUIPMENT', null);
    },
    compareStats: async function({commit, state}, object) {
      const modifs = [];
      const trash = [];
      state.equipment.effects.forEach((e, k) => {
        let find = false;
        object.objectInfo.effects.forEach(eff => {
          if (e.actionId === eff.actionId) {
            find = true;
            if (e.value !== eff.value) {
              modifs.push({
                id: eff.actionId,
                value: eff.value - e.value
              });
              state.equipment.effects[k].value = eff.value;
            }
          }
        })
        if(!find) {
          modifs.push({
            id: e.actionId,
            value: `-${e.value}`
          });
          trash.push(e.id);
        }
        state.equipment.effects = state.equipment.effects.map(e => !trash.includes(e.id));
        state.equipment.effects.forEach(e => {
          find = false;
          object.objectInfo.effects.forEach(eff => {
            if (e.actionId === eff.actionId) {
              find = true;
            }
          })
          if(!find) {

          }
        })
      })
    },
  },
  mutations: {
    SET_EQUIPMENT: async function(state, equipment) {
      state.equipment = equipment;
    },
  }
};
