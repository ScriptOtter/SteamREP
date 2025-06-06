export const HeaderOverwatch = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#282a2e] rounded-xl px-4 py-4 my-2">
      <div className="flex-1 text-white">
        <h2 className="text-xl">Report Owner</h2>
      </div>
      <div className="flex-1 text-white">
        <h2 className="text-xl">Suspect</h2>
      </div>
      <div className="flex-1 text-white">
        <h2 className="text-xl">Time Created</h2>
      </div>
    </div>
  );
};
