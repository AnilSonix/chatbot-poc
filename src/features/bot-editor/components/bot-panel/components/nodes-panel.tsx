import { ActionIcon, Box, Button, Divider, Group, Text } from "@mantine/core";
import { IconArrowLeft, IconMessage } from "@tabler/icons-react";
import { match } from "ts-pattern";
import { EditorNodeType } from "../../../lib/nodes/node-type";
import useBotEditor from "../../../stores/useBotEditor";
import useSelectedNodeAndEdge from "../hooks/useSelectedNodeAndEdge";
import TextMessageNodeSettings from "./text-message-node-settings";

export default function NodesPanel() {
  const { selectedNode } = useSelectedNodeAndEdge();
  const deselectAllNodes = useBotEditor((s) => s.deselectAllNodes);

  if (selectedNode) {
    return (
      <Box h="100%">
        <Group p="xs">
          <ActionIcon variant="transparent" onClick={deselectAllNodes}>
            <IconArrowLeft />
          </ActionIcon>
          <Text>Settings</Text>
        </Group>
        <Divider />
        <Box p="sm">
          {match(selectedNode.type as EditorNodeType)
            .with(EditorNodeType.textMessageNode, () => (
              <TextMessageNodeSettings nodeId={selectedNode.id} />
            ))
            .exhaustive()}
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box p="sm">
        <Button
          leftSection={<IconMessage />}
          variant="outline"
          fullWidth
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData(
              "text/plain",
              EditorNodeType.textMessageNode
            );
          }}
        >
          Message
        </Button>
      </Box>
    </>
  );
}
