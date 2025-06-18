"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/board";

type Props = {
  task: Task;
  index: number;
};

export default function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 mb-2 rounded shadow"
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
