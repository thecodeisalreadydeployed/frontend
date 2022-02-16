import { createContext, useContext, useEffect, useState } from "react";

import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

type SessionContextType = {
  user: User | null | undefined;
  login: () => void;
  logout: () => void;
};

const sessionContextDefaultValues: SessionContextType = {
  user: null,
  login: () => null,
  logout: () => null,
};

const SessionContext = createContext<SessionContextType>(
  sessionContextDefaultValues
);

export const useSession = (): SessionContextType => {
  return useContext(SessionContext);
};

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = (props: SessionProviderProps): JSX.Element => {
  const { children } = props;

  // null = unauthenticated, undefined = loading
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    getRedirectResult(auth);
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  if (user === undefined) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center space-y-2">
          <svg
            className="w-12 h-12 text-zinc-200 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http:www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            ></path>
          </svg>
          <p className="text-base font-normal text-zinc-200 animate-pulse">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
// interface AuthProps {
//   children: JSX.Element;
// }

// export const Auth = (props: AuthProps): JSX.Element => {
//   const { children } = props;

//   return children;

//   return (
//     <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//       <div className="flex flex-col items-center space-y-2">
//         <svg
//           className="w-12 h-12 text-zinc-200 animate-spin"
//           fill="none"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             fill="currentColor"
//           ></path>
//         </svg>
//         <p className="text-base font-normal text-zinc-200 animate-pulse">
//           Loading
//         </p>
//       </div>
//     </div>
//   );
// };
