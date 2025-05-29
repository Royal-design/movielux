import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./RootLayout/RootLayout";
import { Error } from "./Pages/Error";

import { SuspenseSpinner } from "./components/SuspenseSpinner";
import { lazy, Suspense } from "react";

// lazy loading the pages
const Home = lazy(() =>
  import("./Pages/Home").then(({ Home }) => ({
    default: Home
  }))
);
const Movies = lazy(() =>
  import("./Pages/Movies").then(({ Movies }) => ({
    default: Movies
  }))
);
const Series = lazy(() =>
  import("./Pages/Series").then(({ Series }) => ({
    default: Series
  }))
);
const Tv = lazy(() =>
  import("./Pages/Tv").then(({ Tv }) => ({
    default: Tv
  }))
);

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <Suspense fallback={<SuspenseSpinner />}>
          <RootLayout />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<SuspenseSpinner />}>
          <Error />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/movies",
          element: <Movies />
        },
        {
          path: "/series",
          element: <Series />
        },
        {
          path: "/tv",
          element: <Tv />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
