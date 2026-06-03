import { Cpu, DollarSign, FileText } from 'lucide-react';
import { MODEL_REGISTRY } from '../../data/modelRegistry';
import { currency, number } from '../../lib/formatters';

export function ModelsView() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-extrabold text-slate-100">
            <Cpu className="h-6 w-6 text-indigo-300" />
            Multimodal Model Catalog
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Provider pricing, context windows, strengths, and deployment considerations.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Active database: {Object.keys(MODEL_REGISTRY).length} models indexed
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Object.values(MODEL_REGISTRY).map((model) => (
          <article
            key={model.id}
            className="flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-soft transition hover:border-slate-700"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 bg-slate-950/40 p-5">
              <div>
                <span className="rounded-full border border-indigo-800 bg-indigo-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                  {model.provider}
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-100">{model.name}</h3>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-wide text-slate-500">
                  Context window
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">
                  {number.format(model.context)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-800/60 bg-slate-950/25 p-5">
              <PricePill label="Input / million" value={currency.format(model.inputPrice)} tone="indigo" />
              <PricePill label="Output / million" value={currency.format(model.outputPrice)} tone="rose" />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-5 p-5">
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Description & capabilities
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">{model.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ModelList title="Extraction strengths" items={model.strengths} tone="emerald" />
                <ModelList title="Considerations" items={model.limitations} tone="rose" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-soft">
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-100">
          <FileText className="h-5 w-5 text-indigo-300" />
          Multimodal Pricing Findings
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Finding title="Google Cloud Platform">
            Gemini batch and flex-style processing can be modeled for slower background workers where
            latency is less important than throughput cost.
          </Finding>
          <Finding title="Anthropic Platform">
            Prompt caching is strongest when static instructions and extraction schemas are placed at
            the start of repeated requests.
          </Finding>
          <Finding title="OpenAI Platform">
            Tiled high-resolution image pricing rewards careful downscaling and compact output schemas.
          </Finding>
        </div>
      </section>
    </div>
  );
}

function PricePill({ label, value, tone }) {
  const color = tone === 'rose' ? 'bg-rose-950 text-rose-300' : 'bg-indigo-950 text-indigo-300';

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
      <div className={`rounded p-2 ${color}`}>
        <DollarSign className="h-4 w-4" />
      </div>
      <div>
        <span className="block text-[10px] uppercase tracking-wide text-slate-500">{label}</span>
        <span className="font-mono text-sm font-bold text-slate-200">{value}</span>
      </div>
    </div>
  );
}

function ModelList({ title, items, tone }) {
  const marker = tone === 'emerald' ? 'text-emerald-300' : 'text-rose-300';

  return (
    <div>
      <span className={`mb-2 block text-[10px] font-bold uppercase tracking-wider ${marker}`}>
        {title}
      </span>
      <ul className="space-y-2 text-[11px] text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={marker}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Finding({ title, children }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-200">{title}</h4>
      <p className="text-xs leading-relaxed text-slate-400">{children}</p>
    </article>
  );
}
