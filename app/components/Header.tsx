"use client"; // Ensures it runs in the browser

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Menu, Search, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { client } from "@/sanity/lib/sanity";
import { Button } from "@/components/ui/button";

// Product interface
interface Product {
  _id: string;
  title: string;
  slug: { current: string };
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch products from Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{ _id, title, slug }`)
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Function to handle search navigation
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const selectedProduct = products.find((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (selectedProduct) {
        router.push(`/product/${selectedProduct.slug.current}`);
        setTimeout(() => setOpen(false), 200); // Delayed close for smooth navigation
      }
    }
  };

  // Trigger search when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // Filter products dynamically
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="glass sticky top-0 z-10 py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          EliteBuy
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-purple-300 transition-colors">Shop</Link>
          <Link href="/contact" className="hover:text-purple-300 transition-colors">Contact</Link>
          <Link href="/tracking" className="hover:text-purple-300 transition-colors">Tracking</Link> {/* New Link Added */}
        </nav>

        {/* Search Bar with Dropdown */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 w-44 md:w-60 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setOpen(true)} // Keeps popover open while typing
                aria-label="Search Products"
              />
              <button
                className="p-2 ml-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition"
                onClick={handleSearch}
                aria-label="Search Button"
              >
                <Search className="h-5 w-5 text-purple-300" />
              </button>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0">
  <Command>
    <CommandInput
      placeholder="Search product..."
      className="h-9"
      value={searchQuery}
      onValueChange={setSearchQuery}
    />
    <CommandList className="max-h-60 overflow-y-auto"> {/* Added max height & scrollbar */}

                {filteredProducts.length === 0 ? (
                  <CommandEmpty>No product found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product._id}
                        value={product.title}
                        onSelect={() => {
                          setSearchQuery(product.title);
                          setTimeout(() => setOpen(false), 200); // Delay closing
                          router.push(`/product/${product.slug.current}`);
                        }}
                      >
                        {product.title}
                        <Check className="ml-auto" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ShoppingBag className="h-5 w-5 text-purple-300" />
          </Link>
          <Link href="/account" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <User className="h-5 w-5 text-purple-300" />
          </Link>
          <button className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors">
            <Menu className="h-5 w-5 text-purple-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
