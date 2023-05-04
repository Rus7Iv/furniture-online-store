import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { user, signIn, signOut };
}
