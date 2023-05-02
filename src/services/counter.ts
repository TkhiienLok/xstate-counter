import { interpret, Interpreter } from "xstate";
import counterMachine, { CounterEvents } from "../machines/counter";

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
  if (!service) {
    service = interpret(counterMachine).start();
  }
  return service;
};

export default initCounterService();
