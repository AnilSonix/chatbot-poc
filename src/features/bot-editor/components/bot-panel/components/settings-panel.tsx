import { Box, Center, Stack, Text, Title } from "@mantine/core";
import { IconClick } from "@tabler/icons-react";
import { match } from "ts-pattern";
import { EditorNodeType } from "../../../lib/nodes/node-type";
import useSelectedNodeAndEdge from "../hooks/useSelectedNodeAndEdge";
import TextMessageNodeSettings from "./text-message-node-settings";

export default function SettingsPanel() {
  const { selectedNode } = useSelectedNodeAndEdge();

  if (!selectedNode) {
    return (
      <>
        <Center h="100%">
          <Stack gap={0}>
            <IconClick style={{ margin: "0 auto" }} size={36} />
            <Title order={4} fw={500} ta={"center"} mt="lg">
              Select a node first
            </Title>
            <Text ta="center" c="dimmed" size="sm">
              to see the settings
            </Text>
          </Stack>
        </Center>
      </>
    );
  }

  return (
    <>
      <Box h="100%" p="xs">
        {match(selectedNode.type as EditorNodeType)
          .with(EditorNodeType.textMessageNode, () => (
            <TextMessageNodeSettings nodeId={selectedNode.id} />
          ))
          .exhaustive()}
      </Box>
    </>
  );
}
