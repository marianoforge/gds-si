import { create } from "zustand";

export interface UserData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  numeroTelefono: string | null;
  comision: number | null;
}

interface UserDataState {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  setUserData: (userData: UserData | null) => void;
  fetchUserData: (user_uid: string) => Promise<void>;
  clearUserData: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  userData: null,
  isLoading: false,
  error: null,
  setUserData: (userData) => set({ userData }),
  fetchUserData: async (user_uid: string) => {
    set({ isLoading: true, error: null });
    try {
      if (!user_uid) {
        throw new Error("No hay usuario autenticado");
      }

      console.log("Fetching user data for UID:", user_uid);
      const response = await fetch(`/api/userInfo?user_uid=${user_uid}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Error al obtener los datos del usuario: ${response.status} ${response.statusText}`
        );
      }

      const userData = await response.json();
      console.log("Raw user data received:", userData);

      if (!userData || typeof userData !== "object") {
        throw new Error("Datos de usuario inválidos recibidos del servidor");
      }

      // Ensure all expected fields are present
      const validatedUserData = {
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        email: userData.email || null,
        numeroTelefono: userData.numeroTelefono || null,
        comision: userData.comision || null,
      };

      console.log("Validated user data:", validatedUserData);
      set({ userData: validatedUserData, isLoading: false });
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  clearUserData: () => set({ userData: null, error: null }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
