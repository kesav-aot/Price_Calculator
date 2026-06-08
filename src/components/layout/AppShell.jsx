import { Calculator, Cpu, FileText, Layers, Scale } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'calculator', label: 'ROI Calculator', icon: Calculator },
  { id: 'models', label: 'Model Catalog', icon: Cpu },
  { id: 'explainer', label: 'Image Token Math', icon: Layers },
  { id: 'architect', label: 'Pipeline Architect', icon: FileText }
];

export function AppShell({ activeTab, onTabChange, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/60 px-4 py-4 backdrop-blur lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-500/25">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-300 bg-clip-text text-xl font-bold text-transparent">
                Multimodal AI Pricing & ROI Engine
              </h1>
              <p className="text-xs text-slate-400">Image extraction budget analytics</p>
            </div>
          </div>

          <nav className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/80 p-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const selected = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`flex min-h-9 shrink-0 items-center gap-2 rounded-md px-3 text-xs font-semibold transition ${
                    selected
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">{children}</main>

      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-8 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span>Multimodal Pricing Database - Interactive Evaluation Engine</span>
            <span className="text-slate-600">
              Reference: <a href="https://ai-sdk.dev/playground/anthropic:claude-opus-4-8,openai:gpt-5.2-pro" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Vercel AI SDK Playground</a>
            </span>
          </div>
          <span className="font-mono text-[10px]">Version 2.5 - June 2026</span>
        </div>
      </footer>
    </div>
  );
}
