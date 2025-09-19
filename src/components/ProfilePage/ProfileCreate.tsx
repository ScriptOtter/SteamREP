import { steamVerification } from "@/lib/steamVerification";

export const ProfileCreate = () => {
  return (
    <>
      <div className="w-full h-screen bg-gray-900">
        <div className="flex justify-center items-center text-white text-4xl">
          <button
            className="cursor-pointer bg-indigo-500 p-16"
            onClick={steamVerification}
          >
            Создать профиль!
          </button>
        </div>
      </div>
    </>
  );
};
