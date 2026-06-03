import { Copy, HelpCircle, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { MODEL_REGISTRY, PRESETS } from '../../data/modelRegistry';
import { compactCurrency, currency, number } from '../../lib/formatters';
import { getLowestCostModel } from '../../lib/pricing';
import { buildReport } from '../../lib/report';
import { MetricCard } from '../../components/ui/MetricCard';
import { RangeField } from '../../components/ui/RangeField';

export function CalculatorView({ state, setters, analysis, onToast }) {
  const lowest = getLowestCostModel(analysis);

  const applyPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    setters.setSelectedPreset(presetKey);
    setters.setAvgWidth(preset.width);
    setters.setAvgHeight(preset.height);
    setters.setOutputTokens(preset.outputTokens);
  };

  const copyReport = async () => {
    const report = buildReport({ ...state, analysis });

    try {
      await navigator.clipboard.writeText(report);
      onToast('Calculation report copied to clipboard.');
    } catch {
      onToast('Clipboard permission was blocked by the browser.', 'warning');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside className="flex flex-col gap-6 rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-soft lg:col-span-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-100">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            Extraction Pipeline Inputs
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Configure volume, image geometry, cache rate, and expected output size.
          </p>
        </div>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Image geometry presets
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                className={`rounded-lg border p-3 text-left text-xs transition ${
                  state.selectedPreset === key
                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-100'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="block font-bold">{preset.label}</span>
                <span className="mt-1 block text-[10px] text-slate-400">{preset.detail}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-800" />

        <RangeField
          label="Total images to process"
          min={500}
          max={500000}
          step={500}
          value={state.imageCount}
          markers={['500', '250K', '500K']}
          onChange={(value) => {
            setters.setImageCount(value);
            setters.setSelectedPreset('custom');
          }}
        />

        <div className="grid grid-cols-2 gap-4">
          <label className="text-xs font-semibold text-slate-300">
            Avg image width
            <input
              type="number"
              min="1"
              value={state.avgWidth}
              onChange={(event) => {
                setters.setAvgWidth(Math.max(1, Number.parseInt(event.target.value, 10) || 1));
                setters.setSelectedPreset('custom');
              }}
              className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-xs font-semibold text-slate-300">
            Avg image height
            <input
              type="number"
              min="1"
              value={state.avgHeight}
              onChange={(event) => {
                setters.setAvgHeight(Math.max(1, Number.parseInt(event.target.value, 10) || 1));
                setters.setSelectedPreset('custom');
              }}
              className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <RangeField
          label="Average output tokens"
          min={50}
          max={8000}
          step={50}
          value={state.outputTokens}
          markers={['50', '4K', '8K']}
          onChange={setters.setOutputTokens}
        />

        <section className="rounded-lg border border-slate-800 bg-slate-950 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Context caching hit rate</span>
              <div className="group relative">
                <HelpCircle className="h-4 w-4 cursor-help text-slate-500" />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded border border-slate-800 bg-slate-900 p-2 text-[10px] leading-normal text-slate-300 opacity-0 shadow-soft transition group-hover:opacity-100">
                  Estimated share of repeated prompt, schema, and instruction tokens receiving cache discounts.
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-300">{state.cacheHitRate}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={state.cacheHitRate}
            onChange={(event) => setters.setCacheHitRate(Number.parseInt(event.target.value, 10))}
            className="h-1 w-full cursor-pointer rounded-lg bg-slate-900"
          />
        </section>

        <section className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 p-3">
          <div>
            <span className="block text-xs font-semibold text-slate-300">OpenAI vision mode</span>
            <span className="text-[10px] text-slate-500">High uses tiled pricing; low uses flat image tokens.</span>
          </div>
          <div className="flex rounded-md border border-slate-800 bg-slate-900 p-1">
            {['high', 'low'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setters.setImageQualityMode(mode)}
                className={`rounded px-3 py-1 text-[10px] font-bold capitalize ${
                  state.imageQualityMode === mode ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={copyReport}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
        >
          <Copy className="h-4 w-4" />
          Copy extraction report
        </button>
      </aside>

      <section className="flex flex-col gap-6 lg:col-span-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            eyebrow="Most cost-effective"
            title={lowest.modelName}
            subtitle={lowest.provider}
            value={compactCurrency.format(lowest.totalCost)}
            tone="emerald"
          />
          <MetricCard
            eyebrow="Balanced flagship"
            title="Claude Sonnet 4.6"
            subtitle="Anthropic"
            value={compactCurrency.format(analysis.claude_sonnet_46.totalCost)}
            tone="indigo"
          />
          <MetricCard
            eyebrow="Parallel execution"
            title="Gemini 3.5 Flash"
            subtitle="Google Cloud"
            value={compactCurrency.format(analysis.gemini_35_flash.totalCost)}
            tone="amber"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-soft">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-100">
                <TrendingUp className="h-4 w-4 text-emerald-300" />
                Multimodal Budget & Token Breakdown
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Calculated across {number.format(state.imageCount)} images.
              </p>
            </div>
            <span className="rounded-md border border-emerald-900 bg-emerald-950/50 px-3 py-1 text-[10px] font-bold text-emerald-300">
              {state.cacheHitRate > 0 ? `${state.cacheHitRate}% caching active` : 'Caching disabled'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3">Model & Provider</th>
                  <th className="px-4 py-3 text-center">Image Tokens</th>
                  <th className="px-4 py-3 text-right">Input Cost</th>
                  <th className="px-4 py-3 text-right">Output Cost</th>
                  <th className="px-4 py-3 text-right">Total Budget</th>
                  <th className="px-4 py-3 text-right">Cost/1K</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {Object.keys(MODEL_REGISTRY).map((key) => {
                  const item = analysis[key];

                  return (
                    <tr key={key} className="transition hover:bg-slate-800/30">
                      <td className="px-4 py-4">
                        <span className="block text-xs font-semibold text-slate-200">{item.modelName}</span>
                        <span className="block text-[10px] font-medium uppercase tracking-wide text-slate-500">
                          {item.provider}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-xs text-slate-300">
                        {number.format(item.imageTokens)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs text-slate-300">
                        {currency.format(item.inputCost)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs text-slate-300">
                        {currency.format(item.outputCost)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="block font-mono text-xs font-bold text-slate-100">
                          {currency.format(item.totalCost)}
                        </span>
                        {item.cachedSavings > 0 && (
                          <span className="block text-[9px] font-semibold text-emerald-300">
                            Saved {compactCurrency.format(item.cachedSavings)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs font-bold text-indigo-300">
                        {currency.format(item.costPer1k)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-800 bg-slate-950 p-4 text-[11px] text-slate-400 sm:flex-row">
            <span className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-emerald-300" />
              Context caching reduces repeated prompt, schema, and system instruction costs.
            </span>
            <span>Unit prices use the model data supplied in the project brief.</span>
          </div>
        </div>

        <div className="rounded-lg border border-indigo-800/50 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 p-5 shadow-soft">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-indigo-200">
            <Zap className="h-4 w-4 text-indigo-400" />
            Multimodal ROI Takeaways
          </h3>
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <p>
              xAI Grok 4.20 Beta Non-Reasoning is modeled as the lowest-cost option for large image
              runs where extraction quality is acceptable.
            </p>
            <p>
              Gemini 3.5 Flash is positioned for high-throughput background work where batch execution
              and parallelism matter.
            </p>
            <p>
              Claude Sonnet 4.6 remains a balanced premium option for dense tables, layouts, and nested
              validation schemas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
