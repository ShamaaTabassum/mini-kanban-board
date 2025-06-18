"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/board";
import React from "react";

type Props = {
  task: Task;
  index: number;
};

function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 mb-2 rounded shadow hover:cursor-grab"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}
export default React.memo(TaskCard);