import React from "react";

const TableSkeleton = () => {
    return (
        <div
            role="status"
            className="animate-pulse space-y-4 divide-y divide-gray-300 border border-gray-300 p-4 shadow rounded-lg md:p-6"
        >
            <div className="flex items-center justify-between pt-4">
                <div className="h-2.5 w-32 rounded-full bg-gray-400 "></div>
                <div className="h-2.5 w-32 rounded-full bg-gray-400 "></div>
                <div className="h-2.5 w-32 rounded-full bg-gray-400 "></div>
                <div className="h-2.5 w-64 rounded-full bg-gray-400 "></div>
            </div>

            {Array.apply(null, Array(4)).map((_, index) => {
                return (
                    <div
                        key={index}
                        className="flex h-12 items-center justify-between pt-4"
                    >
                        <div className="h-2.5 w-32 rounded-full bg-gray-300 "></div>
                        <div className="h-2.5 w-32 rounded-full bg-gray-300 "></div>
                        <div className="h-2.5 w-32 rounded-full bg-gray-300 "></div>
                        <div className="h-2.5 w-64 rounded-full bg-gray-300 "></div>
                    </div>
                );
            })}

            <div className="flex items-center justify-end border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="1 mr-4 flex items-center justify-between">
                    <div className="h-2.5 w-32 rounded-full bg-gray-300 "></div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="h-2.5 w-32 rounded-full bg-gray-300 "></div>
                </div>
            </div>
        </div>
    );
};

export default TableSkeleton;
