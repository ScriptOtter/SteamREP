export const PasswordRecommendation = () => {
  return (
    <>
      <p className="font-semibold">
        Create a strong password for your account:{" "}
      </p>
      <p className="text-xs">• Minimum Length: 8 characters </p>
      <p className="text-xs">• Maximum Length: 32 characters</p>
      <p className="font-semibold">• Must Include:</p>
      <p className="text-xs">– At least one uppercase letter (A-Z)</p>
      <p className="text-xs">– At least one lowercase letter (a-z)</p>
      <p className="text-xs">– At least one digit (0-9)</p>
      <p className="font-semibold">• Recommended:</p>
      <p className="text-xs">
        Use special characters (e.g., !, @, #, $, %, ^, , *)
      </p>
    </>
  );
};
