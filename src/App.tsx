import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./RootLayout/RootLayout";
import { Error } from "./Pages/Error";

import { SuspenseSpinner } from "./components/SuspenseSpinner";
import { lazy, Suspense } from "react";
import { MovieDetail } from "./Pages/MovieDetail";

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
const SeriesDetail = lazy(() =>
  import("./Pages/SeriesDetail").then(({ SeriesDetail }) => ({
    default: SeriesDetail
  }))
);

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

        children: [
          {
            index: true,
            element: <Movies />
          },
          {
            path: "movie/:id",
            element: <MovieDetail />
          }
        ]
      },
      {
        path: "/series",
        children: [
          {
            index: true,
            element: <Series />
          },
          {
            path: "/series/:id",
            element: <SeriesDetail />
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
