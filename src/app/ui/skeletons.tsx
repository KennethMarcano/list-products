export function SkeletonProductCard() {
    return (
        <div className="w-full max-w-[270px] bg-secondary rounded-2xl shadow-md p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-md"></div>
            <div className="h-6 bg-gray-300 rounded mt-2"></div>
            <div className="h-4 bg-gray-300 rounded mt-1"></div>
            <div className="h-4 bg-gray-300 rounded mt-1"></div>
            <div className="h-6 bg-gray-300 rounded mt-2"></div>
        </div>
    );
};

export function SkeletonProducts() {
    return(
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {[1, 2, 3].map((product) => (
          <SkeletonProductCard key={product}/>
        ))}
      </div>
    )
}