import { useState, useEffect, useRef } from "react";
import LinksAndLogin from "@/components/navBar/LinksAndSign";
import { Menu, X } from "lucide-react";

function DropdownNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when screen size becomes larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Menu trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden rounded-full bg-gray-800 p-2 text-gray-200 transition-all duration-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu
          size={20}
          className="transition-transform duration-200 ease-in-out"
        />
        <span className="absolute inset-0 scale-0 transform rounded-full bg-gray-600 opacity-30 transition-transform duration-300 hover:scale-100"></span>
      </button>

      {/* Dropdown menu - positioned below the button */}
      {isOpen && (
        <>
          {/* Triangle pointer */}
          <div
            className="absolute -right-0 top-4 z-50 mt-4 h-0 w-0 border-8 border-solid border-transparent border-b-gray-800"
            style={{ transform: "translateX(-50%)" }}
          ></div>

          {/* Menu content */}
          <div
            ref={menuRef}
            className="absolute right-0 top-full z-40 mt-2 w-52 origin-top-right overflow-hidden rounded-lg bg-gray-800 shadow-xl transition-all duration-200 ease-in-out"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 rounded-full p-1.5 text-gray-300 transition-all duration-200 hover:bg-gray-600 hover:text-white"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>

            {/* Content section */}
            <div className="max-h-[70vh] overflow-y-auto p-3">
              <LinksAndLogin
                orientation="vertical"
                className="space-y-3 py-1"
              />
            </div>

            {/* Footer section */}
            <div className="border-t border-gray-700 bg-gray-800 p-2">
              <div className="text-center text-xs text-gray-400">
                © 2025 MeshLabs
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DropdownNavBar;
