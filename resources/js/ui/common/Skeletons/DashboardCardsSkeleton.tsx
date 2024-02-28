const DashboardCardsSkeleton = () => {
    return (
        <div
            role="status"
            className="animate-pulse space-y-4 divide-y divide-gray-300 border border-gray-300 p-4 shadow rounded-lg md:p-6 pb-0 h-[309px] rounded-xl p-2 pt-4 mb-5 shadow-lg"
        >
            <div className="flex items-center justify-between px-2 pb-7">
                <div className="h-5 w-56 rounded-full bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 px-10 pb-5">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center justify-center rounded-xl border-[1px] bg-[#F9FAFB] border-gray-100 px-6 py-5 shadow-sm text-center"
                    >
                        <div className="h-5 w-32 rounded-full bg-gray-300 mb-2"></div>
                        <div className="h-5 w-10 rounded-full bg-gray-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCardsSkeleton;
