import { MODEL_REGISTRY } from '../data/modelRegistry';

export function calculateImageTokens(width, height, formula, mode = 'high') {
  const w = Number.parseInt(width, 10) || 512;
  const h = Number.parseInt(height, 10) || 512;

  switch (formula) {
    case 'openai_tiled': {
      if (mode === 'low') return 85;

      let scaledW = w;
      let scaledH = h;

      if (scaledW > 2048 || scaledH > 2048) {
        const ratio = Math.min(2048 / scaledW, 2048 / scaledH);
        scaledW = Math.round(scaledW * ratio);
        scaledH = Math.round(scaledH * ratio);
      }

      const scale = 768 / Math.min(scaledW, scaledH);
      scaledW = Math.round(scaledW * scale);
      scaledH = Math.round(scaledH * scale);

      return 85 + 170 * (Math.ceil(scaledW / 512) * Math.ceil(scaledH / 512));
    }

    case 'anthropic_claude':
      return Math.ceil((w * h) / 750);

    case 'google_gemini_35':
      if (Math.max(w, h) <= 384) return 258;
      return 258 * (Math.ceil(w / 768) * Math.ceil(h / 768));

    case 'xai_grok_420': {
      const calculated = Math.ceil((w * h) / 163);
      return Math.min(1792, Math.max(256, calculated));
    }

    default:
      return 400;
  }
}

export function analyzePipeline({
  imageCount,
  avgWidth,
  avgHeight,
  outputTokens,
  cacheHitRate,
  imageQualityMode
}) {
  return Object.fromEntries(
    Object.entries(MODEL_REGISTRY).map(([key, model]) => {
      const imageTokens = calculateImageTokens(
        avgWidth,
        avgHeight,
        model.visionFormula,
        imageQualityMode
      );
      const promptTextTokens = 300;
      const totalInputTokensPerImage = imageTokens + promptTextTokens;
      const totalInputTokensRun = totalInputTokensPerImage * imageCount;
      const totalOutputTokensRun = outputTokens * imageCount;
      const cachedInputTokens = totalInputTokensRun * (cacheHitRate / 100);
      const standardInputTokens = totalInputTokensRun - cachedInputTokens;
      const standardInputCost = (standardInputTokens / 1000000) * model.inputPrice;
      const cachedInputCost =
        (cachedInputTokens / 1000000) * (model.inputPrice * (1 - model.cacheDiscount));
      const inputCost = standardInputCost + cachedInputCost;
      const outputCost = (totalOutputTokensRun / 1000000) * model.outputPrice;
      const totalCost = inputCost + outputCost;

      return [
        key,
        {
          modelName: model.name,
          provider: model.provider,
          imageTokens,
          totalInputTokensPerImage,
          inputCost,
          outputCost,
          totalCost,
          costPer1k: (totalCost / imageCount) * 1000,
          cachedSavings:
            (cachedInputTokens / 1000000) * model.inputPrice * model.cacheDiscount
        }
      ];
    })
  );
}

export function getLowestCostModel(analysis) {
  return Object.values(analysis).sort((a, b) => a.totalCost - b.totalCost)[0];
}
