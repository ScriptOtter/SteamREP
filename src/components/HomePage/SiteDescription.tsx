export const SiteDescription = () => {
  return (
    <div className="flex items-center text-white w-full justify-between xl:mx-4 px-2 space-x-4 mb-8 fade-in-feature">
      <div className="w-full h-full outline-1 outline-light-gray/35 bg-light-gray/10 rounded-2xl py-2">
        <div className="py-7 sm:py-4">
          <p className="text-xl text-center mb-2">Detailed Match History</p>
          <div className="px-2 py-1 flex space-x-1">
            <p className="text-light-gray-3 text-left px-2">
              CS2 is great, but in-game you're only able to see your past 8
              matches unless you downloaded the demo, that's not so great. We
              let you track your full match history.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-full outline-1 outline-light-gray/35 bg-light-gray/10 rounded-2xl py-2">
        <div className="py-4">
          <p className="text-xl text-center mb-2">Real Steam reputation</p>
          <div className="px-2 py-1 flex space-x-1">
            <p className="text-light-gray-3 text-left px-2">
              Sometimes while playing or trading you want to know whether
              someone is honest or not. Our website provides the ability to both
              monitor and influence your Steam accounts reputation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
