interface Props {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
export default function FilterInput({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="flex gap-4 p-4 mb-1 max-md:flex-col">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search words or phrases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-3 pl-4 w-full text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
        />
      </div>
    </div>
  );
}
