import { useImmerReducer } from "use-immer";
import Package from "./Package";
import { calculateKnapsack } from "./knapsack";
import { useState } from "react";

function reducer(
  draft: { maxWeight: Number; packages: Array<Package> },
  action: any,
) {
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
  const [solution, setSolution] = useState(null);
  const [{ maxWeight, packages }, dispatch] = useImmerReducer(reducer, {
    maxWeight: 0,
    packages: [new Package()],
  });
  const packageCount = packages.length;

  const handleCalculate = () => {
    // TODO verificar que todos los datos sean números
    const solution = calculateKnapsack(maxWeight, packages);
    console.log(solution);
    // TODO mostrar solución
  };

  return (
    <article>
      <h2>Configuración</h2>
      <label>
        Peso máximo:
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

      <section>
        Paquetes:
        <button onClick={() => dispatch({ type: "increase_package_count" })}>
          +
        </button>
        <button
          onClick={() => dispatch({ type: "decrease_package_count" })}
          disabled={packageCount === 0}
        >
          -
        </button>
        <ol>
          {packages.map((p: Package, index) => {
            return (
              <li key={index}>
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
            );
          })}
        </ol>
        <button onClick={() => dispatch({ type: "increase_package_count" })}>
          +
        </button>
        <button
          onClick={() => dispatch({ type: "decrease_package_count" })}
          disabled={packageCount === 0}
        >
          -
        </button>
      </section>

      <section>
        <h2>Solución</h2>
        <button onClick={handleCalculate}>Calcular</button>
        {solution !== null ? "TODO" : "TODO"}
      </section>
    </article>
  );
}
