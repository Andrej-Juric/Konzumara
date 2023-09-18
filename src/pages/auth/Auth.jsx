import { useState } from "react";
import { supabase } from "../config/supabase";

export default function Auth({ children }) {
  const [user, setUser] = useState(null);

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

  const signUp = async (email, password, is_admin, full_name) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        full_name,
        is_admin,
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    setUser(user);
  };
  return children({ user, signIn, signOut, signUp });
}
