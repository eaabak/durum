import { create } from "../library/src";

interface CalculatorState {
  display: string;
  previousValue: string | null;
  operator: string | null;
  clear: () => void;
  input: (value: string) => void;
  setOperator: (operator: string) => void;
  calculate: () => void;
}

export const useCalculator = create<CalculatorState>(
  (set) => ({
    display: "0",
    previousValue: null,
    operator: null,
    clear: () =>
      set(() => ({
        display: "0",
        previousValue: null,
        operator: null,
      })),
    input: (value: string) =>
      set((state) => ({
        display: state.display === "0" ? value : state.display + value,
      })),
    setOperator: (operator: string) =>
      set((state) => ({
        operator,
        previousValue: state.display,
        display: "0",
      })),
    calculate: () =>
      set((state) => {
        if (!state.previousValue || !state.operator) return state;

        const currentValue = parseFloat(state.display);
        const previousValue = parseFloat(state.previousValue);

        let result: number;
        switch (state.operator) {
          case "+":
            result = previousValue + currentValue;
            break;
          case "-":
            result = previousValue - currentValue;
            break;
          case "*":
            result = previousValue * currentValue;
            break;
          case "/":
            result = currentValue === 0 ? NaN : previousValue / currentValue;
            break;
          default:
            return state;
        }

        return {
          display: isNaN(result) ? "Error" : result.toString(),
          previousValue: null,
          operator: null,
        };
      }),
  }),
  [],
  "CalculatorStore"
);
