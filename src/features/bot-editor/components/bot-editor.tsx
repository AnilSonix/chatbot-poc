import { Box, Divider, Flex, rem } from "@mantine/core";
import { ReactFlowProvider } from "reactflow";
import { BotEditorHeader } from "./bot-editor-header";
import BotPanel from "./bot-panel/components/bot-panel";
import FlowEditor from "./flow-editor";

export const BotEditor = () => {
  return (
    <Flex style={{ flexDirection: "column" }} h={"100%"}>
      <BotEditorHeader />
      <Divider />
      <Flex style={{ flex: 1 }} w={"100%"} h="100%">
        <ReactFlowProvider>
          <FlowEditor />
          <Divider orientation="vertical" />
          <Box w={rem(400)} h="100%">
            <BotPanel />
          </Box>
        </ReactFlowProvider>
      </Flex>
    </Flex>
  );
};
