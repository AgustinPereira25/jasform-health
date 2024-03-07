const FormQuestionsSkeleton = () => {
    return (
        <div className="animate-pulse h-full w-full flex flex-col items-center space-y-4 p-">
            <div className="w-full flex justify-between items-center pb-2">
                <div className="w-3/5 flex space-x-2">
                    <div className="w-40 h-6 bg-gray-300 rounded-lg"></div>
                    <div className="w-1/5 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="w-40 h-6 bg-gray-300 rounded-lg"></div>
                    ))}
                </div>
            </div>

            <div className="mr-auto w-full h-full flex gap-x-8">
                <div className="w-1/3 border border-gray-300 rounded-lg p-8 shadow">

                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex space-x-4 mb-6">
                            <div className="w-4/5 h-[40px] bg-gray-200 rounded-lg"></div>
                            <div className="w-1/5 h-[40px] bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                    <div className="flex space-x-4 mb-6 w-full justify-center">
                        <div className="w-40 h-[40px] bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                <div className="w-2/3 border border-gray-300 rounded-lg p-8 shadow">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex space-x-4 mb-6">
                            <div className="w-2/5 h-[40px] bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                    <div className="w-full border border-gray-300 rounded-lg p-4 shadow my-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <div className="w-full h-[40px] bg-gray-200 rounded-lg"></div>
                            </div>
                        ))}
                        <div className="flex space-x-4 mb-6 w-full justify-center">
                            <div className="w-40 h-[40px] bg-gray-200 rounded-lg"></div>
                            <div className="w-40 h-[40px] bg-gray-200 rounded-lg"></div>
                            <div className="w-40 h-[40px] bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/5 h-[40px] bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>

        </div >
    );
};
export default FormQuestionsSkeleton;
