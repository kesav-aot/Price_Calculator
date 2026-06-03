import { ArrowRight, CheckCircle, FileText } from 'lucide-react';

const GUIDELINES = [
  {
    title: 'Image optimization & compression',
    body:
      'Scale images to match each model native detail limits. For standard document extraction, very high DPI often increases token cost faster than it improves structured extraction accuracy.'
  },
  {
    title: 'JSON schema conformance',
    body:
      'Use structured output modes when available. Compact schemas reduce explanatory filler and keep output token costs predictable.'
  },
  {
    title: 'Strategic context caching',
    body:
      'Place static instructions, extraction rules, and schema declarations first so repeated requests can benefit from provider cache behavior.'
  }
];

const FLOW = [
  ['Rescale & Convert', 'Normalize images to clean PNG or WebP files at the target extraction resolution.'],
  ['Cache System Prompt', 'Load static instructions and the desired schema before variable image content.'],
  ['Parallel Batch Processing', 'Use batch APIs for non-interactive workloads where latency is secondary.'],
  ['Structured Compliance Parsing', 'Stream valid JSON directly into storage and avoid secondary parsing passes.']
];

export function ArchitectView({ onBackToCalculator }) {
  return (
    <section className="flex flex-col gap-8 rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-soft md:p-8">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-100">
          <FileText className="h-5 w-5 text-indigo-300" />
          Image Data Extraction System Architecture
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Engineering guidance for token efficiency, output quality, and production pipeline cost control.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {GUIDELINES.map((item, index) => (
            <article key={item.title}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                {index + 1}. {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>

        <aside className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950 p-6">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-200">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              Recommended Architectural Flow
            </h3>
            <div className="space-y-5">
              {FLOW.map(([title, body], index) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-[10px] font-bold text-indigo-300">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300">{title}</h4>
                    <p className="mt-1 text-[11px] leading-normal text-slate-400">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-[11px]">
            <span className="text-slate-500">Return to live estimates</span>
            <button
              type="button"
              onClick={onBackToCalculator}
              className="flex items-center gap-1 font-bold text-indigo-300 hover:text-indigo-200"
            >
              Calculator <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
