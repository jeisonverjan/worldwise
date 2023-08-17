import { Suspense, lazy } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import CityList from "./components/CityList";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PlaceProvider } from "./contexts/PlaceContext";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const domain = import.meta.env.VITE_MY_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_MY_AUTH0_CLIENT_ID;

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: "https://worldwise-v2.vercel.app/app",
          }}
        >
          <PlaceProvider>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="product" element={<Product />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="cities" replace />} />
                    <Route path="cities" element={<CityList />} exact />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountriesList />} />
                    <Route path="form" element={<Form />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </PlaceProvider>
        </Auth0Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
