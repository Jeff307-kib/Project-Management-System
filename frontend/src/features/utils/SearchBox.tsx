import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search workspaces..."
          className="w-full pl-9 bg-background focus:bg-card"
        />
      </div>
    </div>
  );
};

export default SearchBox;
