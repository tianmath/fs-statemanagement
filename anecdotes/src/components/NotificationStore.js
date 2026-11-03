import { create } from 'zustand';

const timeout = 5000;

const useNotificationStore = create((set, get) => ({
  message: '',
  messageTimer: null,
  actions: {
    setMessage: (message) => {
      let messageTimer = get().messageTimer;
      if (messageTimer !== null) clearTimeout(messageTimer);

      set(() => ({ message }));
      messageTimer = setTimeout(() => {
        set(() => ({ message: '', messageTimer: null }));
      }, timeout);
      set(() => ({ messageTimer }));
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.message);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
