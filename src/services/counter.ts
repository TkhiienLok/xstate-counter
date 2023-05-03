import { interpret } from "xstate-ninja";
import counterMachine, { CounterEvents } from "../machines/counter";
import { Interpreter } from "xstate";

type CounterService = Interpreter<
  CounterContext,
  any,
  CounterEvents,
  {
    value: any;
    context: CounterContext;
  },
  any
>;

let service: CounterService;
export const initCounterService = () => {
  console.log("INIT service");
  if (!service) {
    service = interpret(counterMachine, { devTools: true }).start();
  }
  return service;
};

export default initCounterService();
