// src/store.ts
import { create } from 'zustand';

interface StoreState {
	menuOpen: boolean;
	setMenu: (open: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
	menuOpen: false,
	setMenu: (open) => set(() => ({ menuOpen: open })),
}));

export default useStore;
