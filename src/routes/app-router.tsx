import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../components";
import { Home } from "../features";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
