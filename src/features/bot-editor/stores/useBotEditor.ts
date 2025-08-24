import { nanoid } from "nanoid";
import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { match } from "ts-pattern";
import { create } from "zustand";
import { EditorNodeType } from "../lib/nodes/node-type";
import { Nodes } from "../lib/nodes/nodes";
import { TextMessageNode } from "../nodes/text-message-node";

type BotEdtorState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeId: string, nodeData: Nodes["data"]) => void;
  addNewNode: (type: EditorNodeType, x: number, y: number) => void;
  deselectAllNodes: VoidFunction;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useBotEditor = create<BotEdtorState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect(connection) {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes(nodes) {
    set({ nodes });
  },
  setEdges(edges) {
    set({ edges });
  },
  updateNodeData(nodeId, nodeData) {
    const newNodes = get().nodes.map((node) =>
      node.id !== nodeId ? node : { ...node, data: nodeData }
    );
    set({ nodes: newNodes });
  },
  addNewNode(type, x, y) {
    const newNode = match(type)
      .with(
        EditorNodeType.textMessageNode,
        () =>
          ({
            id: EditorNodeType.textMessageNode + nanoid(),
            position: {
              x,
              y,
            },
            type: EditorNodeType.textMessageNode,
            data: {
              message: "👋 Hello from BiteSpeed",
            },
          } satisfies TextMessageNode)
      )
      .exhaustive();

    get().setNodes([...get().nodes, newNode]);
  },
  deselectAllNodes() {
    const nodes = get().nodes.map((n) => {
      n.selected = false;
      return n;
    });
    get().setNodes(nodes);
  },
}));

export default useBotEditor;
