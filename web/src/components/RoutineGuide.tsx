import React from 'react';
import type { Routine } from '../types';

interface RoutineGuideProps {
  skinType: string;
  routines: Routine[];
  disclaimer?: string;
}

export function RoutineGuide({ skinType, routines, disclaimer }: RoutineGuideProps) {
  if (routines.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <p>No routine found for this skin type.</p>
      </div>
    );
  }

  return (
    <div className="routine-guide">
      {routines.map((routine, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <div className="card-icon">
              {routine.routine_type === 'morning' ? '🌅' : '🌙'}
            </div>
            <div>
              <div className="card-title">
                {routine.routine_type === 'morning' ? 'Morning' : 'Evening'} Routine
              </div>
              <div className="card-subtitle">For {skinType} skin</div>
            </div>
          </div>
          <ul className="routine-steps">
            {routine.steps.map((step, stepIndex) => (
              <li key={stepIndex} className="routine-step">
                <div className="step-number">{stepIndex + 1}</div>
                <div className="step-content">
                  <div className="step-name">{step.step_name}</div>
                  <div className="step-description">{step.description}</div>
                  {step.tips && (
                    <div className="step-tip">💡 {step.tips}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {disclaimer && <div className="disclaimer">ℹ️ {disclaimer}</div>}
    </div>
  );
}
