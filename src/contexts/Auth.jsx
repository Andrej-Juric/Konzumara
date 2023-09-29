import { createContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

export const AuthContext = createContext();

export default function Auth({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          role: is_admin ? "admin" : "user",
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
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        setUser(data.session.user);
        // console.log(data.session.user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setIsLoading(false);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
