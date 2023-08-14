import { Suspense, lazy } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { Auth0Provider } from "@auth0/auth0-react";

import CityList from "./components/CityList";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getPlaceName } from "./services/apiPlaceName";
import { usePlace } from "./Features/places/usePlace";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
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

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Auth0Provider
          domain="dev-x5045ld1e106zhqm.us.auth0.com"
          clientId="FWNunhOz4jdyLmvFt3CG9X729Un4JIt9"
          authorizationParams={{
            redirect_uri: "http://localhost:5173/app",
          }}
        >
          <CitiesProvider>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="product" element={<Product />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="cities" replace />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountriesList />} />
                    <Route path="form" element={<Form />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CitiesProvider>
          <button>submit</button>
        </Auth0Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
