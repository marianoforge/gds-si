import PrivateRoute from "../components/PrivateRoute";
import PrivateLayout from "../components/PrivateLayout";
import FormularioEvento from "../components/FormularioEvento";
import { useUserStore } from "@/stores/authStore";
import { useEffect } from "react";

const ReservationInput = () => {
  const { userID, initializeAuthListener } = useUserStore();

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, [initializeAuthListener]);

  if (!userID) {
    return <p>Loading user information...</p>; // Optional loading state or redirect
  }

  return (
    <PrivateRoute>
      <PrivateLayout>
        <FormularioEvento user_uid={userID} />
      </PrivateLayout>
    </PrivateRoute>
  );
};

export default ReservationInput;
