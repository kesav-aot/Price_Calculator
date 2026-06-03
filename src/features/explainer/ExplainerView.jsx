import { AlertTriangle, Layers, Scale } from 'lucide-react';
import { calculateImageTokens } from '../../lib/pricing';
import { number } from '../../lib/formatters';
import { RangeField } from '../../components/ui/RangeField';

const TOKEN_MODELS = [
  {
    name: 'xAI Grok 4.20 Beta',
    formula: 'xai_grok_420',
    description: 'Dynamic visual encoding clamped between 256 and 1,792 tokens.'
  },
  {
    name: 'Anthropic Claude',
    formula: 'anthropic_claude',
    description: 'Formula profile: width multiplied by height, divided by 750.'
  },
  {
    name: 'Google Gemini 3.5 Flash',
    formula: 'google_gemini_35',
    description: '258 tokens for each 768 x 768 tile needed to cover the image.'
  },
  {
    name: 'OpenAI GPT 5.2',
    formula: 'openai_tiled',
    description: 'High-resolution tiled profile with 512 x 512 tiles and a base surcharge.'
  }
];

export function ExplainerView({ state, setters }) {
  const maxSide = Math.max(state.avgWidth, state.avgHeight);
  const boxWidth = Math.max(48, Math.min(240, (state.avgWidth / maxSide) * 240));
  const boxHeight = Math.max(48, Math.min(240, (state.avgHeight / maxSide) * 240));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside className="flex flex-col gap-6 rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-soft lg:col-span-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-100">
            <Layers className="h-5 w-5 text-indigo-300" />
            Image Token Estimator
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Adjust image dimensions to compare model-specific visual token rules.
          </p>
        </div>

        <div className="space-y-5">
          <RangeField
            label="Width (pixels)"
            min={100}
            max={4096}
            value={state.avgWidth}
            onChange={setters.setAvgWidth}
          />
          <RangeField
            label="Height (pixels)"
            min={100}
            max={4096}
            value={state.avgHeight}
            onChange={setters.setAvgHeight}
          />
        </div>

        <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-950 p-5">
          <span className="mb-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Estimated aspect ratio
          </span>
          <div
            className="flex items-center justify-center rounded-lg border-2 border-dashed border-indigo-500/70 bg-indigo-950/30 font-mono text-[10px] text-indigo-200 transition-all"
            style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}
          >
            {state.avgWidth} x {state.avgHeight}
          </div>
        </div>
      </aside>

      <section className="flex flex-col gap-6 lg:col-span-7">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-100">
            <Scale className="h-5 w-5 text-indigo-300" />
            Calculated Tokens by Model
          </h2>
          <div className="space-y-4">
            {TOKEN_MODELS.map((model) => (
              <article
                key={model.formula}
                className="flex flex-col justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-200">{model.name}</h3>
                  <p className="mt-1 text-[11px] text-slate-500">{model.description}</p>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-lg font-bold text-indigo-300">
                    {number.format(
                      calculateImageTokens(
                        state.avgWidth,
                        state.avgHeight,
                        model.formula,
                        state.imageQualityMode
                      )
                    )}
                  </span>
                  <span className="block text-[9px] text-slate-500">tokens</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-amber-800/60 bg-amber-950/20 p-5">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-amber-200">
              Optimization directive: aspect ratio padding
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              Tiled tokenization can add an entire row or column when an image crosses a tile boundary.
              Slightly resizing assets before inference can reduce input costs in high-volume runs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
