import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 dark:bg-gray-800 text-white rounded-2xl px-4 py-3 shadow">
      <div>
        <h1 className="text-xl font-bold">Aktivitas Harian</h1>
        <p className="text-xs opacity-90">Kelola aktivitas anda</p>
      </div>
      <DarkModeToggle />
    </header>
  );
}
