import React from "react";
import { Button } from "./Button";


export default function ToggleNotesView({ showArchived, onToggle }) {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <Button
        aria-label="Active Notes"
        onClick={() => onToggle(false)}
        className={` border border-[#E5E7EB]  ${!showArchived ? "" : "bg-white text-gray-500 hover:bg-transparent "}`}
      >
        Active Notes
      </Button>
      <Button
        aria-label="Archived Notes"
        onClick={() => onToggle(true)}
        className={` border border-[#E5E7EB]  ${showArchived ? "" : "bg-white text-gray-500  hover:bg-transparent "}`}
      >
        Archived
      </Button>
    </div >
  );
}
