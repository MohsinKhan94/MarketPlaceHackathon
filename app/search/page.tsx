"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Example dataset (Replace with real data if needed)
const products = [
  { value: "iphone 13", label: "iPhone 13" },
  { value: "iphone xr", label: "iPhone XR" },
  { value: "oneplus 11", label: "OnePlus 11" },
  { value: "iphone 15 pro max", label: "iPhone 15 Pro Max" },
  { value: "google pixel 8", label: "Google Pixel 8" },
  { value: "xiaomi redmi note 12", label: "Xiaomi Redmi Note 12" },
  { value: "motorola edge+", label: "Motorola Edge+" },
];

const SearchBar = () => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [query, setQuery] = React.useState("");

  // Filter products based on user input
  const filteredProducts = products.filter((product) =>
    product.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selected
            ? products.find((p) => p.value === selected)?.label
            : "Search product..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="Search product..."
            className="h-9"
            onValueChange={(val) => setQuery(val)}
          />
          <CommandList>
            {filteredProducts.length === 0 ? (
              <CommandEmpty>No product found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.value}
                    value={product.value}
                    onSelect={(currentValue) => {
                      setSelected(currentValue);
                      setOpen(false);
                    }}
                  >
                    {product.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected === product.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
