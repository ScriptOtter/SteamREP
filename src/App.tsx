//import { MostReportedPlayersPage } from "./pages/MostReporotedPlayersPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage.tsx";

import { ReportPlayerPage } from "./pages/ReportPlayerPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { ToastContainer } from "react-toastify";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { AccountRecoveryPage } from "./pages/AccountRecoveryPage.tsx";

import { SignInForm } from "./component/AuthForm/SignInForm.tsx";
import { SignUpForm } from "./component/AuthForm/SignUpForm.tsx";
import { PasswordRecoveryForm } from "./component/AuthForm/PasswordRecoveryForm.tsx";
import { BlogPage } from "./pages/BlogPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route
            path="/MostReportedPlayers"
            element={<MostReportedPlayersPage />}
          /> */}
          <Route path="/auth/signin" element={<SignInForm />} />
          <Route path="/auth/signup" element={<SignUpForm />} />
          <Route path="/auth/recovery" element={<PasswordRecoveryForm />} />
          <Route path="/report" element={<ReportPlayerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/account/verify" element={<HomePage />} />
          <Route
            path="/account/recovery/:id"
            element={<AccountRecoveryPage />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      {/* <HomePage /> */}
      {/* <MostReportedPlayersPage /> */}
    </>
  );
}

export default App;
