import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-60">
        <Input placeholder="Email" />
        <Button className="mt-3" variant="outline">
          Submit
        </Button>
      </div>
    </main>
  );
}
