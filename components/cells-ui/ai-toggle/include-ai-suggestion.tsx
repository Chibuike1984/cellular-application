import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CiSquarePlus } from "react-icons/ci";

function IncludeAiSuggestion(
  { className, ...props }: React.ComponentProps<"button">,
) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-auto self-end p-0 text-xs hover:bg-transparent hover:text-purple-500",
        className,
      )}
      {...props}
      type="button"
    >
      <CiSquarePlus strokeWidth={0.5} className="h-5 w-5" />
    </Button>
  );
}

export { IncludeAiSuggestion };
