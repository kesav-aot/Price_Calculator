export const MODEL_REGISTRY = {
  grok_420_beta: {
    id: 'grok_420_beta',
    provider: 'xAI',
    name: 'Grok 4.20 Beta Non-Reasoning',
    context: 2000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    cacheDiscount: 0.8,
    description:
      'Flagship model profile for fast multimodal extraction, strict prompt adherence, and low hallucination workflows.',
    visionFormula: 'xai_grok_420',
    strengths: [
      'Ultra-fast inference',
      'High prompt adherence',
      'Low hallucination rate'
    ],
    limitations: ['Beta status may involve API surface changes']
  },
  gemini_35_flash: {
    id: 'gemini_35_flash',
    provider: 'Google',
    name: 'Gemini 3.5 Flash',
    context: 1000000,
    inputPrice: 1.5,
    outputPrice: 9,
    cacheDiscount: 0.9,
    description:
      'Optimized profile for high-volume multimodal extraction loops.',
    visionFormula: 'google_gemini_35',
    strengths: [
      'Strong price-to-performance',
      'Large context scaling',
      'Native structured output integration'
    ],
    limitations: ['Lower complex reasoning ceiling than top premium models']
  },
  claude_sonnet_46: {
    id: 'claude_sonnet_46',
    provider: 'Anthropic',
    name: 'Claude Sonnet 4.6',
    context: 1000000,
    inputPrice: 3,
    outputPrice: 15,
    cacheDiscount: 0.9,
    description:
      'Frontier profile for document extraction, tables, and precise coding tasks.',
    visionFormula: 'anthropic_claude',
    strengths: [
      'Strong layout and table extraction',
      'Dense schematic parsing',
      'Robust tool calling'
    ],
    limitations: ['Output cost dominates high-volume generation']
  },
  claude_opus_48: {
    id: 'claude_opus_48',
    provider: 'Anthropic',
    name: 'Claude Opus 4.8',
    context: 1000000,
    inputPrice: 5,
    outputPrice: 25,
    cacheDiscount: 0.9,
    description:
      'Premium profile for long-horizon enterprise workflows, document drafting, and data synthesis.',
    visionFormula: 'anthropic_claude',
    strengths: [
      'High accuracy on ambiguous inputs',
      'Strong structural relationship synthesis'
    ],
    limitations: ['High cost ceiling for massive data pipelines']
  },
  gpt_52: {
    id: 'gpt_52',
    provider: 'OpenAI',
    name: 'GPT 5.2',
    context: 400000,
    inputPrice: 21,
    outputPrice: 168,
    cacheDiscount: 0.5,
    description:
      'Premium reasoning profile for precise structured responses and cross-reference-heavy workflows.',
    visionFormula: 'openai_tiled',
    strengths: [
      'Strict schema compliance',
      'Strong cross-reference capability'
    ],
    limitations: ['High unit economics and smaller context window']
  }
};

export const PRESETS = {
  receipt_low: {
    label: 'Receipt / Low-Res',
    detail: '640 x 800 px - 150 out',
    width: 640,
    height: 800,
    outputTokens: 150
  },
  document_1080p: {
    label: 'Standard Doc',
    detail: '1920 x 1080 px - 450 out',
    width: 1920,
    height: 1080,
    outputTokens: 450
  },
  highres_scan: {
    label: 'High-Res Scan',
    detail: '3840 x 2160 px - 1K out',
    width: 3840,
    height: 2160,
    outputTokens: 1000
  },
  square_tile: {
    label: 'Square Tile',
    detail: '512 x 512 px - 300 out',
    width: 512,
    height: 512,
    outputTokens: 300
  }
};
