export default function ProgressBar({ total, completed }) {
  const pct = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div className="h-4 bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-center text-xs mt-2 text-gray-600 dark:text-gray-300">Progress: {pct.toFixed(0)}%</div>
    </div>
  );
}
