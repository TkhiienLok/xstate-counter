import { useCounterState } from "../../hooks/useCounterState";
import { selectCount } from "../../machines/counter";

export function Header() {
    const count = useCounterState<CounterContext["value"]>(selectCount).context;

    return <div>
        <h2>
            I also know about counter number {count}
        </h2>
    </div>
}