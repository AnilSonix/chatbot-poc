import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import TextMessageNode from "../nodes/text-message-node";
import useBotEditor from "../stores/useBotEditor";

const nodeTypes: NodeTypes = {
  textMessageNode: TextMessageNode,
};

export default function FlowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useBotEditor();

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
