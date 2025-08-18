//import { MostReportedPlayersPage } from "./pages/MostReporotedPlayersPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage.tsx";
import { SignIn } from "./auth/SignIn.tsx";
import { SignUp } from "./auth/SignUp.tsx";
import { ReportPlayerPage } from "./pages/ReportPlayerPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { ToastContainer } from "react-toastify";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { AccountRecoveryPage } from "./pages/AccountRecoveryPage.tsx";

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
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/report" element={<ReportPlayerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
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
