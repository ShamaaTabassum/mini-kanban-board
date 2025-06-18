"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBoard } from "./lib/mockApi";
import { useBoard } from "./hooks/useBoard";
import Column from "./components/Column";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";

export default function Board() {
  const { state, dispatch } = useBoard();

  const { data, isLoading, error } = useQuery({
    queryKey: ["board"],
    queryFn: fetchBoard,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_BOARD", payload: data });
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading board.</div>;

  // Handler when drag ends:
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update columnId when moved:
    dispatch({
      type: "MOVE_TASK",
      payload: {
        id: draggableId,
        columnId: destination.droppableId,
        position: destination.index,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 p-4 overflow-x-auto">
        {state.columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DragDropContext>
  );
}
