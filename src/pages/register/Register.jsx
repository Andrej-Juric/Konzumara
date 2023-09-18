import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import Auth from "../auth/Auth";


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
    lastname: yup
  .string()
  .required("Last name is required"),

    password: yup.string().min(6).required()
    .oneOf([yup.ref("confirmPassword"), null], "Passwords must match"),
confirmPassword: yup
  .string()
  .min(6)
  .required()
  .oneOf([yup.ref("password"), null], "Passwords must match"),
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
    <Auth>
    {({ user, signIn, signOut, signUp }) => (
      <div>
        
        {user ? (
          <div>
            <p>Prijavljeni ste kao: {user.email}</p>
            <button onClick={signOut}>Odjava</button>
          </div>
        ) : (
          <div>
            
            <Paper radius="md" p="xl">
              <Text size="lg" weight={500}>
                Welcome to Lidlara, {type} with
              </Text>

              <Divider labelPosition="center" my="lg" />

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    if (type === "register") {
                      await signUp(form.values.email, form.values.password);
                    } else {
                      await signIn(form.values.email, form.values.password);
                    }
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
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
                      label="Last name"
                      placeholder="Your last name"
                      value={form.values.lastname}
                      onChange={(event) =>
                        form.setFieldValue("lastname", event.currentTarget.value)
                      }
                      radius="md"
                    />

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
                  <PasswordInput
                    required
                    label="Confirm your password"
                    placeholder="Confirm your password"
                    value={form.values.confirmPassword}
                    onChange={(event) =>
                      form.setFieldValue("confirmPassword", event.currentTarget.value)
                    }
                    error={
                      form.errors.password &&
                      "Your password does not match. Try again"
                    }
                    radius="md"
                  />

                  {type === "register" && (
                    <Checkbox
                      label="Is admin"
                      checked={form.values.admin}
                      onChange={(event) =>
                        form.setFieldValue(
                          "admin",
                          event.currentTarget.checked
                        )
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
          </div>
        )}
      </div>
    )}
  </Auth>
  );
}
