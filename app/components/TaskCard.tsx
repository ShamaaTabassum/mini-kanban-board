"use client";

import { Draggable } from "@hello-pangea/dnd";
import React, { useCallback, useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { useBoard } from "../hooks/useBoard";
import { Task } from "../types/board";
import TaskForm from "./TaskForm";
import ConfirmationModal from "../ui/ConfirmationModal";

type TaskMode = 'view' | 'create' | 'edit';
type CompleteAction = 'save' | 'cancel';

interface TaskCardProps {
  task: Task;
  index: number;
  mode?: TaskMode;
  onComplete?: (action: CompleteAction) => void;
}

function TaskCard({ task, index, mode = 'view', onComplete }: TaskCardProps) {
  const { dispatch } = useBoard();
  const [isEditing, setIsEditing] = useState(mode !== 'view');
  const [editContent, setEditContent] = useState(task.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  }, [dispatch, task.id]);

  const handleSave = useCallback(() => {
    const content = editContent.trim();

    if (content) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...task, content }
      });
      setIsEditing(false);
      onComplete?.('save');
    } else if (mode === 'create') {
      dispatch({ type: "DELETE_TASK", payload: task.id });
      onComplete?.('cancel');
    } else {
      setEditContent(task.content);
      setIsEditing(false);
      onComplete?.('cancel');
    }
  }, [editContent, task, mode, dispatch, onComplete]);

  const handleCancel = useCallback(() => {
    if (mode === 'create' && !task.content) {
      dispatch({ type: "DELETE_TASK", payload: task.id });
    } else {
      setEditContent(task.content);
      setIsEditing(false);
    }
    onComplete?.('cancel');
  }, [mode, task, dispatch, onComplete]);

  if (isEditing) {
    return (
      <TaskForm
        value={editContent}
        onChange={setEditContent}
        onSave={handleSave}
        onCancel={handleCancel}
        autoFocus={mode === 'create'}
      />
    );
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`group bg-white rounded-lg border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${snapshot.isDragging
              ? "shadow-lg ring-2 ring-purple-200 ring-opacity-60"
              : "hover:border-purple-300"
              }`}
          >
            <div className="p-3 space-y-2 ">
              <p
                className="text-sm text-gray-900 leading-relaxed min-h-[20px] select-none"
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.content || "Untitled Task"}
              </p>

              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={handleEdit}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-150"
                  title="Edit task"
                >
                  <Edit3 size={14} className="text-blue-500" />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-1.5 rounded-md hover:bg-red-50 transition-colors duration-150"
                  title="Delete task"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.content}"?`}
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}


export default React.memo(TaskCard);