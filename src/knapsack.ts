import type Package from "./Package";

export interface KnapsackSolution {
  chosenItems: number[];
  totalWeight: number;
  totalValue: number;
}

export function calculateKnapsack(
  maxWeight: number,
  packages: Package[],
): KnapsackSolution {
  const capacity = Math.max(0, Math.floor(Number(maxWeight) || 0));
  const items = packages.map((item) => ({
    weight: Math.max(0, Math.floor(Number(item.weight) || 0)),
    value: Math.max(0, Math.floor(Number(item.value) || 0)),
  }));

  const n = items.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0),
  );
  const take: boolean[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(false),
  );

  for (let i = 1; i <= n; i += 1) {
    const { weight, value } = items[i - 1];
    for (let cap = 0; cap <= capacity; cap += 1) {
      const skipValue = dp[i - 1][cap];

      if (weight <= cap) {
        const takeValue = dp[i - 1][cap - weight] + value;
        if (takeValue > skipValue) {
          dp[i][cap] = takeValue;
          take[i][cap] = true;
        } else {
          dp[i][cap] = skipValue;
        }
      } else {
        dp[i][cap] = skipValue;
      }
    }
  }

  const chosenItems: number[] = [];
  let remainingCapacity = capacity;
  let totalWeight = 0;

  for (let i = n; i >= 1; i -= 1) {
    if (take[i][remainingCapacity]) {
      chosenItems.push(i);
      totalWeight += items[i - 1].weight;
      remainingCapacity -= items[i - 1].weight;
    }
  }

  chosenItems.reverse();

  return {
    chosenItems,
    totalWeight,
    totalValue: dp[n][capacity],
  };
}
