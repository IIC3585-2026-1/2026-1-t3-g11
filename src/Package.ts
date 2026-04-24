import { immerable } from "immer";

export default class Package {
  [immerable] = true;
  weight: number = 0;
  value: number = 0;
}
