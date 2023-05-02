import styles from "./Counter.module.css";

import React, { useState } from "react";
import { useCounterState } from "../../hooks/useCounterState";
import { selectCount } from "../../machines/counter";
import counterService from "../../services/counter";

export function Counter() {
  const count = useCounterState<CounterContext["value"]>(selectCount).context;
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() =>
            counterService.send({
              type: "DECREMENT",
              payload: {}
            })
          }
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() =>
            counterService.send({
              type: "INCREMENT",
              payload: {}
            })
          }
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            counterService.send({
              type: "INCREMENT_BY_AMOUNT",
              payload: { amount: incrementValue }
            })
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() =>
            counterService.send({
              type: "INCREMENT_BY_AMOUNT_ASYNC",
              payload: {
                amount: incrementValue
              }
            })
          }
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() =>
            counterService.send({
              type: "INCREMENT_IF_ODD",
              payload: {
                amount: incrementValue
              }
            })
          }
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
