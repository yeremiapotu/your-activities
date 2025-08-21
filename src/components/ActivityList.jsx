import { useMemo, useState } from "react";

export default function ActivityList({
  title,
  activities,
  onToggle, // (id) => void
  onUpdate, // (id, patch) => void
  onDelete, // (id) => void
}) {
  const [editMode, setEditMode] = useState(false);

  const completed = useMemo(() => activities.filter((a) => a.done).length, [activities]);

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {completed} selesai • {activities.length} total
          </p>
        </div>
        <button
          onClick={() => setEditMode((v) => !v)}
          className={`px-3 py-1 rounded-xl text-white ${editMode ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
          title={editMode ? "Selesai mengedit" : "Edit seluruh aktivitas hari ini"}
        >
          {editMode ? "Selesai" : "Edit"}
        </button>
      </div>

      <div className="p-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Belum ada aktivitas untuk hari ini.</p>
        ) : (
          <ul className="space-y-3">
            {activities.map((act) => (
              <li key={act.id} className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-750/50 px-3 py-2">
                <div className="flex-1">
                  {/* Baris 1: nama + checkbox (disabled saat editMode) */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={act.done}
                      onChange={() => !editMode && !act.done && onToggle(act.id)}
                      disabled={editMode || act.done}
                      className="w-5 h-5 accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
                      title={editMode ? "Nonaktif saat edit mode" : act.done ? "Sudah selesai" : "Tandai selesai"}
                    />
                    {!editMode ? (
                      <span className={`font-medium ${act.done ? "line-through text-gray-500" : ""}`}>{act.name}</span>
                    ) : (
                      <input
                        type="text"
                        value={act.name}
                        onChange={(e) => onUpdate(act.id, { name: e.target.value })}
                        className="w-full max-w-[26rem] rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1"
                      />
                    )}
                  </div>
                  {/* Baris 2: waktu */}
                  <div className="pl-8 mt-1 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {!editMode ? (
                      <span>
                        {act.start || "??:??"} - {act.end || "??:??"}
                      </span>
                    ) : (
                      <>
                        <input
                          type="time"
                          value={act.start || ""}
                          onChange={(e) => onUpdate(act.id, { start: e.target.value })}
                          className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1"
                        />
                        <span>—</span>
                        <input type="time" value={act.end || ""} onChange={(e) => onUpdate(act.id, { end: e.target.value })} className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1" />
                      </>
                    )}
                  </div>
                </div>

                {/* Aksi kanan: Hapus muncul saat editMode */}
                {editMode && (
                  <button onClick={() => onDelete(act.id)} className="self-center px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white" title="Hapus aktivitas ini">
                    Hapus
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
