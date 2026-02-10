type Props = {
  id: number;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskCard({
  id,
  title,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("taskId", String(id))
      }
      className="bg-gray-50 border rounded-xl p-4 cursor-grab"
      onClick={onEdit}
    >
      <p className="font-medium">{title}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-red-400 text-sm mt-2"
      >
        Delete
      </button>
    </div>
  );
}
