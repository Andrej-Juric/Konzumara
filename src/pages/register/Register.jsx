import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import * as yup from "yup";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";

export default function Register() {
  const [type, toggle] = useToggle(["login", "register"]);
  // const form = useForm({
  //   initialValues: {
  //     email: "",
  //     name: "",
  //     password: "",
  //     admin: true,
  //   },

  //   validate: {
  //     email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
  //     password: (val) =>
  //       val.length <= 6
  //         ? "Password should include at least 6 characters"
  //         : null,
  //   },
  // });

  const registrationSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: type === "register" ? yup.string().required() : yup.string(),
    password: yup.string().min(6).required(),
  });

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      admin: true,
    },
    validationSchema: registrationSchema,
  });

  return (
    <Paper radius="md" p="xl">
      <Text size="lg" weight={500}>
        Welcome to Lidlara, {type} with
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="Is admin"
              checked={form.values.admin}
              onChange={(event) =>
                form.setFieldValue("admin", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
