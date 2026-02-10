type Mode = "add" | "edit" | "delete";

type Props = {
  open: boolean;
  mode: Mode;
  title: string;
  onClose: () => void;
  onSave?: (title: string) => void;
  onDelete?: () => void;
};

export default function TaskModal({
  open,
  mode,
  title,
  onClose,
  onSave,
  onDelete,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">
            {mode === "add"
              ? "New Task"
              : mode === "edit"
              ? "Edit Task"
              : "Delete Task"}
          </h2>
          <button onClick={onClose} className="text-gray-400 text-xl">
            ×
          </button>
        </div>

        {/* ADD / EDIT */}
        {(mode === "add" || mode === "edit") && (
          <>
            <label className="text-sm text-gray-500 mb-1 block">
              TASK TITLE
            </label>
            <input
              defaultValue={title}
              onChange={(e) => (title = e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-6"
              placeholder="What needs to be done?"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="border rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave?.(title)}
                className="bg-black text-white rounded-lg px-4 py-2"
              >
                Save
              </button>
            </div>
          </>
        )}

        {/* DELETE */}
        {mode === "delete" && (
          <>
            <p className="mb-6">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="border rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
