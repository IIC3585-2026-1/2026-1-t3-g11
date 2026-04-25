declare type IntVector = {
  push_back(value: number): void;
  delete(): void;
};

declare type KnacksackModule = {
  IntVector: {
    new (): IntVector;
  };
  knapsack: (maxWeight: number, values: IntVector, weights: IntVector) => number;
};

declare function createKnacksackModule(): Promise<KnacksackModule>;

export default createKnacksackModule;
