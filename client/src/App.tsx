import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import api from "./services/api";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { increment } from "./store/slices/counterSlice";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUsers() {
      const users = await api.get("/users");

      console.log(users);
    }

    getUsers();
  }, []);

  return (
    <div className="main-wrapper">
      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="d-flex flex-column align-center text-center">
              <div className="d-flex align-center gap-8 mb-8">
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="w-24 h-24" alt="React logo" />
                </a>
              </div>
              <h1 className="mb-8">Vite + React</h1>
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <button className="btn btn--primary mb-4" onClick={() => dispatch(increment())}>
                  count is {count}
                </button>
                <p className="text-secondary">
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="text-muted">Click on the Vite and React logos to learn more</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
