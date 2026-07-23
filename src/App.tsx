import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const BlogPage = lazy(() => import("./components/BlogPage"));
const AdminBlog = lazy(() => import("./components/AdminBlog"));
const Startups = lazy(() => import("./components/Startups"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <MainContainer>
                <Suspense fallback={null}>
                  <CharacterModel />
                </Suspense>
              </MainContainer>
            } />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
