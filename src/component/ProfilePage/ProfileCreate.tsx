export const ProfileCreate = () => {
  const handleRedirect = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "steam/verify";
  };
  return (
    <>
      <div className="w-full h-screen bg-gray-900">
        <div className="flex justify-center items-center text-white text-4xl">
          <button
            className="cursor-pointer bg-indigo-500 p-16"
            onClick={handleRedirect}
          >
            Создать профиль!
          </button>
        </div>
      </div>
    </>
  );
};
