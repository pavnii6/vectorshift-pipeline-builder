// loggerNode.js
// Logs data passing through the pipeline for debugging.

import { useState } from 'react';
import { BaseNode } from './baseNode';

const LOG_LEVELS = ['info', 'debug', 'warn', 'error'];

export const LoggerNode = ({ id, data }) => {
  const [level, setLevel] = useState(data?.level || 'info');
  const [prefix, setPrefix] = useState(data?.prefix || '[log]');

  return (
    <BaseNode
      id={id}
      title="Logger"
      icon="📋"
      type="logger"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'data', label: 'Pass-through' }]}
    >
      <div className="node-field">
        <label>Level</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          {LOG_LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <div className="node-field">
        <label>Prefix</label>
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="[log]"
        />
      </div>
    </BaseNode>
  );
};
