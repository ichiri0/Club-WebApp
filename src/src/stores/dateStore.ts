import { defineStore } from 'pinia'

export const useDateStore = defineStore('date', {
  state: () => ({
    selectedDate: null as Date | null,
  }),
  actions: {
    setDate(date: Date) {
      this.selectedDate = date
    },
  },
})
