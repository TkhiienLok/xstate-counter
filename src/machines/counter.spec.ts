import counterMachine, {CounterEvents} from "./counter";
  
  describe('counter reducer', () => {
    const initialState = {
      value: 3,
    };
    it('should handle initial state', () => {
      // actually the machine dies not recognize unknown actions 
      //@ts-ignore
      const stateAfterUnknownAction = counterMachine.transition("IDLE", { type: 'unknown' }, undefined);
      
      expect(stateAfterUnknownAction.matches("IDLE")).toBeTruthy();
      expect(stateAfterUnknownAction.context).toEqual({
        value: 0
      })

    });
  
    it('should handle increment', () => {
      const stateAfterIncrement = counterMachine.transition("IDLE", { type: "INCREMENT" } as CounterEvents, initialState);

      expect(stateAfterIncrement.context.value).toEqual(4);

    });
  
     it('should handle decrement', () => {
      const stateAfterIncrement = counterMachine.transition("IDLE", { type: "DECREMENT" } as CounterEvents, initialState);

      expect(stateAfterIncrement.context.value).toEqual(2);
     });
  
     it('should handle incrementByAmount', () => {
      const stateAfterDecrement = counterMachine.transition("IDLE", { type: "INCREMENT_BY_AMOUNT", payload: { amount: 2 } } as CounterEvents, initialState);

      expect(stateAfterDecrement.context.value).toEqual(5);
     });

     it('increments if number is odd', () => {
      let stateAfterIncrement = counterMachine.transition("IDLE", { type: "INCREMENT_IF_ODD", payload: { amount: 1 } } as CounterEvents, {
        value: 7,
      });

      expect(stateAfterIncrement.context.value).toEqual(8);

      stateAfterIncrement = counterMachine.transition("IDLE", { type: "INCREMENT_IF_ODD", payload: { amount: 1 } } as CounterEvents, {
        value: 8,
      });
      expect(stateAfterIncrement.context.value).toEqual(8);
     });
  });
  