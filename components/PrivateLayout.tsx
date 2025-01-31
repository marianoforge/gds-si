// components/PrivateLayout.tsx
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const router = useRouter();

  const setActiveView = (view: string) => {
    switch (view) {
      case "reservationInput":
        router.push("/reservationInput");
        break;
      case "dashboard":
        router.push("/dashboard");
        break;
      case "eventForm":
        router.push("/eventForm");
        break;
      case "calendar":
        router.push("/calendar");
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar setActiveView={setActiveView} />
      <main className="flex-grow p-4 sm:p-6 md:p-8">{children}</main>
      <Footer setActiveView={setActiveView} />
    </div>
  );
};

export default PrivateLayout;
