import "./styles.css";
import { Counter } from "./components/Counter";
import { CounterStateProvider } from "./providers/Counter";
import "./App.css";
import logo from "./assets/images/logo.svg";

function Content() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

function App() {
  return (
    <CounterStateProvider>
      <Content />
    </CounterStateProvider>
  );
}
export default App;
