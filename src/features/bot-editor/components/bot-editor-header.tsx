import { ActionIcon, Group, Image, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import SaveButton from "./bot-panel/components/save-button";

export const BotEditorHeader = () => {
  return (
    <Group p={"sm"} bg="gray.0">
      <Image src="images/logo.jpg" alt="LOGO" w={20} />
      <Text fw="bold">BiteSpeed</Text>
      <Group style={{ marginLeft: "auto" }} gap={"md"}>
        <ActionIcon
          variant="transparent"
          component="a"
          href="https://www.linkedin.com/in/anilsonix/"
          target="_blank"
        >
          <IconBrandLinkedin />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          component="a"
          href="https://github.com/AnilSonix/chatbot-poc"
          target="_blank"
        >
          <IconBrandGithub />
        </ActionIcon>
        <SaveButton />
      </Group>
    </Group>
  );
};
