"use client";
import SearchInput from "@/components/ui/SearchInput";

type props = {
  filter: (name: string) => void;
};

const ImageSearch: React.FC<props> = ({ filter }) => {
  return <SearchInput onChange={(e) => filter(e.target.value)} />;
};

export default ImageSearch;
