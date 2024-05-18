import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { Nodes } from '../lib/nodes/nodes';


type BotEdtorState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeData: (nodeId: string, nodeData: Nodes["data"]) => void
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useBotEditor = create<BotEdtorState>((set, get) => ({
    nodes: [],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes: Node[]) => {
        set({ nodes });
    },
    setEdges: (edges: Edge[]) => {
        set({ edges });
    },
    updateNodeData: (nodeId: string, nodeData: Nodes["data"]) => {
        const newNodes = get().nodes.map(node => node.id !== nodeId ? node : { ...node, data: nodeData });
        set({ nodes: newNodes });
    }

}));

export default useBotEditor;
