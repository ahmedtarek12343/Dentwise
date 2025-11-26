import { UserButton, SignOutButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserButton showName />
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
