import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  NodeTypes,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { EditorNodeType } from "../lib/nodes/node-type";
import TextMessageNode from "../nodes/text-message-node";
import useBotEditor from "../stores/useBotEditor";

const nodeTypes: NodeTypes = {
  textMessageNode: TextMessageNode,
};

export default function FlowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNewNode } =
    useBotEditor();
  const { screenToFlowPosition } = useReactFlow();

  function addNodeOnDrop(e: React.DragEvent<HTMLDivElement>) {
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
    addNewNode(
      e.dataTransfer.getData("text/plain") as EditorNodeType,
      position.x,
      position.y
    );
  }

  return (
    <>
      <div
        style={{ width: "100%", height: "100%" }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={addNodeOnDrop}
      >
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
