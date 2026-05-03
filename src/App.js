// App.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useStore }        from './store';
import { shallow }         from 'zustand/shallow';
import { PipelineToolbar } from './toolbar';
import { SubmitButton }    from './submit';

import { InputNode }  from './nodes/inputNode';
import { LLMNode }    from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode }   from './nodes/textNode';
import { MathNode }   from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { APINode }    from './nodes/apiNode';
import { LoggerNode } from './nodes/loggerNode';
import { DelayNode }  from './nodes/delayNode';

import './index.css';
import './nodes/nodes.css';

// ── Node type registry ────────────────────────────────────────────────────────
const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  math:         MathNode,
  filter:       FilterNode,
  api:          APINode,
  logger:       LoggerNode,
  delay:        DelayNode,
};

const NODE_COLORS = {
  customInput: '#22c55e', customOutput: '#f59e0b',
  llm: '#6366f1', text: '#0ea5e9', math: '#ec4899',
  filter: '#14b8a6', api: '#f97316', logger: '#8b5cf6', delay: '#64748b',
};

const proOptions = { hideAttribution: true };
const gridSize   = 20;

// ── Store selector ────────────────────────────────────────────────────────────
const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

// ── Empty state overlay ───────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="empty-state">
    <span className="empty-state__icon">🧩</span>
    <p className="empty-state__text">
      Your canvas is empty.<br />Click or drag a node above to start building.
    </p>
    <span className="empty-state__hint">
      Try clicking <strong>Text</strong> or <strong>LLM</strong> to add your first node
    </span>
  </div>
);

// ── Canvas ────────────────────────────────────────────────────────────────────
const PipelineCanvas = () => {
  const reactFlowWrapper                 = useRef(null);
  const [reactFlowInstance, setInstance] = useState(null);

  const {
    nodes, edges,
    getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw    = event?.dataTransfer?.getData('application/reactflow');
      if (!raw) return;
      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      const id = getNodeID(type);
      addNode({ id, type, position, data: { id, nodeType: type } });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Empty state — shown only when no nodes exist */}
      {nodes.length === 0 && <EmptyState />}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setInstance}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        style={{ background: '#0f172a' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#1e293b"
          gap={gridSize}
          size={1.5}
        />
        <Controls
          style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
          }}
        />
        <MiniMap
          style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)' }}
          nodeColor={(node) => NODE_COLORS[node.type] || '#475569'}
          maskColor="rgba(15,23,42,0.7)"
        />
      </ReactFlow>
    </div>
  );
};

// ── App root ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app-shell">
      <PipelineToolbar />
      <main className="app-canvas">
        <PipelineCanvas />
      </main>
      <SubmitButton />
    </div>
  );
}

export default App;
