import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function IconTest() {
  return (
    <div className="p-6">
      <Card className="max-w-md">
        <CardHeader className="flex flex-row items-center gap-4">
          {/* KU6K Duotone home icon */}
          <div className="w-12 h-12 flex items-center justify-center">
            <Image
              src="/@ku6k/essential-ui/home/ku6k-home--duotone-blue500-300-v1.0.0.svg"
              alt="KU6K Home Icon - Duotone Blue"
              width={48}
              height={48}
              className="max-w-full max-h-full"
            />
          </div>
          
          <div className="flex-1">
            <CardTitle>KU6K Home Icon</CardTitle>
            <CardDescription>
              Your custom duotone home icon with blue-pink gradient styling
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is your custom KU6K home icon with duotone blue-pink styling, 
            showcasing your unique iconography design.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}