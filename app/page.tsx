import { Button } from "@/components/ui/button";

const RootPage = () => {
  return (
    <div className="h-svh container mx-auto">
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-0.5">
          <h1 className="text-4xl font-extrabold text-balance max-w-prose">Platinum</h1>
          <p className="max-w-prose">Platinum is the world&apos;s largest tech news aggregator!</p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Button>Sign Up</Button>
          <Button variant="secondary">Log In</Button>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
