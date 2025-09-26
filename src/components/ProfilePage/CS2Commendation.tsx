export const CS2Commendation = ({ ...props }) => {
  const { friendly, teaching, leader } = props;

  return (
    <>
      <div className="text-white flex justify-center space-x-8 sm:space-x-0 sm:justify-between md:mx-4">
        {friendly && (
          <div className="flex items-center">
            <p className="mt-0.5">{friendly}</p>
            <img className="scale-75" src="/commendation/smile.svg" />
          </div>
        )}
        {teaching && (
          <div className="flex items-center">
            <p className="mt-0.5">{teaching}</p>
            <img className="scale-75 mt-1" src="/commendation/teacher.svg" />
          </div>
        )}
        {leader && (
          <div className="flex items-center">
            <p className="mt-1">{leader}</p>
            <img className="scale-60" src="/commendation/leader.svg" />
          </div>
        )}
      </div>
    </>
  );
};
