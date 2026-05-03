// mathNode.js
// Performs a basic arithmetic operation on two numeric inputs.

import { useState } from 'react';
import { BaseNode } from './baseNode';

const OPERATIONS = ['+', '-', '×', '÷', 'mod', 'pow'];

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || '+');

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="➗"
      type="math"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <div className="node-field">
        <label>Operation</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          {OPERATIONS.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
