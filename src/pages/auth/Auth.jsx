import { useState } from "react";
import { supabase } from "../config/supabase";

export default function Auth({ children }) {
  const [user, setUser] = useState(null);

  console.log(user);

  const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    setUser(user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
  };

  const signUp = async (
    email,
    full_name,
    password,
    confirmPassword,
    is_admin
  ) => {
    console.log("slanje zahtjeva");
    const { user, error } = await supabase.auth.signUp({
      email,
      full_name,
      password,
      confirmPassword,
      is_admin,
    });
    console.log(email);
    console.log(full_name);
    console.log(password);
    console.log(confirmPassword);
    console.log(is_admin);
    console.log("odgovor na reg:", user, error);
    if (error) {
      throw new Error(error.message);
    }
    setUser(user);
  };
  return children({ user, signIn, signOut, signUp });
}
