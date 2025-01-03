"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useCart } from "../components/CartContext"; // Import the useCart hook
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/redux/slices/userApiSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

const Header = () => {
  const router = useRouter();
  const { getCartItemCount } = useCart(); // Get cart count from context
  const user = useSelector((state: RootState) => state.auth.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser(); // This will call the API to log the user out
      // Optionally, redirect the user to the home page or login page
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className="bg-background sticky top-0 z-50 shadow-lg">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between max-w-screen overflow-hidden">
            {/* Logo Start */}
            <Link
              className="flex items-center text-secondary text-2xl md:text-3xl font-semibold hover:opacity-90 transition"
              href="/"
            >
              <span className="text-primary">VoltStore</span>
            </Link>
            {/* Logo End */}

            <div className="flex items-center gap-6">
              {/* Nav Links Start */}
              <nav aria-label="Global" className="hidden md:flex">
                <ul className="flex items-center gap-8 text-lg">
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-primary"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-primary"
                      href="/collection"
                    >
                      Collection
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-primary"
                      href="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-primary"
                      href="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* Nav Links End */}

              <div className="flex gap-3 items-center">
                <Link href="/cart">
                  <button className="relative text-gray-700 hover:text-primary transition">
                    <ShoppingCart size={20} />
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 bg-primary text-white text-xs font-bold rounded-full">
                        {getCartItemCount()}
                      </span>
                    )}
                  </button>
                </Link>

                {/* Profile Menu */}

                {user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/orders">Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          {isLoading ? "Logging out..." : "Logout"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Show user's name */}
                    {/* <div className="ml-2 text-gray-700">{user.name}</div> */}
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-background">
                      <Button>Login</Button>
                    </Link>
                    <Link href="/register" className="text-background">
                      <Button>Sign Up</Button>
                    </Link>
                  </>
                )}

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden">
                  <Sheet>
                    <SheetTrigger>
                      <div className="rounded bg-primary p-2 text-background transition hover:text-gray-600/75">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Navigation</SheetTitle>
                        <SheetDescription>Explore our store</SheetDescription>
                      </SheetHeader>
                      <nav>
                        <ul className="mt-6 flex flex-col gap-4 text-lg">
                          <li>
                            <Link
                              href="/"
                              className="text-gray-700 hover:text-primary"
                            >
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/collection"
                              className="text-gray-700 hover:text-primary"
                            >
                              Collection
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about"
                              className="text-gray-700 hover:text-primary"
                            >
                              About
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/contact"
                              className="text-gray-700 hover:text-primary"
                            >
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
