import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Home, UserProfile, AdminHome, Authentication } from "../pages";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import { auth } from "../config/firebase.config";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred
          .getIdToken()
          .then((token) => {
            //console.log(token);
          })
          .catch((error) => {
            console.error("Error getting ID token:", error);
          });
      }
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [auth]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>404</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:uid" element={<UserProfile />} />
          </Route>

          {/* admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
          </Route>

          {/* auth */}
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route index element={<Authentication />} />
          </Route>
        </Routes>
      </Suspense>

      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" theme="light" />
    </QueryClientProvider>
  );
};

export default App;
