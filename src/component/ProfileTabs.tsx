export const ProfileTabs = () => {
  const tabs = ["Steam Information", "Comments", "Statistics cs2", "отзывы"];
  return (
    <div className="flex mx-4 space-x-4 text-2xl text-white font-bold">
      {tabs.map((item, index) => (
        <p key={index} className="hover:text-indigo-500 cursor-pointer">
          {item}
        </p>
      ))}
    </div>
  );
};
