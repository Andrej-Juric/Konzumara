import { useState } from "react";
import {supabase} from "../config/supabase"


export default function Auth({children}){
const [user, setUser] = useState(null)

    const signIn = async () => {
        const { user, error } = await supabase.auth.signInWithPassword({
          email, password
        })
        if (error) {
            throw new Error(error.message);
          }
          setUser(user)
          return user;
      }

      const signOut = async () => {
        const {error} = await supabase.auth.signOut()
        setUser(null);
      }

      const signUp = async () => {
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
          options,
        });
        if (error) {
          throw new Error(error.message);
        }
        setUser(user)
        return user;
      };
      return children ({user, signIn, signOut, signUp})
}

  