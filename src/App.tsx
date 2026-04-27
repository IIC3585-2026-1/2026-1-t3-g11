import { useState } from "react";
import { useImmerReducer } from "use-immer";
import Package from "./Package";
import { calculateKnapsack, type KnapsackSolution } from "./knapsack";

type State = {
  maxWeight: number;
  packages: Array<Package>;
};

type Action =
  | { type: "increase_package_count" }
  | { type: "decrease_package_count" }
  | { type: "change_max_weight"; maxWeight: number }
  | { type: "change_package_weight"; index: number; weight: number }
  | { type: "change_package_value"; index: number; value: number };

function reducer(draft: State, action: Action) {
  switch (action.type) {
    case "increase_package_count":
      draft.packages.push(new Package());
      break;

    case "decrease_package_count":
      draft.packages.pop();
      break;

    case "change_max_weight":
      draft.maxWeight = action.maxWeight;
      break;

    case "change_package_weight":
      draft.packages[action.index].weight = action.weight;
      break;

    case "change_package_value":
      draft.packages[action.index].value = action.value;
      break;

    default:
      throw new Error("Unknown reducer action");
  }
}

export default function App() {
  const [solution, setSolution] = useState<KnapsackSolution | null>(null);
  const [{ maxWeight, packages }, dispatch] = useImmerReducer(reducer, {
    maxWeight: 0,
    packages: [new Package()],
  });
  const packageCount = packages.length;

  const handleCalculate = () => {
    setSolution(calculateKnapsack(maxWeight, packages));
  };

  return (
    <article>
      <h1>Knapsack con Wasm</h1>
      <p className="subtitle">
        Simulacion de paquetes para maximizar valor sin superar el peso maximo.
      </p>

      <section>
        <h2>Configuracion</h2>
        <label>
          Peso maximo:
          <input
            type="number"
            value={maxWeight}
            onChange={(e) =>
              dispatch({
                type: "change_max_weight",
                maxWeight: Number(e.target.value),
              })
            }
          />
        </label>
      </section>

      <section>
        <h2>Paquetes</h2>
        <div className="controls-row">
          <button onClick={() => dispatch({ type: "increase_package_count" })}>
            +
          </button>
          <button
            onClick={() => dispatch({ type: "decrease_package_count" })}
            disabled={packageCount === 0}
          >
            -
          </button>
          <span className="badge">Total: {packageCount}</span>
        </div>

        <ol>
          {packages.map((p: Package, index) => (
            <li key={index} className="package-item">
              <strong>Item {index + 1}</strong>

              <label>
                Valor:
                <input
                  type="number"
                  value={p.value}
                  onChange={(e) =>
                    dispatch({
                      type: "change_package_value",
                      index,
                      value: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label>
                Peso:
                <input
                  type="number"
                  value={p.weight}
                  onChange={(e) =>
                    dispatch({
                      type: "change_package_weight",
                      index,
                      weight: Number(e.target.value),
                    })
                  }
                />
              </label>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Solucion</h2>
        <button className="calculate-btn" onClick={handleCalculate}>
          Calcular
        </button>

        {solution === null ? (
          <p className="empty-solution">Presiona calcular para ver el resultado.</p>
        ) : (
          <div className="solution-card">
            <p>
              <strong>Items elegidos:</strong>{" "}
              {solution.chosenItems.length > 0
                ? solution.chosenItems.map((item) => `item ${item}`).join(", ")
                : "ninguno"}
            </p>
            <p>
              <strong>Peso total:</strong> {solution.totalWeight}
            </p>
            <p>
              <strong>Valor total:</strong> {solution.totalValue}
            </p>
          </div>
        )}
      </section>
    </article>
  );
}
