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
import { Loader2 } from "lucide-react";
import Loader from "./ui/Loader";

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

if (isLoading) {
  console.log("Loading...");
 return <Loader />;
}

if (error) {
    return (
      <p>Error...</p>
    );
  }

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
    <div className="min-h-screen  flex justify-center items-start">
      <div className="lg:max-w-7xl lg:w-full w-[70%] py-8">
        <h1 className="text-2xl font-bold text-violet-800 mb-8 text-center">
          MINI KANBAN BOARD
        </h1>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col lg:flex-row justify-center xl:gap-6 gap-4">
            {state.columns.map((col) => (
              <Column key={col.id} column={col} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
