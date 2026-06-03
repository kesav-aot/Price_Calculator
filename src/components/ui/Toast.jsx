import { CheckCircle, AlertTriangle } from 'lucide-react';

export function Toast({ config }) {
  if (!config.show) return null;

  const Icon = config.type === 'warning' ? AlertTriangle : CheckCircle;

  return (
    <div className="fixed right-4 top-4 z-50 flex max-w-sm animate-fade-in items-center gap-3 rounded-lg border border-indigo-500 bg-indigo-950 px-4 py-3 text-indigo-200 shadow-soft">
      <Icon className="h-5 w-5 shrink-0 text-indigo-400" />
      <span className="text-sm font-medium">{config.message}</span>
    </div>
  );
}
