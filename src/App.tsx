import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { MostReportedPlayersPage } from "./pages/MostReporotedPlayersPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./pages/NoPage.tsx";
import { SignIn } from "./auth/SignIn.tsx";
import { SignUp } from "./auth/SignUp.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";

function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/MostReportedPlayers"
            element={<MostReportedPlayersPage />}
          />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      {/* <HomePage /> */}
      {/* <MostReportedPlayersPage /> */}
    </>
  );
}

export default App;
