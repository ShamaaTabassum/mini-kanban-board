"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Column as ColumnType } from "../types/board";
import TaskCard from "./TaskCard";
import { useBoard } from "../hooks/useBoard";
import React, { useCallback, useRef } from "react";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  column: ColumnType;
};

function Column({ column }: Props) {
  const { state, dispatch } = useBoard();
  const newTaskIdRef = useRef<string | null>(null);
  const tasks = state.tasks.filter(
    (task) => task.columnId === column.id
  ).sort((a, b) => a.position - b.position);

  const handleAddTask = useCallback(() => {
    const newTaskId = uuidv4();
    newTaskIdRef.current = newTaskId;

    const newTask = {
      id: newTaskId,
      content: "",
      columnId: column.id,
      position: tasks.length,
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
  }, [column.id, tasks.length, dispatch]);

  const handleTaskComplete = useCallback((taskId: string) => () => {
    if (newTaskIdRef.current === taskId) {
      newTaskIdRef.current = null;
    }
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded lg:w-80 ">
      <div className="flex items-center justify-between mb-3 border-b-2 border-purple-200 pb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
            {column.title}
          </h2>
          <div className=" bg-purple-100  text-purple-500 text-xs font-medium rounded-full h-6 min-w-[24px] flex items-center justify-center px-2">
            {tasks.length}
          </div>
        </div>
        <button
          onClick={handleAddTask}
          className="group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-purple-100 transition-all duration-200"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus size={16} className="text-purple-500 group-hover:text-purple-600 transition-colors cursor-pointer" />

        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (<div className="bg-gray-100 py-2 rounded-md sm:min-w-[250px] w-full flex flex-col justify-center  gap-3" ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center py-4 text-gray-400">
              <p className="text-md font-medium text-center">No tasks yet</p>
             </div>
          ) : (
            tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                mode={newTaskIdRef.current === task.id ? 'create' : 'view'}
                onComplete={handleTaskComplete(task.id)}
              />
            ))
          )}
          {provided.placeholder}
        </div>)}
      </Droppable>
    </div>);
}
export default React.memo(Column);