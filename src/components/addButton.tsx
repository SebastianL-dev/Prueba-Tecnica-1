import { IoIosAdd } from "react-icons/io";

export default function AddButton({ open }: { open: () => void }) {
  return (
    <button
      className="flex bg-purple-500 w-fit rounded-full fixed bottom-6 right-6 hover:scale-110 ease-bounce duration-300 cursor-pointer"
      onClick={open}
    >
      <IoIosAdd className="w-10 h-10 text-white stroke-3" />
    </button>
  );
}
