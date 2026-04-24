import type Package from "./Package";

interface KnapsackSolution {
  chosenItems: Number[];
  totalWeight: Number;
  totalValue: Number;
}

export function calculateKnapsack(
  maxWeight: Number,
  packages: Package[],
): KnapsackSolution {
  console.log(maxWeight, packages);
  // TODO webasm
  return {
    chosenItems: [0, 2],
    totalWeight: 1,
    totalValue: 0,
  };
}
