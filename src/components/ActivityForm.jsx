import { useState } from "react";

export default function ActivityForm({ onAdd }) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), start, end });
    setName("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow space-y-3 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input required type="text" placeholder="Nama aktivitas" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2" />
        <input required type="time" value={start} onChange={(e) => setStart(e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2" />
        <input required type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2" />
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl" type="submit">
          Tambah Aktivitas
        </button>
      </div>
    </form>
  );
}
