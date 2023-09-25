import { MantineProvider } from "@mantine/core";
import "./App.css";
import RenderRoutes from "./navigate/RenderRoutes";
import { ModalsProvider } from "@mantine/modals";

export default function App() {
  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
        <RenderRoutes />
      </ModalsProvider>
    </MantineProvider>
  );
}
