import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import * as taskSlice from "../../redux/slices/tasksSlice";

jest.mock("../TaskCard", () => ({ task }) => (
  <div data-testid="task-card">{task.title}</div>
));

const mockStore = configureStore([thunk]);

describe("TaskList", () => {
  let store;
  let fetchTasksSpy;

  beforeEach(() => {
    fetchTasksSpy = jest.spyOn(taskSlice, "fetchTasks").mockReturnValue({ type: "tasks/fetchTasks/fake" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithStore = (state) => {
    store = mockStore(state);
    return render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
  };

  test("despacha fetchTasks al montar", () => {
    renderWithStore({
      tasks: { tasks: [], loading: false, error: null },
    });

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "tasks/fetchTasks/fake" });
  });

  test("muestra loader cuando loading es true", () => {
    renderWithStore({
      tasks: { tasks: [], loading: true, error: null },
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("muestra mensaje de error si hay un error", () => {
    renderWithStore({
      tasks: { tasks: [], loading: false, error: "Algo salió mal" },
    });

    expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
  });

  test("renderiza una lista de tareas", () => {
    const mockTasks = [
      { id: "1", title: "Tarea 1", description: "Desc 1", status: "todo" },
      { id: "2", title: "Tarea 2", description: "Desc 2", status: "completed" },
    ];

    renderWithStore({
      tasks: { tasks: mockTasks, loading: false, error: null },
    });

    const cards = screen.getAllByTestId("task-card");
    expect(cards.length).toBe(2);
    expect(cards[0]).toHaveTextContent("Tarea 1");
    expect(cards[1]).toHaveTextContent("Tarea 2");
  });
});
