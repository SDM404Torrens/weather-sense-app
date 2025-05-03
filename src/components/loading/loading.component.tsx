import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen">
      <ImSpinner2 className="animate-spin text-4xl text-blue-700" />
    </div>
  );
};

export default Loading;
