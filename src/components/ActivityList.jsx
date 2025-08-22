import { useMemo, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ActivityList({ title, activities, onToggle, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const completed = useMemo(() => activities.filter((a) => a.done).length, [activities]);

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {completed} selesai • {activities.length} total
          </p>
        </div>

        {/* Tombol Edit */}
        <button
          onClick={() => setEditMode((v) => !v)}
          className={`px-3 py-1 rounded-xl text-white ${editMode ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
          title={editMode ? "Selesai mengedit" : "Edit seluruh aktivitas hari ini"}
        >
          {editMode ? "Selesai" : "Edit"}
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Belum ada aktivitas untuk hari ini.</p>
        ) : (
          <ul className="space-y-3">
            {activities.map((act) => (
              <li key={act.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-750/50 px-3 py-2">
                {/* Nama & Waktu */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {!editMode ? (
                      <span className={`font-medium ${act.done ? "line-through text-green-500" : ""}`}>{act.name}</span>
                    ) : (
                      <input
                        type="text"
                        value={act.name}
                        onChange={(e) => onUpdate(act.id, { name: e.target.value })}
                        className="w-full max-w-[26rem] rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1"
                      />
                    )}
                  </div>

                  {/* Waktu */}
                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {!editMode ? (
                      <span>{act.start && act.end ? `${act.start} - ${act.end}` : act.start ? act.start : act.end ? act.end : "??:??"}</span>
                    ) : (
                      <>
                        <input
                          type="time"
                          value={act.start || ""}
                          onChange={(e) => onUpdate(act.id, { start: e.target.value })}
                          className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1"
                        />
                        <input type="time" value={act.end || ""} onChange={(e) => onUpdate(act.id, { end: e.target.value })} className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1" />
                      </>
                    )}
                  </div>
                </div>

                {/* Checklist */}
                {!editMode && (
                  <input
                    type="checkbox"
                    checked={act.done}
                    onChange={() => {
                      if (!act.done) onToggle(act.id); // ✅ hanya centang, tidak bisa uncheck
                    }}
                    className="w-5 h-5 accent-green-500 cursor-pointer self-center"
                    title={act.done ? "Sudah selesai" : "Tandai selesai"}
                  />
                )}

                {/* Tombol hapus */}
                {editMode && (
                  <button onClick={() => onDelete(act.id)} className="self-center p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center" title="Hapus aktivitas ini">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
