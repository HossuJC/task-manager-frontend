import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskCard from "../TaskCard";
import axios from "../../api/axiosInstance";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";

jest.mock("../../api/axiosInstance");
jest.mock("../../redux/slices/tasksSlice", () => ({
  fetchTasks: () => ({ type: "tasks/fetchTasks/fake" }),
}));

const mockStore = configureStore([thunk]);

describe("TaskCard", () => {
  let store;
  const task = {
    _id: "1",
    title: "Test Task",
    description: "Test Description",
    status: "todo",
  };

  beforeEach(() => {
    store = mockStore({});
    axios.put.mockResolvedValue({});
    axios.delete.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza la información de la tarea", () => {
    render(
      <Provider store={store}>
        <TaskCard task={task} />
      </Provider>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /eliminar/i })).toBeInTheDocument();
  });

  test("cambia el estado de la tarea", async () => {
    render(
      <Provider store={store}>
        <TaskCard task={task} />
      </Provider>
    );
  
    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select); // abre el menú desplegable
  
    const option = await screen.findByRole("option", { name: /completada/i });
    fireEvent.click(option);
  
    await waitFor(() =>
      expect(axios.put).toHaveBeenCalledWith("/tasks/1", {
        ...task,
        status: "completed",
      })
    );
  
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "tasks/fetchTasks/fake" });
  });

  test("elimina la tarea", async () => {
    render(
      <Provider store={store}>
        <TaskCard task={task} />
      </Provider>
    );

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith("/tasks/1"));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "tasks/fetchTasks/fake" });
  });
});
