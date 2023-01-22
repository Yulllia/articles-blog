import { atom, selector } from "recoil";
import { ICard } from "../../interfaces/interface";

export const mySelector = selector({
  key: "selectorList",
  get: ({ get }) => {
    const data = get(allListState);
    return data;
  },
});

export const allListState = atom({
  key: "allListState",
  default: [] as Array<ICard>,
});

export const filterListState = atom({
  key: "filterListState",
  default: mySelector,
});

export const wordInputState = atom({
  key: "wordInputState",
  default: "",
});

export const loadingState = atom({
    key: "loadingState",
    default: false,
  });
