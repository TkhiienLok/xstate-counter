import "./Counter.module.css";

import React, { useState } from "react";
import { useCounterContext } from "../../hooks/useCounterContext";
import { selectCount } from "../../machines/counter";
import counterService from "../../services/counter";

export function Counter() {
  const count = useCounterContext<CounterContext["value"]>(selectCount).context;
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className="row">
        <button
          className="button"
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
        <span className="value">{count}</span>
        <button
          className="button"
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
      <div className="row">
        <input
          className="textbox"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="button"
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
          className="asyncButton"
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
          className="button"
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
