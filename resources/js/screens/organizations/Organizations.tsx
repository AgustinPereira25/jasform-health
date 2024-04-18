import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/stores";
import { getOrganizationsQuery } from "@/api";
import { message } from "@/constants/message";
import { ROUTES } from "@/router";
import { icons } from "@/ui";
import Pagination from "@/ui/common/Pagination";
import { paginatorValues } from "@/constants/pagination";
import EmptyState from "@/ui/common/EmptyState";
import TableSkeleton from "@/ui/common/Skeletons/TableSkeleton";
import { truncateText } from "@/helpers/helpers";

export const Organizations = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        }
    }, []);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading: isLoadingOrganization, isFetching: isFetchingOrganization } = useQuery({
        ...getOrganizationsQuery(perPage, currentPage
        ),
        enabled: !!token,
    });

    const organization = data?.data;

    return (
        <>
            <div className="bg-white">
                <h2 className="flex items-center justify-between px-2 pb-7 text-2xl font-semibold leading-7 text-black">
                    Organizations
                </h2>
            </div>
            <div className="rounded-xl border-[1px] bg-white p-2 pt-4 pl-4 shadow-lg">
                {
                    isFetchingOrganization ?
                        (
                            <TableSkeleton />
                        ) :
                        !organization?.length ? (
                            <EmptyState message={message.EMPTY_STATE} iconName="PencilSquareIcon" />
                        ) : (
                            <div className="rounded-lg border border-gray-300 overflow-x-auto">
                                <table className="w-full whitespace-nowrap bg-white text-left shadow-md">
                                    <colgroup>
                                        <col className="sm:w-1/3" />
                                        <col className="lg:w-2/3" />
                                    </colgroup>
                                    <thead className="border-b-[1px] border-gray-300 bg-gray-200 text-sm leading-6">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-2 pl-2 pr-8 font-normal text-[#6B7280] sm:pl-4 lg:pl-5"
                                            >
                                                NAME
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-2 pl-2 pr-8 font-normal text-[#6B7280] sm:pl-4 lg:pl-5"
                                            >
                                                DESCRIPTION
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {isLoadingOrganization && (
                                            <tr className="h-full items-center">
                                                <td colSpan={5}>
                                                    <div className="flex justify-center p-9">
                                                        <icons.SpinnerIcon />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {organization?.map((item) => (
                                            <tr key={item.id}>
                                                <td className="py-4 pl-2 pr-5 sm:pl-4 lg:pl-5">
                                                    <div className="flex items-center gap-x-4">
                                                        <div className="truncate text-sm leading-6 text-black">
                                                            {truncateText(item.name!, 50)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 pl-2 pr-5 sm:pl-4 lg:pl-5">
                                                    <div className="flex items-center gap-x-4">
                                                        <div className="truncate text-sm leading-6 text-black">
                                                            {truncateText(item.description!, 50)}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {Object.keys(paginatorValues).includes(perPage.toString()) &&
                                    Number(currentPage) > 0 && (
                                        <Pagination
                                            paginatorValues={paginatorValues}
                                            totalItems={data?.pagination?.total}
                                            itemsPerPage={parseInt(perPage.toString(), 10)}
                                            currentPage={parseInt(currentPage.toString(), 10)}
                                            onPageChange={(newPerPage, newCurrentPage) => {
                                                setPerPage(newPerPage)
                                                setCurrentPage(newCurrentPage)
                                            }}
                                        />
                                    )}
                            </div>
                        )
                }
            </div>
            <div className="h-[50px]"></div>
        </>
    );
};
