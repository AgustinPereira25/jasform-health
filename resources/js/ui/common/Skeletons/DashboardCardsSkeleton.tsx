const DashboardCardsSkeleton = () => {
    return (
        <div
            role="status"
            className="animate-pulse space-y-4 divide-y divide-gray-300 border border-gray-300 p-4 shadow rounded-lg md:p-6 pb-0 h-[350px] rounded-xl p-2 pt-4 mb-5 shadow-lg"
        >
            <div className="flex items-center justify-between px-2 pb-7">
                <div className="h-5 w-56 rounded-full bg-gray-300"></div>
            </div>

            <div className="rounded-xl flex justify-center py-5 p-12 cursor-default gap-6">
                {Array.from({ length: 4 }).map((_, index) => {

                    return (
                        <div className="rounded-xl container mx-auto cursor-default" key={index}>
                            <div className={`w-72 max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg transition duration-500 transform hover:scale-100 bg-white`}>
                                <div className={`pl-4 h-20 flex items-center justify-between bg-gray-200`}>
                                    <div className="pl-4 h-5 w-24 rounded-sm bg-gray-300"></div>
                                </div>
                                <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                                    <div className="h-5 w-16 rounded-sm bg-gray-300"></div>
                                </div>
                                <div className="pl-4 py-4">
                                    <div className="h-10 w-32 rounded-sm bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default DashboardCardsSkeleton;
