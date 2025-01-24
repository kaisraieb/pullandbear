import { defineStore } from "pinia";

export const useOpenedPanelStore = defineStore('openedPanel', {
  state: () => ({
    openedVoirPaneir: false,
    openedCartPanel: false,
  }),
  getters: {
    getOpenedVoirPaneir: (state) => state.openedVoirPaneir,
    getOpenedCartPanel: (state) => state.openedCartPanel,
  },
  actions: {
    setOpenedCartPanel(value) {
      this.openedCartPanel = value
    }
  },
});