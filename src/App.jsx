import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import Main from "./layouts/Main";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const CreatePokemon = lazy(() => import("./pages/CreatePokemon"));
const PokemonDetails = lazy(() => import("./pages/PokemonDetails"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <Home />
                    </Suspense>
                ),
                // loader: () =>
                //     import("./pages/Home").then((module) => module.loader()),
            },
            {
                path: "/about",
                element: (
                    <Suspense>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/create-pokemon",
                element: (
                    <Suspense>
                        <CreatePokemon />
                    </Suspense>
                ),
            },
            {
                path: "/pokemon/:id",
                element: (
                    <Suspense>
                        <PokemonDetails />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
