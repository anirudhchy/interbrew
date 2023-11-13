import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-24">
      <ModeToggle />

      <Input className="w-60" placeholder="Email" />
      <Button variant="outline">Submit</Button>
    </main>
  );
}
