import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export type THistoryLocationStateLastPath = {
  lastPathName?: string;
};
