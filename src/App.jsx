import { MantineProvider } from "@mantine/core";
import "./App.css";
import RenderRoutes from "./navigate/RenderRoutes";

export default function App() {
  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <RenderRoutes />
    </MantineProvider>
  );
}
