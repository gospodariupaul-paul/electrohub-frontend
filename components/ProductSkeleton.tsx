export default function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-[#111] border border-[#222] rounded-xl p-4">
      <div className="w-full h-48 bg-[#222] rounded-lg mb-4"></div>
      <div className="h-5 bg-[#222] rounded mb-2 w-3/4"></div>
      <div className="h-5 bg-[#222] rounded mb-4 w-1/2"></div>
      <div className="flex gap-3">
        <div className="h-8 w-20 bg-[#222] rounded"></div>
        <div className="h-8 w-20 bg-[#222] rounded"></div>
      </div>
    </div>
  );
}
