import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Title from "./pages/TitlePage/Title";
import Cart from "./pages/Cart/Cart";

function App() {
  const { currentUser } = useContext(AuthContext);

  const AuthRoute = ({ children }) => {
    return currentUser ? children : <Navigate to={"/"} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Title />,
    },
    {
      path: "/index",
      element: (
        <AuthRoute>
          <HomePage />
        </AuthRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <AuthRoute>
          <Cart />
        </AuthRoute>
      ),
    },
  ]);
  return (
    <CartProvider>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

export default App;
