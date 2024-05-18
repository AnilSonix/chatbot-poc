import { useState } from 'react';
import { Edge, Node, useOnSelectionChange } from 'reactflow';

export default function useSelectedNodeAndEdge() {

    const [selectedNode, setSelectedNode] = useState<Node | undefined>();
    const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>();

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setSelectedNode(nodes[0]);
            setSelectedEdge(edges[0]);
        },
    });
    return { selectedEdge, selectedNode }
}
