export function RangeField({ label, value, min, max, step = 1, onChange, markers = [] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="text-xs font-semibold text-slate-300">{label}</label>
        <span className="font-mono text-xs font-bold text-indigo-400">{value.toLocaleString()}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number.parseInt(event.target.value, 10))}
        className="h-1 w-full cursor-pointer rounded-lg bg-slate-950"
      />
      {markers.length > 0 && (
        <div className="mt-2 flex justify-between text-[10px] text-slate-500">
          {markers.map((marker) => (
            <span key={marker}>{marker}</span>
          ))}
        </div>
      )}
    </div>
  );
}
