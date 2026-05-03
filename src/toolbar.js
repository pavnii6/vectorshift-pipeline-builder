// toolbar.js

import { useStore } from './store';

const NODE_DEFS = [
  { type: 'customInput',  label: 'Input',   icon: '📥', color: '#22c55e', glow: 'rgba(34,197,94,0.35)'   },
  { type: 'customOutput', label: 'Output',  icon: '📤', color: '#f59e0b', glow: 'rgba(245,158,11,0.35)'  },
  { type: 'llm',          label: 'LLM',     icon: '🤖', color: '#6366f1', glow: 'rgba(99,102,241,0.35)'  },
  { type: 'text',         label: 'Text',    icon: '📝', color: '#0ea5e9', glow: 'rgba(14,165,233,0.35)'  },
  { type: 'math',         label: 'Math',    icon: '➗', color: '#ec4899', glow: 'rgba(236,72,153,0.35)'  },
  { type: 'filter',       label: 'Filter',  icon: '🔍', color: '#14b8a6', glow: 'rgba(20,184,166,0.35)'  },
  { type: 'api',          label: 'API',     icon: '🌐', color: '#f97316', glow: 'rgba(249,115,22,0.35)'  },
  { type: 'logger',       label: 'Logger',  icon: '📋', color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)'  },
  { type: 'delay',        label: 'Delay',   icon: '⏱️', color: '#64748b', glow: 'rgba(100,116,139,0.35)' },
];

const NodeButton = ({ type, label, icon, color, glow }) => {
  const addNode = useStore((s) => s.addNode);

  const handleClick = () => addNode(type);

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <button
      draggable
      onClick={handleClick}
      onDragStart={handleDragStart}
      className="toolbar-btn"
      style={{ '--accent': color, '--glow': glow }}
      title={`Add ${label} node`}
    >
      <span className="toolbar-btn__icon">{icon}</span>
      <span className="toolbar-btn__label">{label}</span>
    </button>
  );
};

export const PipelineToolbar = () => (
  <header className="toolbar">
    {/* Brand */}
    <div className="toolbar__brand">
      <span className="toolbar__brand-icon">⚡</span>
      <span className="toolbar__brand-name">Pipeline</span>
    </div>

    <div className="toolbar__divider" />

    {/* Node buttons */}
    <nav className="toolbar__nodes">
      {NODE_DEFS.map((n) => (
        <NodeButton key={n.type} {...n} />
      ))}
    </nav>
  </header>
);
