import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import NavBar from "./components/NavBar";

// publicly available pages:
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";
import RecipeListPage from "./pages/RecipeListPage";

// protected user pages:
import UserProfilePage from "./pages/user/UserProfilePage";
import UserNotePadPage from "./pages/user/UserNotePadPage";

// protected admin pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminRecipesPage from "./pages/admin/AdminRecipesPage";
import AdminCreateRecipePage from "./pages/admin/AdminCreateRecipePage";
import AdminEditRecipePage from "./pages/admin/AdminEditRecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FooterComponent from "./components/FooterComponent";
import ScrollToTop from "./components/ScrollToTopComponent";
import AdminTermsPage from "./pages/admin/AdminTermsPage";
import AdminCreateTermPage from "./pages/admin/AdminCreateTermPage";
import AdminEditTermPage from "./pages/admin/AdminEditTermPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ScrollToTop />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/technical-terms" element={<TermsPage />} />
        <Route path="/recipe-list" element={<RecipeListPage />} />
        <Route path="/recipe-details" element={<RecipeDetailsPage />} />
        <Route path="/recipe-details/:id" element={<RecipeDetailsPage />} />
        <Route path="/*" element="Page not exists 404" />
        {/* user protected routes:  */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/notepad" element={<UserNotePadPage />} />
        </Route>
        {/* admin protected routes:  */}
        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route path="/admin/recipes" element={<AdminRecipesPage />} />
          <Route
            path="/admin/create-recipe"
            element={<AdminCreateRecipePage />}
          />
          <Route path="/admin/edit-recipe" element={<AdminEditRecipePage />} />
          <Route path="/admin/terms" element={<AdminTermsPage />} />
          <Route path="/admin/create-terms" element={<AdminCreateTermPage />} />
          <Route path="/admin/edit-term" element={<AdminEditTermPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
