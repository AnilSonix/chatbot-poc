import { Box, Group, Paper, Text, rem } from "@mantine/core";
import { IconBrandWhatsapp, IconMessage } from "@tabler/icons-react";
import { Handle, Node, NodeProps, Position } from "reactflow";
import { EditorNodeType } from "../lib/nodes/node-type";
import { ITextMessageNodeData } from "../lib/nodes/text-message-node";

export type TextMessageNode = Node<ITextMessageNodeData>;

export default function MyTextMessageNode(
  node: NodeProps<ITextMessageNodeData>
) {
  return (
    <>
      <Paper
        withBorder
        shadow="sm"
        w={rem(250)}
        style={{ border: node.selected ? "0.15em dashed silver" : "" }}
      >
        <Group bg="green.1" p="xs">
          <IconMessage size={16} />
          <Text fw="500" size="sm">
            Send Message
          </Text>
          <IconBrandWhatsapp size={16} style={{ marginLeft: "auto" }} />
        </Group>
        <Box p="sm">
          <Text size="xs" truncate>
            {node.data.message || "Add a message"}
          </Text>
        </Box>
      </Paper>
      <Handle
        type="source"
        position={Position.Right}
        id={EditorNodeType.textMessageNode + "Source"}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={EditorNodeType.textMessageNode + "Target"}
      />
    </>
  );
}
