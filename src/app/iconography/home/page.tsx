

import Image from "next/image";

const variations = [
  "ku6k-home--mono-b-v1.0.0.svg",
  "ku6k-home--mono-w-v1.0.0.svg", 
  "ku6k-home--duotone-blue500-300-v1.0.0.svg",
  "ku6k-home--duotone-blue500-300-dark-v1.0.0.svg",
  "ku6k-home--line-v1.0.0.svg",
  "ku6k-home--line-dark-v1.0.0.svg",
  "ku6k-home--color-blue-magenta-v1.0.0.svg",
  "ku6k-home--color-blue-magenta-dark-v1.0.0.svg",
  "ku6k-home--brutal-color-magenta-indigo-v1.0.0.svg",
  "ku6k-home--brutal-color-magenta-indigo-dark-v1.0.0.svg"
];

export default function HomeIconGallery() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🏠 Home Icon – KU6K Iconography</h1>
      <p className="text-muted-foreground mb-8">
        Your custom home icon variations with different styles and themes
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {variations.map((file) => (
          <div key={file} className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src={`/@ku6k/essential-ui/home/${file}`}
                alt={file}
                width={64}
                height={64}
                className="max-w-full max-h-full"
              />
            </div>
            <code className="text-xs text-muted-foreground text-center break-all">{file}</code>
          </div>
        ))}
      </div>
    </div>
  );
}