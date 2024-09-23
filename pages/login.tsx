// Modificación en pages/login.tsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Configurar la persistencia de sesión a browserSessionPersistence
      await setPersistence(auth, browserSessionPersistence);

      // Autenticación del usuario
      await signInWithEmailAndPassword(auth, email, password);

      // Inicia el temporizador para cerrar sesión después de 60 minutos
      setTimeout(() => {
        auth.signOut();
        alert("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
        router.push("/login"); // Redirigir al login después de cerrar sesión
      }, 60 * 60 * 1000); // 60 minutos en milisegundos

      // Redirigir al dashboard una vez autenticado
      router.push("/dashboard");
    } catch {
      setError("Error al iniciar sesión, verifica tus credenciales.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
