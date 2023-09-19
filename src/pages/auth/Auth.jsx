import { createContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

// context
export const AuthContext = createContext();

export default function Auth({ children }) {
  const [user, setUser] = useState(null);

  console.log(user);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
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

  const signUp = async (email, password, full_name, is_admin) => {
    console.log("slanje zahtjeva");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    });
    await supabase
      .from("profiles")
      .update({
        is_admin,
      })
      .eq("id", data.user.id);
    console.log(email);
    console.log(password);
    console.log(full_name);

    console.log(is_admin);
    console.log("odgovor na reg:", data, error);
    if (error) {
      throw new Error("Greška", error.message);
    }
    setUser(user);
  };
  // return children({ user, signIn, signOut, signUp });
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
