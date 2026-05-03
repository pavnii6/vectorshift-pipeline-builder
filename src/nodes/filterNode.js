// filterNode.js
// Filters a data stream based on a field + condition + value.

import { useState } from 'react';
import { BaseNode } from './baseNode';

const CONDITIONS = ['==', '!=', '>', '<', '>=', '<=', 'contains', 'startsWith'];

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || 'field');
  const [condition, setCondition] = useState(data?.condition || '==');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      type="filter"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[
        { id: 'pass', label: 'Pass' },
        { id: 'fail', label: 'Fail' },
      ]}
    >
      <div className="node-field">
        <label>Field</label>
        <input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="e.g. status"
        />
      </div>
      <div className="node-field">
        <label>Condition</label>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="node-field">
        <label>Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. active"
        />
      </div>
    </BaseNode>
  );
};
