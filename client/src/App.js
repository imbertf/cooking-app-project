import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components
import NavBar from "./components/navigation/NavBar";
import ScrollToTop from "./components/ScrollToTopComponent";
import FooterComponent from "./components/FooterComponent";

// publicly available pages:
import HomePage from "./pages/HomePage";
import CallbackPage from "./pages/CallbackPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";

// protected user pages:
import UserProfilePage from "./pages/user/UserProfilePage";
import UserNotePadPage from "./pages/user/UserNotePadPage";

// protected admin pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminRecipesPage from "./pages/admin/AdminRecipesPage";
import AdminCreateRecipePage from "./pages/admin/AdminCreateRecipePage";
import AdminEditRecipePage from "./pages/admin/AdminEditRecipePage";
import AdminTermsPage from "./pages/admin/AdminTermsPage";
import AdminCreateTermPage from "./pages/admin/AdminCreateTermPage";
import AdminEditTermPage from "./pages/admin/AdminEditTermPage";
import AdminIngredientsPage from "./pages/admin/AdminIngredientsPage";
import AdminCreateIngredientPage from "./pages/admin/AdminCreateIngredientPage";
import AdminEditIngredientPage from "./pages/admin/AdminEditIngredientPage";
import PageLoader from "./components/PageLoader";
import { AuthenticationGuard } from "./components/authenticationGuard/AuthenticationGuard";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/technical-terms" element={<TermsPage />} />
        <Route path="/recipe-list" element={<RecipeListPage />} />
        <Route path="/recipe-details" element={<RecipeDetailsPage />} />
        <Route path="/recipe-details/:id" element={<RecipeDetailsPage />} />
        <Route path="/*" element="Page not exists 404" />

        {/* user protected routes:  */}
        <Route
          path="/user"
          element={<AuthenticationGuard component={UserProfilePage} />}
        />
        <Route
          path="/user/notepad"
          element={<AuthenticationGuard component={UserNotePadPage} />}
        />

        {/* admin protected routes:  */}
        <Route
          path="/admin/users"
          element={<AuthenticationGuard component={AdminUsersPage} />}
        />
        <Route
          path="/admin/edit-user"
          element={<AuthenticationGuard component={AdminEditUserPage} />}
        />
        <Route
          path="/admin/recipes"
          element={<AuthenticationGuard component={AdminRecipesPage} />}
        />
        <Route
          path="/admin/create-recipe"
          element={<AuthenticationGuard component={AdminCreateRecipePage} />}
        />
        <Route
          path="/admin/edit-recipe"
          element={<AuthenticationGuard component={AdminEditRecipePage} />}
        />
        <Route
          path="/admin/terms"
          element={<AuthenticationGuard component={AdminTermsPage} />}
        />
        <Route
          path="/admin/create-term"
          element={<AuthenticationGuard component={AdminCreateTermPage} />}
        />
        <Route
          path="/admin/edit-term"
          element={<AuthenticationGuard component={AdminEditTermPage} />}
        />
        <Route
          path="/admin/ingredients"
          element={<AuthenticationGuard component={AdminIngredientsPage} />}
        />
        <Route
          path="/admin/create-ingredient"
          element={
            <AuthenticationGuard component={AdminCreateIngredientPage} />
          }
        />
        <Route
          path="/admin/edit-ingredient"
          element={<AuthenticationGuard component={AdminEditIngredientPage} />}
        />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
