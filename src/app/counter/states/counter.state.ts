export interface counterState {
  counter: number;
  toggle: boolean;
}

export const initialState: counterState = {
  counter: 0,
  toggle: false,
};
