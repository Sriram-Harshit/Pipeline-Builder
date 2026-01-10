from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Basic node representation (we only care about id for graph checks)
class Node(BaseModel):
    id: str


# Edge connects one node to another
class Edge(BaseModel):
    source: str
    target: str


# Incoming pipeline payload
class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# Simple DAG check using Kahn’s algorithm
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = [node_id for node_id in indegree if indegree[node_id] == 0]
    visited = 0

    while queue:
        current = queue.pop(0)
        visited += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    # Nothing on the canvas yet
    if not pipeline.nodes:
        return {
            "num_nodes": 0,
            "num_edges": 0,
            "is_dag": True,
            "message": "Pipeline is empty",
        }

    # Nodes exist but nothing is wired together
    if not pipeline.edges:
        return {
            "num_nodes": len(pipeline.nodes),
            "num_edges": 0,
            "is_dag": True,
            "message": "No edges connected",
        }

    node_ids = {node.id for node in pipeline.nodes}

    # Guard against invalid edges pointing to missing nodes
    for edge in pipeline.edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            raise HTTPException(
                status_code=400,
                detail="Edge references non-existent node",
            )

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status,
        "message": "Pipeline parsed successfully",
    }
