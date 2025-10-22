const AnalyzedMatchesHeader = () => {
  return (
    <div className="text-white grid grid-cols-9 text-xs xl:text-[16px] pb-2 border-b-1 text-center">
      <div className="col-start-2">Rank</div>
      <div>Date</div>
      <div>Map</div>
      <div>Team A</div>
      <div className="text-left">Team B</div>

      <div className="grid grid-cols-3 text-left ml-1">
        <div>K</div>
        <div>D</div>
        <div>A</div>
      </div>

      <div className="grid grid-cols-3 text-left">
        <div>5k</div>
        <div>4k</div>
        <div>3k</div>
      </div>

      <div className="grid grid-cols-3 text-left">
        <div>1v5</div>
        <div>1v4</div>
        <div>1v3</div>
      </div>
    </div>
  );
};

export default AnalyzedMatchesHeader;
