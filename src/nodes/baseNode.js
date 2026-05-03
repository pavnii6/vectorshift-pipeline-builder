// BaseNode.js

import { Handle, Position } from 'reactflow';
import './nodes.css';

/**
 * @param {string}   id
 * @param {string}   title
 * @param {string}   [icon]
 * @param {string}   [type]       — CSS modifier, e.g. "llm", "text"
 * @param {string[]} [inputs]     — labels for left-side target handles
 * @param {string[]} [outputs]    — labels for right-side source handles
 * @param {ReactNode} children
 */
export const BaseNode = ({ id, title, icon, type = '', inputs = [], outputs = [], children }) => {
  const pct = (i, total) => `${((i + 1) / (total + 1)) * 100}%`;

  return (
    <div className={`base-node base-node--${type}`}>
      {/* ── Header ── */}
      <div className="base-node__header">
        {icon && <span className="base-node__icon">{icon}</span>}
        <span className="base-node__title">{title}</span>
      </div>

      {/* ── Body ── */}
      <div className="base-node__body">{children}</div>

      {/* ── Left (target) handles ── */}
      {inputs.map((label, i) => (
        <Handle
          key={`in-${label}-${i}`}
          type="target"
          position={Position.Left}
          id={`${id}-${label}`}
          style={{ top: pct(i, inputs.length) }}
          title={label}
        />
      ))}

      {/* ── Right (source) handles ── */}
      {outputs.map((label, i) => (
        <Handle
          key={`out-${label}-${i}`}
          type="source"
          position={Position.Right}
          id={`${id}-${label}`}
          style={{ top: pct(i, outputs.length) }}
          title={label}
        />
      ))}
    </div>
  );
};
