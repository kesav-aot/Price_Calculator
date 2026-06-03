import { MODEL_REGISTRY } from '../data/modelRegistry';
import { compactCurrency, currency, number } from './formatters';

export function buildReport({ imageCount, avgWidth, avgHeight, outputTokens, cacheHitRate, analysis }) {
  const rows = Object.keys(MODEL_REGISTRY)
    .map((key) => {
      const item = analysis[key];

      return `- ${item.modelName} (${item.provider})
  Image input tokens: ${number.format(item.imageTokens)}
  Input cost: ${currency.format(item.inputCost)}
  Output cost: ${currency.format(item.outputCost)}
  Estimated total budget: ${currency.format(item.totalCost)}
  Cost per 1,000 images: ${currency.format(item.costPer1k)}
  Caching savings: ${compactCurrency.format(item.cachedSavings)}`;
    })
    .join('\n\n');

  return `Multimodal Data Extraction Budget Plan

Processed images: ${number.format(imageCount)}
Average resolution: ${avgWidth} x ${avgHeight} px
Expected output length: ${number.format(outputTokens)} tokens/image
Instruction caching hit rate: ${cacheHitRate}%

Estimated cost breakdown:

${rows}

Report compiled on: ${new Date().toLocaleDateString()}`;
}
