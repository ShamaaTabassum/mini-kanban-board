"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Column as ColumnType} from "../types/board";
import TaskCard from "./TaskCard";
import { useBoard } from "../hooks/useBoard";
import React from "react";

type Props = {
  column: ColumnType;
};

 function Column({ column }: Props) {
  const { state } = useBoard();
  const tasks = state.tasks.filter(
    (task) => task.columnId === column.id
  ).sort((a, b) => a.position - b.position);

  return (
    <div className="bg-gray-100 p-4 rounded w-80">
      <h2 className="text-lg font-bold mb-2">{column.title}</h2>
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="bg-gray-100 py-8 rounded-md min-w-[250px]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
  );
}
export default React.memo(Column);