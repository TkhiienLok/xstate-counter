import { assign, createMachine, MachineConfig } from "xstate";
import { fetchCount } from "../counterApi";

enum CounterStates {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE"
}

type CounterSchema = {
  context: CounterContext;
  states: {
    [CounterStates.IDLE]: {};
    [CounterStates.LOADING]: {};
    [CounterStates.FAILURE]: {};
  };
};

export type CounterEvents =
  | { type: "INCREMENT"; payload: {} }
  | { type: "DECREMENT"; payload: {} }
  | { type: "INCREMENT_BY_AMOUNT"; payload: { amount: number } }
  | { type: "INCREMENT_BY_AMOUNT_ASYNC"; payload: { amount: number } }
  | { type: "INCREMENT_IF_ODD"; payload: { amount: number } }
  | { type: "BACK"; payload: {} };

const machineConfig: MachineConfig<
  CounterContext,
  CounterSchema,
  CounterEvents
> = {
  id: "counter",
  initial: CounterStates.IDLE,
  predictableActionArguments: true,
  preserveActionOrder: true,
  context: {
    value: 0
  },
  states: {
    [CounterStates.IDLE]: {
      on: {
        INCREMENT: {
          actions: assign((context, _) => ({
            ...context,
            value: context.value + 1
          }))
        },
        DECREMENT: {
          actions: assign((context, _) => ({
            ...context,
            value: context.value - 1
          }))
        },
        INCREMENT_BY_AMOUNT: {
          actions: assign((context, event) => ({
            ...context,
            value: context.value + event.payload.amount
          }))
        },
        INCREMENT_BY_AMOUNT_ASYNC: { target: CounterStates.LOADING },
        INCREMENT_IF_ODD: {
          actions: ["incrementIfOdd"]
        }
      }
    },
    [CounterStates.LOADING]: {
      invoke: {
        id: "loadAmount",
        src: "loadAmount",
        onError: {
          target: CounterStates.IDLE
        },
        onDone: {
          target: CounterStates.IDLE,
          actions: assign((context, event) => ({
            ...context,
            value: context.value + event.data // + event.payload.amount
          }))
        }
      }
      // could add manual timeout, and target e.g. failure.timeout state
    },
    [CounterStates.FAILURE]: {
      on: {
        BACK: {
          target: CounterStates.IDLE
        }
        // could have added RETRY action
      }
    }
  }
};

export function selectCount(state: CounterContext) {
  return state.value;
}

export default createMachine(machineConfig, {
  services: {
    loadAmount: async (_, event: CounterEvents) => {
      const response = await fetchCount((event.payload as any).amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  },
  actions: {
    incrementIfOdd: assign((context, event: CounterEvents) => {
      const currentValue = selectCount(context);
      if (currentValue % 2 === 1) {
        return {
          ...context,
          value: context.value + (event.payload as { amount: number }).amount
        };
      }
      return context;
    })
  }
});
