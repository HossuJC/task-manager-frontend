import reducer, { login, logout } from "../authSlice";
import axios from "../../../api/axiosInstance";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

jest.mock("../../../api/axiosInstance");

describe("authSlice", () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("debería retornar el estado inicial", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("debería manejar login.pending", () => {
    const nextState = reducer(initialState, { type: login.pending.type });
    expect(nextState.loading).toBe(true);
  });

  it("debería manejar login.fulfilled", () => {
    const payload = {
      user: { username: "admin" },
      token: "fake_token",
    };
    const nextState = reducer(initialState, {
      type: login.fulfilled.type,
      payload,
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(payload.user);
    expect(nextState.token).toBe(payload.token);
  });

  it("debería manejar login.rejected", () => {
    const nextState = reducer(initialState, {
      type: login.rejected.type,
      payload: "Credenciales inválidas",
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Credenciales inválidas");
  });

  it("debería ejecutar login correctamente (caso exitoso)", async () => {
    const credentials = { username: "admin", password: "1234" };
    const mockResponse = {
      data: {
        user: { username: "admin" },
        access_token: "fake_token",
        token: "fake_token",
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    await store.dispatch(login(credentials));

    const state = store.getState();
    expect(state.user).toEqual({ username: "admin" });
    expect(state.token).toBe("fake_token");
    expect(localStorage.getItem("user")).toBe(JSON.stringify({ username: "admin" }));
    expect(localStorage.getItem("token")).toBe("fake_token");
  });

  it("debería ejecutar login con error (mensaje en detail[0].msg)", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          detail: [{ msg: "Usuario no encontrado" }],
        },
      },
    });

    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    await store.dispatch(login({ username: "wrong", password: "1234" }));

    const state = store.getState();
    expect(state.user).toBe(null);
    expect(state.token).toBe(null);
    expect(state.error).toBe("Usuario no encontrado");
  });

  it("debería ejecutar login con error (detail string)", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          detail: "Contraseña incorrecta",
        },
      },
    });

    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    await store.dispatch(login({ username: "admin", password: "wrong" }));

    const state = store.getState();
    expect(state.error).toBe("Contraseña incorrecta");
  });

  it("debería manejar logout correctamente", () => {
    localStorage.setItem("user", JSON.stringify({ username: "admin" }));
    localStorage.setItem("token", "token123");

    const prevState = {
      user: { username: "admin" },
      token: "token123",
      loading: false,
      error: null,
    };

    const nextState = reducer(prevState, logout());

    expect(nextState.user).toBe(null);
    expect(nextState.token).toBe(null);
    expect(localStorage.getItem("user")).toBe(null);
    expect(localStorage.getItem("token")).toBe(null);
  });
});
