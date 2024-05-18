import { Box, Button } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { Node } from "reactflow";
import { EditorNodeType } from "../../../lib/nodes/node-type";
import { TextMessageNode } from "../../../nodes/text-message-node";
import useBotEditor from "../../../stores/useBotEditor";
import { getRandomNumber } from "../utils/get-random-number";

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
          onClick={() => {
            addNode({
              id: EditorNodeType.textMessageNode + nanoid(),
              position: {
                x: getRandomNumber(100, 200),
                y: getRandomNumber(100, 200),
              },
              type: EditorNodeType.textMessageNode,
              data: {
                message: "👋 Hello from BiteSpeed",
              },
            } satisfies TextMessageNode);
          }}
        >
          Text node
        </Button>
      </Box>
    </>
  );
}
