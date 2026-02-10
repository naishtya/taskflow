"use client";

import { useState } from "react";
import Column from "./Column";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

type Status = "todo" | "doing" | "done";

type Task = {
  id: number;
  title: string;
  status: Status;
};

type ModalMode = "add" | "edit" | "delete";

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [activeStatus, setActiveStatus] = useState<Status>("todo");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // -----------------------
  // MODAL HANDLERS
  // -----------------------

  const openAddModal = (status: Status) => {
    setActiveStatus(status);
    setActiveTask(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setActiveTask(task);
    setModalMode("edit");
    setModalOpen(true);
  };

  const openDeleteModal = (task: Task) => {
    setActiveTask(task);
    setModalMode("delete");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveTask(null);
  };

  // -----------------------
  // CRUD ACTIONS
  // -----------------------

  const addTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        status: activeStatus,
      },
    ]);
    closeModal();
  };

  const editTask = (title: string) => {
    if (!activeTask) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTask.id ? { ...t, title } : t
      )
    );
    closeModal();
  };

  const deleteTask = () => {
    if (!activeTask) return;

    setTasks((prev) =>
      prev.filter((t) => t.id !== activeTask.id)
    );
    closeModal();
  };

  const moveTask = (id: number, status: Status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  // -----------------------
  // FILTER PER COLUMN
  // -----------------------

  const todo = tasks.filter((t) => t.status === "todo");
  const doing = tasks.filter((t) => t.status === "doing");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {/* TO DO */}
        <Column
          title="To Do"
          count={todo.length}
          color="#f43535ff"
          status="todo"
          onAddTask={openAddModal}
          onDropTask={moveTask}
        >
          {todo.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              onEdit={() => openEditModal(task)}
              onDelete={() => openDeleteModal(task)}
            />
          ))}
        </Column>

        {/* IN PROGRESS */}
        <Column
          title="In Progress"
          count={doing.length}
          color="#FACC15"
          status="doing"
          onAddTask={openAddModal}
          onDropTask={moveTask}
        >
          {doing.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              onEdit={() => openEditModal(task)}
              onDelete={() => openDeleteModal(task)}
            />
          ))}
        </Column>

        {/* DONE */}
        <Column
          title="Done"
          count={done.length}
          color="#22C55E"
          status="done"
          onAddTask={openAddModal}
          onDropTask={moveTask}
        >
          {done.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              onEdit={() => openEditModal(task)}
              onDelete={() => openDeleteModal(task)}
            />
          ))}
        </Column>
      </div>

      {/* MODAL */}
      <TaskModal
        open={modalOpen}
        mode={modalMode}
        title={activeTask?.title || ""}
        onClose={closeModal}
        onSave={
          modalMode === "add"
            ? addTask
            : modalMode === "edit"
            ? editTask
            : undefined
        }
        onDelete={modalMode === "delete" ? deleteTask : undefined}
      />
    </>
  );
}
