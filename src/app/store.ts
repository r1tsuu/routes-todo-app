import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { pathsApi } from "../services/pathsApi";

export const store = configureStore({
  reducer: {
    [pathsApi.reducerPath]: pathsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pathsApi.middleware),
});

setupListeners(store.dispatch);
