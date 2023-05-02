import { useEffect, useMemo, useState } from "react";
import counterService from "../services/counter";

export const useCounterContext = <T>(selector: (state: any) => T) => {
  const snapshot = counterService.getSnapshot();
  const [stateFromMachine, setStateFromMachine] = useState<{
    value: any;
    context: T;
  }>({ value: snapshot.value, context: selector(snapshot.context) });

  useEffect(() => {
    const { unsubscribe } = counterService.subscribe((state) => {
      if (!state.changed) return;
      setStateFromMachine({
        value: state.value,
        context: selector(state.context)
      });
    });

    return () => {
      unsubscribe();
    };
  });

  return useMemo(() => {
    return stateFromMachine;
  }, [stateFromMachine]);
};
