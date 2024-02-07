const UserProfileSkeleton = () => {
    return (
        <div className="animate-pulse h-full w-full flex flex-col items-center space-y-4 p-">
            <div className="w-full flex justify-between items-center pb-2">
                <div className="w-3/5 flex space-x-2">
                    <div className="w-40 h-6 bg-gray-300 rounded-lg"></div>
                    <div className="w-1/5 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex space-x-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="w-40 h-6 bg-gray-300 rounded-lg"></div>
                    ))}
                </div>
            </div>
            <div className="mr-auto w-3/5 h-full border border-gray-300 p-8 shadow rounded-lg">
                <div className="flex space-x-4 mb-6">
                    <div className="w-1/5 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="flex space-x-4 mb-6">
                        <div className="w-1/5 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-4/5 h-4 bg-gray-300 rounded-full"></div>
                    </div>
                ))}
                <div className="w-40 h-6 bg-gray-300 rounded-lg mb-4"></div>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex justify-start items-center mb-2">
                        <div className="w-1/5 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-10 h-4 bg-gray-300 rounded-full ml-5"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default UserProfileSkeleton;
