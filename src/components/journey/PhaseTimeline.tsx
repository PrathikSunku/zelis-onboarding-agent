import { phases } from '../../data/phases';

interface Props {
  activePhaseIndex: number;
  onSelectPhase: (index: number) => void;
  completedPhases: Set<number>;
}

export function PhaseTimeline({ activePhaseIndex, onSelectPhase, completedPhases }: Props) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {phases.map((phase, i) => {
          const isActive = i === activePhaseIndex;
          const isCompleted = completedPhases.has(i);
          const isPast = i < activePhaseIndex;

          return (
            <div key={phase.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => onSelectPhase(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-105'
                    : isCompleted || isPast
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                <span className="text-sm">{isCompleted ? '✓' : phase.icon}</span>
                <span className="hidden sm:inline">{phase.label}</span>
                <span className="sm:hidden">{phase.shortLabel}</span>
              </button>
              {i < phases.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 rounded-full min-w-6">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPast || isCompleted ? 'bg-emerald-400' : i === activePhaseIndex ? 'bg-blue-300' : 'bg-slate-200'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center mt-1.5">
        <span className="text-[10px] text-slate-400">
          {phases[activePhaseIndex].dateRange} — {phases[activePhaseIndex].description.split('.')[0]}
        </span>
      </div>
    </div>
  );
}
