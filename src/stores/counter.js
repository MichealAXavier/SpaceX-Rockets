import { defineStore } from 'pinia';

export const useMyStore = defineStore({
  id: 'selectrocket',
  state: () => (
    {
      selectedRocket:{}
    }
  ),

  actions: {
    setSelectedCard(card) {
    this.selectedRocket = card
    },
    clearSelectedCard() {
      this.selectedRocket = {}
    }
   
  }
});
