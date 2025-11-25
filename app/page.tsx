import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="">
      <h1>Home Page</h1>
      <SignedOut>
        <SignUpButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}
