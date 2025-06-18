export const fetchBoard = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    columns: [
      { id: "todo", title: "To Do" },
      { id: "in-progress", title: "In Progress" },
      { id: "done", title: "Done" },
    ],
    tasks: [
      { id: "task-1", columnId: "todo", content: "Analyze user feedback", position: 0 },
      { id: "task-2", columnId: "in-progress", content: "Develop dark mode", position: 0 },
    ],
  };
};
