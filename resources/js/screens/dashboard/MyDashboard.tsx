import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/stores";
import { getFormsQuery, getUserDashboard } from "@/api";
import { Button, icons } from "@/ui";
import { ROUTES } from "@/router";
import { isValidImageUrl } from "@/helpers/helpers";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";
import DashboardCardsSkeleton from "@/ui/common/Skeletons/DashboardCardsSkeleton";
import TableSkeleton from "@/ui/common/Skeletons/TableSkeleton";

const enabledActive = 1;
const perPage = 3;
const currentPage = 1;
export const MyDashboard = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    console.log("user", user);
    const userId = user?.id;

    const { data: statsData, isFetching: isFetchingDashboard, error: isErrorDashboard } = useQuery({
        ...getUserDashboard(userId),
        refetchOnWindowFocus: false,
    });

    const { data: formData, isFetching: isFetchingForms, error: isErrorForms } = useQuery({
        ...getFormsQuery(perPage, currentPage, enabledActive, userId!.toString()),
        refetchOnWindowFocus: false,
    });

    const forms = formData?.data;

    return (
        <>
            <div className="rounded-xl border-[1px] bg-secondary p-2 mb-5 shadow-lg flex items-center text-white justify-between">
                <h1 className="px-2 text-2xl font-semibold leading-7 flex items-center">
                    Welcome, {user!.first_name} {user!.last_name}
                </h1>
                <div className="flex items-center">
                    <div className="mr-4 text-right">
                        <div>{user!.position_in_org} - {user!.organization_name}</div>
                        <div>{user!.email}</div>
                    </div>
                    <div>
                        <img
                            referrerPolicy="no-referrer"
                            className="h-16 w-16 rounded-full bg-gray-100"
                            src={
                                isValidImageUrl(user?.photo ?? "")
                                    ? user?.photo
                                    : "/Profile-Hello-Smile1b.png"
                            }
                            alt={user!.first_name}
                        />
                    </div>
                </div>
            </div>

            {isFetchingDashboard ? (
                <DashboardCardsSkeleton />
            ) : isErrorDashboard ? (
                <EmptyState
                    message={message.ERROR_STATE}
                    iconName="ArchiveBoxXMarkIcon"
                />
            ) : !statsData ? (
                <EmptyState message={message.EMPTY_STATE} iconName="PencilSquareIcon" />
            ) : (

                <div className="rounded-xl border-[1px] p-2 pt-4 mb-5 shadow-lg">
                    <h1 className="flex items-center justify-between px-2 pb-7 text-2xl font-semibold leading-7 text-primary ">
                        Stats
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 px-10 pb-5">
                        {Object.entries(statsData).map(([key, value]) => (
                            <div
                                key={key}
                                className="relative flex flex-col items-center justify-center rounded-xl border-[1px] bg-[#F9FAFB] border-gray-100 px-6 py-5 shadow-sm text-center"
                            >
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className="text-sm font-medium text-gray-500 capitalize">{key.replace(/_/g, " ")}</p>
                                <p className="truncate text-2xl font-bold text-black">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

            )}
            {isFetchingForms ? (
                <TableSkeleton />
            ) : isErrorForms ? (
                <EmptyState
                    message={message.ERROR_STATE}
                    iconName="ArchiveBoxXMarkIcon"
                />
            ) : !forms?.length ? (
                <EmptyState message={message.EMPTY_STATE} iconName="PencilSquareIcon" />
            ) : (
                <div className="rounded-xl border-[1px] bg-white p-2 pt-4 shadow-lg">
                    <div className="bg-white">
                        <h1 className="flex items-center justify-between px-2 pb-7 text-2xl font-semibold leading-7 text-primary">
                            My last active forms
                        </h1>
                    </div>
                    <div className="rounded-sm border-[1px] border-gray-300">
                        <table className="w-full whitespace-nowrap bg-white text-left shadow-md">
                            <colgroup>
                                <col className="w-full sm:w-4/12" />
                                <col className="lg:w-4/12" />
                                <col className="lg:w-2/12" />
                                <col className="lg:w-1/12" />
                                <col className="lg:w-1/12" />
                                <col className="lg:w-1/12" />
                            </colgroup>
                            <thead className="border-b-[1px] border-gray-300 bg-gray-200 text-sm leading-6">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-2 pl-4 pr-8 font-normal text-[#6B7280] sm:pl-6 lg:pl-8"
                                    >
                                        TITLE
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                                    >
                                        LAST MODIFIED DATE
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-8 sm:text-left lg:pr-20"
                                    >
                                        # QUESTIONS
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] md:table-cell lg:pr-20"
                                    >
                                        # INSTANCES
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                    >
                                        STATUS
                                    </th>
                                    {/* <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  GET LINK
                </th> */}
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isFetchingForms && (
                                    <tr className="h-full items-center">
                                        <td colSpan={5}>
                                            <div className="flex justify-center p-9">
                                                <icons.SpinnerIcon />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {forms?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4">
                                                <div className="truncate text-sm leading-6 text-black">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                            <div className="flex gap-x-3">
                                                <div className="truncate text-sm leading-6 text-black">
                                                    {item?.last_modified_date_time?.toString()}
                                                    {/* TODO: Apply USA format MM/DD/YYYY HH:MM AM/PM */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                                            {item?.form_questions_count?.toString()}
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            {item?.form_instances_count?.toString()}
                                        </td>
                                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                            <div className="flex items-center gap-x-2 sm:justify-start">
                                                <div
                                                    className={
                                                        item.is_active
                                                            ? "text-[#065F46] sm:block"
                                                            : "text-[#a82d2d] sm:block"
                                                    }
                                                >
                                                    {item.is_active ? "Active" : "Inactive"}
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className="hidden py-4 pl-3 text-center text-sm text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <Button
                      variant="tertiary"
                      onClick={() => console.log('delete')}
                    >
                      <icons.LinkIcon />
                    </Button>
                  </td> */}
                                        <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            <a href={`/forms/${item.id}`} className="flex justify-end">
                                                <icons.ChevronRightIcon className="h-6 w-6 text-primary" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center m-4">
                        <Button
                            variant="primary"
                            onClick={() => navigate(ROUTES.myForms)}
                        >
                            View more Forms
                        </Button>
                    </div>
                </div >

            )}

            <div className="h-[100px]"></div>

        </>
    );
};
