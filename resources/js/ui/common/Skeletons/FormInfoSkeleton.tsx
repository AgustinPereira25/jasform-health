
const FormInfoSkeleton = () => {
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

            <div className="mr-auto w-full h-full border border-gray-300 p-8 shadow rounded-lg flex gap-x-8">
                <div className="w-1/2">
                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/5 h-[40px] bg-gray-200 rounded-lg"></div>
                        <div className="m-l-5 w-[500px] h-[120px] bg-gray-200 rounded-lg"></div>
                    </div>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex space-x-4 mb-6">
                            <div className="w-1/5 h-[40px] bg-gray-200 rounded-lg"></div>
                            <div className="w-4/5 h-[40px] bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                </div>

                <div className="w-1/2">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="flex space-x-4 mb-6">
                            <div className="w-3/5 h-[40px] bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex space-x-4 mb-6">
                            <div className="w-2/5 h-[40px] bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    );
};
export default FormInfoSkeleton;
