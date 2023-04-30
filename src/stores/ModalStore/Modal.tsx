import {create} from 'zustand';
import {TModal} from './Modal.type';

export const Modal = create<TModal>(set => ({
  loadingModal: false,
  setLoadingModal: (loadingModal: boolean) => set({loadingModal}),
  errorModal: false,
  setErrorModal: (errorModal: boolean) => set({errorModal}),
}));
