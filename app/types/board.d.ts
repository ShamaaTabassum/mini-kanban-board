export interface Column {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  columnId: string;
  content: string;
  position: number;
}

export interface BoardState {
  columns: Column[];
  tasks: Task[];
}

export type BoardAction =
  | { type: "SET_BOARD"; payload: BoardState }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "MOVE_TASK"; payload: { id: string; columnId: string; position: number } };


