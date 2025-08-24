import { Box, Button } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { Node } from "reactflow";
import { EditorNodeType } from "../../../lib/nodes/node-type";
import useBotEditor from "../../../stores/useBotEditor";

export default function NodesPanel() {
  const { setNodes, nodes } = useBotEditor();

  function addNode(node: Node) {
    setNodes([...nodes, node]);
  }

  return (
    <>
      <Box p="sm">
        <Button
          leftSection={<IconMessage />}
          variant="light"
          fullWidth
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData(
              "text/plain",
              EditorNodeType.textMessageNode
            );
          }}
        >
          Text node
        </Button>
      </Box>
    </>
  );
}
