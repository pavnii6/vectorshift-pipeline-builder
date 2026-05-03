// textNode.js
// Auto-resizing textarea + {{variable}} detection → dynamic input handles.

import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './nodes.css';

const VARIABLE_REGEX = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  VARIABLE_REGEX.lastIndex = 0;
  let match;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText]   = useState(data?.text || '');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || ''));
  const textareaRef               = useRef(null);

  // Auto-resize: grow height to fit content
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => { autoResize(); }, [currText, autoResize]);

  const handleChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    setVariables(extractVariables(val));
  };

  const pct = (i, total) => `${((i + 1) / (total + 1)) * 100}%`;

  return (
    <div className="base-node base-node--text" style={{ minWidth: 230 }}>
      {/* Header */}
      <div className="base-node__header">
        <span className="base-node__icon">📝</span>
        <span className="base-node__title">Text</span>
      </div>

      {/* Body */}
      <div className="base-node__body">
        <div className="node-field">
          <label>Content</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleChange}
            placeholder={'Type text with variables like {{name}}'}
            rows={2}
            style={{ minHeight: 40, overflow: 'hidden' }}
          />
        </div>

        {/* Detected variable badges */}
        {variables.length > 0 && (
          <div className="var-badges">
            {variables.map((v) => (
              <span key={v} className="var-badge">
                <span className="var-badge__dot" />
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic input handles — one per {{variable}} */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: pct(i, variables.length) }}
          title={varName}
        />
      ))}

      {/* Single output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />
    </div>
  );
};
