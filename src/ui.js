// ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }  from './nodes/inputNode';
import { LLMNode }    from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode }   from './nodes/textNode';
import { MathNode }   from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { APINode }    from './nodes/apiNode';
import { LoggerNode } from './nodes/loggerNode';
import { DelayNode }  from './nodes/delayNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

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

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event?.dataTransfer?.getData('application/reactflow');
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
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
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
