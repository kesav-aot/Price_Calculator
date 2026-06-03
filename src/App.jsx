import { useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { Toast } from './components/ui/Toast';
import { ArchitectView } from './features/architect/ArchitectView';
import { CalculatorView } from './features/calculator/CalculatorView';
import { ExplainerView } from './features/explainer/ExplainerView';
import { ModelsView } from './features/models/ModelsView';
import { analyzePipeline } from './lib/pricing';

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [imageCount, setImageCount] = useState(10000);
  const [avgWidth, setAvgWidth] = useState(1920);
  const [avgHeight, setAvgHeight] = useState(1080);
  const [outputTokens, setOutputTokens] = useState(450);
  const [cacheHitRate, setCacheHitRate] = useState(40);
  const [imageQualityMode, setImageQualityMode] = useState('high');
  const [selectedPreset, setSelectedPreset] = useState('document_1080p');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const state = {
    imageCount,
    avgWidth,
    avgHeight,
    outputTokens,
    cacheHitRate,
    imageQualityMode,
    selectedPreset
  };

  const setters = {
    setImageCount,
    setAvgWidth,
    setAvgHeight,
    setOutputTokens,
    setCacheHitRate,
    setImageQualityMode,
    setSelectedPreset
  };

  const analysis = useMemo(
    () =>
      analyzePipeline({
        imageCount,
        avgWidth,
        avgHeight,
        outputTokens,
        cacheHitRate,
        imageQualityMode
      }),
    [imageCount, avgWidth, avgHeight, outputTokens, cacheHitRate, imageQualityMode]
  );

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    window.setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3200);
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <Toast config={toast} />
      {activeTab === 'calculator' && (
        <CalculatorView state={state} setters={setters} analysis={analysis} onToast={showToast} />
      )}
      {activeTab === 'models' && <ModelsView />}
      {activeTab === 'explainer' && <ExplainerView state={state} setters={setters} />}
      {activeTab === 'architect' && (
        <ArchitectView onBackToCalculator={() => setActiveTab('calculator')} />
      )}
    </AppShell>
  );
}
