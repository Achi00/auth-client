"use client";
import { UserContextType } from "@/types/ContextType";
import { UserType } from "@/types/UserType";
import { getServerUser } from "@/util/UserControllers";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// create context with custom hook to handle user == null correctlly
const userContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: UserType | null;
}) {
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const router = useRouter();

  let pathname = usePathname();

  useEffect(() => {
    // Listen for route changes and refetch user data on route change
    const handleRouteChange = async () => {
      try {
        setLoading(true);
        const user = await getServerUser();
        if (user !== null) {
          setUser(user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleRouteChange();
  }, [initialUser, pathname]);

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
    setLoading(false);
  };

  return (
    <userContext.Provider value={{ user, loading, logout }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}
