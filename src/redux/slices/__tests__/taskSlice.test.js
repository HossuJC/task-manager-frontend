import reducer, { fetchTasks } from "../tasksSlice";
import axios from "../../../api/axiosInstance";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

jest.mock("../../../api/axiosInstance");

describe("tasksSlice", () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };

  it("debería retornar el estado inicial", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("debería manejar fetchTasks.pending", () => {
    const nextState = reducer(initialState, { type: fetchTasks.pending.type });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("debería manejar fetchTasks.fulfilled", () => {
    const mockTasks = [{ id: 1, title: "Tarea" }];
    const nextState = reducer(initialState, {
      type: fetchTasks.fulfilled.type,
      payload: mockTasks,
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.tasks).toEqual(mockTasks);
  });

  it("debería manejar fetchTasks.rejected", () => {
    const nextState = reducer(initialState, {
      type: fetchTasks.rejected.type,
      payload: "Error de red",
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Error de red");
  });

  it("debería ejecutar correctamente fetchTasks (caso exitoso)", async () => {
    const mockTasks = [{ id: 1, title: "Mock task" }];
    axios.get.mockResolvedValueOnce({ data: mockTasks });

    const store = configureStore({
      reducer: reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    await store.dispatch(fetchTasks());

    const state = store.getState();
    expect(state.tasks).toEqual(mockTasks);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("debería ejecutar correctamente fetchTasks (caso con error)", async () => {
    axios.get.mockRejectedValueOnce({ response: { data: "Fallo de servidor" } });

    const store = configureStore({
      reducer: reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    await store.dispatch(fetchTasks());

    const state = store.getState();
    expect(state.tasks).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Fallo de servidor");
  });
});
