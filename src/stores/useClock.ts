import { create } from "../library/src";

interface ClockState {
  time: string;
  startClock: () => void;
  stopClock: () => void;
}

export const useClock = create<ClockState>(
  (set) => {
    let timer: NodeJS.Timeout | null = null;

    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      set(() => ({ time: timeString }));
    };

    return {
      time: new Date().toLocaleTimeString(),
      startClock: () => {
        if (timer) return;
        timer = setInterval(updateClock, 1000);
      },
      stopClock: () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      },
    };
  },
  [],
  "ClockStore"
);
