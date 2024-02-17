const TableSkeleton = () => {
    return (
        <div
            role="status"
            className="animate-pulse space-y-4 divide-y divide-gray-300 border border-gray-300 p-4 shadow rounded-lg md:p-6 pb-0 h-[509px]"
        >
            <div className="h-5 flex items-center justify-between pt-4">
                <div className="h-5 w-56 rounded-full bg-gray-300"></div>
                <div className="h-5 w-56 rounded-full bg-gray-300"></div>
                <div className="h-5 w-32 rounded-full bg-gray-300"></div>
                <div className="h-5 w-32 rounded-full bg-gray-300"></div>
                <div className="h-5 w-10 rounded-full bg-white"></div>
            </div>

            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="flex h-[75px] items-center justify-between pt-4"
                >
                    <div className="h-5 w-56 rounded-full bg-gray-300"></div>
                    <div className="h-5 w-56 rounded-full bg-gray-300"></div>
                    <div className="h-5 w-32 rounded-full bg-gray-300"></div>
                    <div className="h-5 w-32 rounded-full bg-gray-300"></div>
                    <div className="h-5 w-10 rounded-full bg-gray-300"></div>
                </div>
            ))}

            <div className="flex items-center justify-end border-t border-gray-200 bg-white px-4 pb-3 sm:px-6 pt-8">
                <div className="1 mr-4 flex items-center justify-between">
                    <div className="h-5 w-32 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="h-5 w-80 rounded-full bg-gray-300"></div>
                </div>
            </div>
        </div>
    );
};

export default TableSkeleton;
