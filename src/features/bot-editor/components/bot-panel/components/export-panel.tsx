import { Button, Center, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconCheck,
  IconPackageExport,
} from "@tabler/icons-react";
import { Edge } from "reactflow";
import { match } from "ts-pattern";
import { EditorNodeType } from "../../../lib/nodes/node-type";
import { Nodes } from "../../../lib/nodes/nodes";
import useBotEditor from "../../../stores/useBotEditor";

export default function ExportPanel() {
  const { nodes, edges } = useBotEditor();

  function handleSave() {
    const errors = checkGraph(nodes as Nodes[], edges);
    if (errors.length === 0) {
      notifications.show({
        title: "Success",
        message: "Flow saved",
        color: "green",
        icon: <IconCheck />,
      });
    } else {
      errors.forEach((error) => {
        notifications.show({
          title: "Error",
          message: error,
          color: "red",
          icon: <IconAlertCircle />,
        });
      });
    }
  }

  return (
    <>
      <Center h="100%">
        <Stack>
          <IconPackageExport style={{ margin: "0 auto" }} size={36} />
          <Button onClick={handleSave}>Save</Button>
        </Stack>
      </Center>
    </>
  );
}

function checkGraph(nodes: Nodes[], edges: Edge[]) {
  const errors: string[] = [];

  if (nodes.length == 0) {
    errors.push("There are no nodes");
  }

  // check nodes count
  if (nodes.length > 1) {
    nodes.forEach((node) => {
      match(node)
        .with({ type: EditorNodeType.textMessageNode }, (node) => {
          const edge = edges.find(
            (e) => e.source === node.id || e.target === node.id
          );
          if (!edge) {
            errors.push(`Text message node (${node.data.message}) is not used`);
          }
        })
        .exhaustive();
    });
  }

  // check idle nodes

  return errors;
}
