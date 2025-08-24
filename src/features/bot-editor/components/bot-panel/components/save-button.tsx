import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { Edge } from "reactflow";
import { match } from "ts-pattern";
import { EditorNodeType } from "../../../lib/nodes/node-type";
import { Nodes } from "../../../lib/nodes/nodes";
import useBotEditor from "../../../stores/useBotEditor";

export default function SaveButton() {
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
      console.error({ errors });

      notifications.show({
        title: "Error",
        message: "Can't save changes",
        color: "red",
        icon: <IconAlertCircle />,
      });
    }
  }

  return (
    <>
      <Button variant="outline" onClick={handleSave}>
        Save changes
      </Button>
    </>
  );
}

function checkGraph(nodes: Nodes[], edges: Edge[]) {
  const errors: string[] = [];

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
