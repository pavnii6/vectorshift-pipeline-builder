// delayNode.js
// Introduces a configurable delay before passing data downstream.

import { useState } from 'react';
import { BaseNode } from './baseNode';

const UNITS = ['ms', 's', 'min'];

export const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useState(data?.duration || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon="⏱️"
      type="delay"
      inputs={[{ id: 'trigger', label: 'Trigger' }]}
      outputs={[{ id: 'done', label: 'Done' }]}
    >
      <div className="node-field">
        <label>Duration</label>
        <input
          type="number"
          min={0}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>
      <div className="node-field">
        <label>Unit</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          {UNITS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
