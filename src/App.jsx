import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ProgressBar from "./components/ProgressBar";

const STORAGE_KEY = "daily_activities_v2";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function getTodayName() {
  const idx = (new Date().getDay() + 6) % 7; // Monday = 0
  return DAYS[idx];
}

export default function App() {
  const [data, setData] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  });

  const [selectedDay, setSelectedDay] = useState(getTodayName());
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Simpan otomatis ke localStorage
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
      const list = (prev[selectedDay] ?? []).map((it) => (it.id === id ? { ...it, done: !it.done } : it));
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

  // ✅ Fungsi reset checklist
  const resetActivities = (scope) => {
    setData((prev) => {
      let newData = { ...prev };

      if (scope === "today") {
        const list = (prev[selectedDay] ?? []).map((it) => ({ ...it, done: false }));
        newData[selectedDay] = list;
      } else if (scope === "all") {
        Object.keys(newData).forEach((day) => {
          newData[day] = newData[day].map((it) => ({ ...it, done: false }));
        });
      }

      return newData;
    });

    setShowConfirm(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
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

        {/* List Aktivitas */}
        <div className="mt-6">
          <ActivityList title={`Aktivitas Hari ${selectedDay}`} activities={activitiesToday} onToggle={toggleDone} onUpdate={updateItem} onDelete={deleteItem} />
        </div>

        {/* Progress & Tombol Reset */}
        <div className="mt-6 text-center">
          <ProgressBar total={total} completed={completed} />
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Selesai {completed} dari {total} aktivitas
          </p>

          <button onClick={() => setShowConfirm(true)} className="mt-4 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow">
            Reset Progress
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Reset */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Reset Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Pilih opsi reset progress :</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => resetActivities("today")} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                Reset Hari Ini
              </button>
              <button onClick={() => resetActivities("all")} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">
                Reset Semua Hari
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifikasi */}
      <div className="flex justify-center">{showToast && <div className="fixed top-10 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-500 animate-bounce z-50">✅ Progress berhasil direset!</div>}</div>

      {/* Footer */}
      <div className="flex justify-center p-5">
        <p className="text-sm text-gray-600">Created with 🫀 by yeremia potu</p>
      </div>
    </div>
  );
}
