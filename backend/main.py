"""
main.py — FastAPI backend for the pipeline builder.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request schema ────────────────────────────────────────────────────────────

class PipelineRequest(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


# ── DAG detection ─────────────────────────────────────────────────────────────

def is_dag(nodes: list[dict], edges: list[dict]) -> bool:
    """
    Return True if the directed graph defined by nodes/edges is a DAG
    (i.e. contains no cycles).  Uses iterative DFS with a 3-colour scheme:
      0 = unvisited, 1 = in current path, 2 = fully processed
    """
    # Build adjacency list keyed by node id
    adj: dict[str, list[str]] = {n["id"]: [] for n in nodes}
    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in adj:
            adj[src].append(tgt)

    colour = {n["id"]: 0 for n in nodes}

    for start in adj:
        if colour[start] != 0:
            continue

        # Iterative DFS — stack holds (node_id, iterator_over_neighbours)
        stack = [(start, iter(adj[start]))]
        colour[start] = 1  # mark as in-progress

        while stack:
            node, neighbours = stack[-1]
            try:
                nxt = next(neighbours)
                if colour.get(nxt, 0) == 1:
                    # Back-edge found → cycle exists → not a DAG
                    return False
                if colour.get(nxt, 0) == 0:
                    colour[nxt] = 1
                    stack.append((nxt, iter(adj.get(nxt, []))))
            except StopIteration:
                colour[node] = 2  # fully processed
                stack.pop()

    return True


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    """
    Analyse a pipeline and return:
      - num_nodes : total node count
      - num_edges : total edge count
      - is_dag    : whether the graph is a Directed Acyclic Graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }
