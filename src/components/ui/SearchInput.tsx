import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";
import { Separator } from "./separator";
import { InputProps } from "./input";
import { Label } from "./label";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full rounded-md border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center"
        )}
      >
        <Label className="px-4" htmlFor={id}>
          <Search className="text-xl" />
        </Label>
        <Separator orientation="vertical" />
        <input
          id={id}
          type={type}
          className={cn(
            "focus:outline-none px-4 w-full rounded-md bg-transparent",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
