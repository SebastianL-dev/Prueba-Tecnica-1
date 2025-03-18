import { IoIosAdd } from "react-icons/io";

export default function AddButton({ open }: { open: () => void }) {
  return (
    <button
      className="flex bg-purple-500 w-fit rounded-full fixed bottom-10  right-10 hover:scale-110 ease-bounce duration-300 cursor-pointer shadow-primary"
      onClick={open}
    >
      <IoIosAdd className="w-12 h-12 text-white stroke-3" />
    </button>
  );
}
