import { create } from "../library/src";

interface CountdownState {
  timeLeft: number;
  startCountdown: (duration: number) => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

export const useCountdown = create<CountdownState>(
  (set) => {
    let timer: NodeJS.Timeout | null = null;

    const updateCountdown = () => {
      set((state) => {
        if (state.timeLeft <= 0 && timer) {
          clearInterval(timer);
          timer = null;
          return { timeLeft: 0 };
        }
        return { timeLeft: state.timeLeft - 1 };
      });
    };

    return {
      timeLeft: 0,
      startCountdown: (duration: number) => {
        set(() => ({ timeLeft: duration }));
        if (timer) clearInterval(timer);
        timer = setInterval(updateCountdown, 1000);
      },
      stopCountdown: () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      resetCountdown: () => {
        set(() => ({ timeLeft: 0 }));
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      },
    };
  },
  [],
  "CountdownStore"
);
