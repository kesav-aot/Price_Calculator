export function MetricCard({ eyebrow, title, subtitle, value, tone = 'indigo' }) {
  const toneClass = {
    indigo: 'text-indigo-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    rose: 'text-rose-300'
  }[tone];

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-soft">
      <span className="text-xs font-medium text-slate-400">{eyebrow}</span>
      <div className="mt-3 min-h-16">
        <h3 className={`text-lg font-bold ${toneClass}`}>{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
        <span className="text-slate-400">Total run estimate</span>
        <span className="font-mono font-bold text-white">{value}</span>
      </div>
    </section>
  );
}
