type ColumnProps = {
  title: string;
  count: number;
  color: string;
  status: "todo" | "doing" | "done";
  onAddTask: (status: ColumnProps["status"]) => void;
  onDropTask: (id: number, status: ColumnProps["status"]) => void;
  children?: React.ReactNode;
};

export default function Column({
  title,
  count,
  color,
  status,
  onAddTask,
  onDropTask,
  children,
}: ColumnProps) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = Number(e.dataTransfer.getData("taskId"));
        onDropTask(id, status);
      }}
      className="bg-white rounded-xl p-4 shadow-sm min-h-[320px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium">{title}</span>
          <span className="text-sm text-gray-400">{count}</span>
        </div>

        <button
          onClick={() => onAddTask(status)}
          className="text-gray-400 hover:text-black text-lg"
        >
          +
        </button>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}
