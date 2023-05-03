import "./styles.css";
import { Counter } from "./components/Counter";
import "./App.css";
import logo from "./assets/images/logo.svg";
import { Header } from "./components/Header";

function Content() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <Counter />
      </header>
    </div>
  );
}

function App() { // can wrap here with providers
  return (
      <Content />
  );
}
export default App;
