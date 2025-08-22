import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ProgressBar from "./components/ProgressBar";

const STORAGE_KEY = "daily_activities_v2";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function getTodayName() {
  // Date.getDay(): 0=Sunday, 1=Monday, ...
  const idx = (new Date().getDay() + 6) % 7; // shift so Monday=0
  return DAYS[idx];
}

export default function App() {
  const [data, setData] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  });

  const [selectedDay, setSelectedDay] = useState(getTodayName());

  // Persist ke localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const activitiesToday = useMemo(() => data[selectedDay] ?? [], [data, selectedDay]);

  const addActivity = (item) => {
    setData((prev) => {
      const list = prev[selectedDay] ? [...prev[selectedDay]] : [];
      return { ...prev, [selectedDay]: [...list, item] };
    });
  };

  const toggleDone = (id) => {
    setData((prev) => {
      const list = (prev[selectedDay] ?? []).map((it) => (it.id === id ? { ...it, done: true } : it));
      return { ...prev, [selectedDay]: list };
    });
  };

  const updateItem = (id, patch) => {
    setData((prev) => {
      const list = (prev[selectedDay] ?? []).map((it) => (it.id === id ? { ...it, ...patch } : it));
      return { ...prev, [selectedDay]: list };
    });
  };

  const deleteItem = (id) => {
    setData((prev) => {
      const list = (prev[selectedDay] ?? []).filter((it) => it.id !== id);
      return { ...prev, [selectedDay]: list };
    });
  };

  const total = activitiesToday.length;
  const completed = activitiesToday.filter((a) => a.done).length;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Header />
        {/* Pilih Hari */}
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 rounded-lg font-medium shadow border dark:border-gray-700
                ${selectedDay === d ? "bg-green-500 text-white" : "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700"}`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Form tambah */}
        <div className="mt-6">
          <ActivityForm
            onAdd={(payload) =>
              addActivity({
                id: Date.now(),
                name: payload.name,
                start: payload.start,
                end: payload.end,
                done: false,
              })
            }
          />
        </div>

        {/* Card Aktivitas Hari Ini (dengan tombol Edit di kanan atas) */}
        <div className="mt-6">
          <ActivityList title={`Aktivitas Hari ${selectedDay}`} activities={activitiesToday} onToggle={toggleDone} onUpdate={updateItem} onDelete={deleteItem} />
        </div>

        {/* Progress */}
        <div className="mt-6">
          <ProgressBar total={total} completed={completed} />
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
            Selesai {completed} dari {total} aktivitas
          </p>
        </div>
      </div>

      {/* footer */}
      <div className="flex justify-center p-5">
        <p className="text-sm text-gray-600">Created with 🫀 by yeremia potu</p>
      </div>
    </div>
  );
}
