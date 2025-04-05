export function Button({ className = "", children, ...props }) {
  return (
    <button aria-label="button component"
      className={`bg-[#2563EB] text-[#ffffff] hover:bg-blue-700 flex items-center gap-2 px-4 py-2 rounded-md transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
