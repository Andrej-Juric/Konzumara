import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import Auth from "../../contexts/Auth";
import { AuthContext } from "../../contexts/Auth";

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
import { useContext, useState } from "react";
import UserScreen from "../home/Home";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [type, toggle] = useToggle(["login", "register"]);
  const { user, signIn, signOut, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const registrationSchema = yup.object().shape({
    email: yup.string().email().required(),
    full_name: type === "register" ? yup.string().required() : yup.string(),

    password: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref("confirmPassword"), null], "Passwords must match"),
    confirmPassword: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    is_admin: yup.boolean(),
  });

  const form = useForm({
    initialValues: {
      email: "",
      full_name: "",
      password: "",
      confirmPassword: "",
      is_admin: true,
    },
    validationSchema: registrationSchema,
  });

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
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
                      await signUp(
                        form.values.email,
                        form.values.password,
                        form.values.full_name,
                        // form.values.confirmPassword,
                        form.values.is_admin
                      );
                      navigate("/homepage");
                    } else {
                      await signIn(form.values.email, form.values.password);
                      navigate("/homepage");
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <Stack>
                  {type === "register" && (
                    <TextInput
                      required
                      label="Full name"
                      placeholder="Your full name"
                      value={form.values.full_name}
                      onChange={(event) =>
                        form.setFieldValue(
                          "full_name",
                          event.currentTarget.value
                        )
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
                    <PasswordInput
                      required
                      label="Confirm your password"
                      placeholder="Confirm your password"
                      value={form.values.confirmPassword}
                      onChange={(event) =>
                        form.setFieldValue(
                          "confirmPassword",
                          event.currentTarget.value
                        )
                      }
                      error={
                        form.errors.password &&
                        "Your password does not match. Try again"
                      }
                      radius="md"
                    />
                  )}

                  {type === "register" && (
                    <Checkbox
                      label="Is admin"
                      checked={form.values.is_admin}
                      onChange={(event) =>
                        form.setFieldValue(
                          "is_admin",
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
    </AuthContext.Provider>
  );
}
