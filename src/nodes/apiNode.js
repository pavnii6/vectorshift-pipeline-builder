// apiNode.js
// Makes an HTTP request to an external API endpoint.

import { useState } from 'react';
import { BaseNode } from './baseNode';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      type="api"
      inputs={[
        { id: 'body', label: 'Body' },
        { id: 'headers', label: 'Headers' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'error', label: 'Error' },
      ]}
    >
      <div className="node-field">
        <label>Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          {METHODS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="node-field">
        <label>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
      </div>
    </BaseNode>
  );
};
