import { defineStore } from "pinia";

export const useAddress = defineStore("address", {
    state: () => ({
        addresses: [],
        lastId: 0,
    }),
    getters: {
        allAdrs: (state) => state.addresses,
    },
    actions: {
        addAddress(adr) {
            this.lastId += 1;
            adr.id = this.lastId;
            this.addresses.push(adr);
        },
        getAdrById(id) {
            return this.addresses.find((address) => address.id === id);
        },
        updateAddress(updatedAdr) {
            const index = this.addresses.findIndex((address) => address.id === updatedAdr.id);
            if (index !== -1) {
                this.addresses[index] = updatedAdr;
            }
        },
        removeAddress(id) {
            this.addresses = this.addresses.filter((address) => address.id !== id);
        }
    },
});