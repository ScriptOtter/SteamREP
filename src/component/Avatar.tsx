interface Props {
  src: string;
}

export const Avatar = ({ src }: Props) => {
  return (
    <img
      src={src || ""}
      alt="Avatar"
      className="w-10 h-10 rounded-full mr-2 outline-1 outline-gray-500"
    />
  );
};
