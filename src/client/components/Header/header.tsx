import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/client/components/Theme/ModeToggle";
const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <ModeToggle />
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
