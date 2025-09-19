export const ProfileTabs = () => {
  const tabs = ["Steam Information", "Comments", "CS2 Stats", "Users Comments"];
  return (
    <div className="flex justify-center mx-4 space-x-4 text-2xl text-white font-bold">
      {tabs.map((item, index) => (
        <p key={index} className="hover:text-indigo-500 cursor-pointer">
          {item}
        </p>
      ))}
    </div>
  );
};
