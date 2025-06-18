"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { BoardAction, BoardState ,Task } from "../types/board";

const initialState: BoardState = {
  columns: [],
  tasks: [],
};

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "SET_BOARD":
      return action.payload;

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t: Task) => t.id === action.payload.id ? action.payload : t)
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t: Task) => t.id !== action.payload)
      };

   case "MOVE_TASK": {
  const { id, columnId, position } = action.payload;
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return state;

  // Remove old task
  let newTasks = state.tasks.filter((t) => t.id !== id);

  // Update task properties
  const updatedTask = { ...task, columnId, position };

  // Insert in correct place in new column
  const tasksInTarget = newTasks
    .filter((t) => t.columnId === columnId)
    .sort((a, b) => a.position - b.position);

  tasksInTarget.splice(position, 0, updatedTask);

  // Reassign correct positions to all tasks in that column
  const reordered = tasksInTarget.map((t, idx) => ({ ...t, position: idx }));

  // Keep tasks in other columns as-is, combine
  newTasks = [
    ...newTasks.filter((t) => t.columnId !== columnId),
    ...reordered,
  ];

  return { ...state, tasks: newTasks };
}

    default:
      return state;
  }
}

export const BoardContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
} | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}