import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type PixelDropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const PixelDropdown = ({ options, value, onChange }: PixelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative text-xs font-retro text-retro-blue z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 bg-retro-purple/10 border border-retro-purple/30 px-3 py-1 rounded-md hover:bg-retro-purple/20 transition-all w-36"
      >
        {selected?.label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-36 bg-card border border-retro-purple/30 rounded-md shadow-xl">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1 hover:bg-retro-purple/20 transition-all ${
                opt.value === value ? 'bg-retro-purple/10 text-white' : ''
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
