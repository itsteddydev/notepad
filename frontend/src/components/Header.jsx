import { Link } from "react-router-dom";
import { Plus, StickyNote } from 'lucide-react';
import { Button } from "./Button";

function Header({ onCreate }) {
  return (
    <header className=" bg-white text-white max-w-[1200px] w-full mx-auto py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-black flex justify-between items-center "> <StickyNote className="text-[#2563EB]" /><h1 className="text-xl text-black font-semibold">NotePad</h1></div>
        <Button className="" onClick={onCreate}> <Plus />New Note</Button>
      </div>
    </header>
  );
}

export default Header;
