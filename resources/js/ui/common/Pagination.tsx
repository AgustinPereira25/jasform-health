import React from "react";

import type { paginatorValues } from "../../constants/pagination"
import { icons } from "./Icons";

interface PaginationProps {
    paginatorValues: typeof paginatorValues;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (itemsPerPage: number, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    paginatorValues,
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        onPageChange(Number(event.target.value), 1);
    };

    return (
        <div className="flex items-center rounded-b-lg justify-end border border-gray-200 bg-white px-4 py-3 sm:px-6">
            <style>
                {`
		  #itemsPerPage {
			background-color: #ffffff !important;
			color: #4B5563 !important;
			border: 1px solid #BBBBBB !important;
            border-radius: 0.375rem !important;
		  }
		`}
            </style>
            <div className="mr-4 flex  items-center justify-between">
                <label htmlFor="itemsPerPage" className="mr-2">
                    Items per page:
                </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="h-9 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-base text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-1 sm:text-sm"
                >
                    {Object.entries(paginatorValues).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <nav
                    className="isolate inline-flex space-x-2 rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <button
                        onClick={() => {
                            onPageChange(itemsPerPage, 1);
                        }}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                    >
                        <icons.ChevronDoubleLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        onClick={() => {
                            onPageChange(itemsPerPage, currentPage - 1);
                        }}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <icons.ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => {
                            onPageChange(itemsPerPage, currentPage + 1);
                        }}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <icons.ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        onClick={() => {
                            onPageChange(itemsPerPage, totalPages);
                        }}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                    >
                        <icons.ChevronDoubleRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;
