// src/popup.ts
import { create } from 'zustand';

type ProcessTypes = 'neutral' | 'success' | 'error';

interface StoreState {
	showMessage: boolean;
	message?: string;
	title?: string;
	type: ProcessTypes;
	setMessageAndType: (
		message: string,
		title: string,
		type?: ProcessTypes
	) => void;
	hideMessage: () => void;
}

const usePopupStore = create<StoreState>((set) => ({
	showMessage: false,
	type: 'success',
	setMessageAndType: (message: string, title: string, type?: ProcessTypes) =>
		set(() => ({ message, title, type: type ?? 'neutral', showMessage: true })),
	hideMessage: () => set(() => ({ showMessage: false })),
}));

export default usePopupStore;
