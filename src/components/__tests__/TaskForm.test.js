import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskForm from "../TaskForm";
import axios from "../../api/axiosInstance";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";

jest.mock("../../redux/slices/tasksSlice", () => ({
  fetchTasks: () => ({ type: "tasks/fetchTasks/fake" }),
}));

jest.mock("../../api/axiosInstance");

const mockStore = configureStore([thunk]);

describe("TaskForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    axios.post.mockResolvedValueOnce({});
  });

  test("actualiza los campos de texto y envía el formulario", async () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    const titleInput = screen.getByLabelText(/título/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const submitButton = screen.getByRole("button", { name: /agregar/i });

    fireEvent.change(titleInput, { target: { value: "Tarea de prueba" } });
    fireEvent.change(descriptionInput, { target: { value: "Descripción de prueba" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual({ type: "tasks/fetchTasks/fake" });
    });
  });
});
