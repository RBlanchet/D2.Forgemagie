import { io } from "socket.io-client";

export default {
  namespaced: true,
  state: () => ({
    io: false,
    messages: [],
  }),
  getters: {
    isConnected: (state) => state.io,
    messages: state => state.messages,
  },
  actions: {
    connect: async function({dispatch, commit}) {
      const socket = io('http://localhost:8080')

      socket.on('connect', function() {
        console.log('[Socket Client] Connection effectuée, démarrage de l\'interception des packets');
        commit('SET_IO', true);
      });

      socket.on("disconnect", function() {
        console.log('[Socket Client] Deconnecter');
        commit('SET_IO', false);
      });

      socket.on('message', async function(data) {
        switch (data.message) {
          case 'ExchangeObjectAddedMessage':
            dispatch('mage/setEquipment', data.content.object, {root:true});
            break;
          case 'ExchangeObjectRemovedMessage':
            break;
          case 'ExchangeCraftResultMagicWithObjectDescMessage':
            dispatch('mage/compareStats', data.content, {root: true});
            console.log(data);
            break;
        }
        if (
          data.message === 'ExchangeObjectAddedMessage' ||
          data.message === 'ExchangeObjectRemovedMessage' ||
          data.message === 'ExchangeStartOkCraftWithInformationMessage' ||
          data.message === 'ExchangeCraftResultMagicWithObjectDescMessage'
        ) {

          commit('ADD_MESSAGE', data);
        }
      });
    },
  },
  mutations: {
    SET_IO: function(state, io) {
      state.io = io;
    },
    ADD_MESSAGE: function(state, message) {
      state.messages.push(message);
    },
  }
}
