import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BotEditor } from "./features/bot-editor/components/bot-editor";

export const App = () => {
  return (
    <MantineProvider defaultColorScheme="light">
      <Notifications position="top-center" />
      <BotEditor />
    </MantineProvider>
  );
};
