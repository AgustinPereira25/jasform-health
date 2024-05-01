import { useCallback, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/stores";
import { getFormsQuery } from "@/api";
import { message } from "@/constants/message";
import { ROUTES } from "@/router";
import { Button, icons, Input, Label } from "@/ui";
import { tw } from "@/utils";
import Pagination from "@/ui/common/Pagination";
import { paginatorValues } from "@/constants/pagination";
import EmptyState from "@/ui/common/EmptyState";
import TableSkeleton from "@/ui/common/Skeletons/TableSkeleton";
import { parseDate, truncateText } from "@/helpers/helpers";
import type { Option } from "@/ui/form/Combobox";
import ComboBox from "@/ui/form/Combobox";

const sortOptions: Option[] = [
    { id: 0, name: "Public code AZ", value: "publicCode" },
    { id: 1, name: "Public code ZA", value: "-publicCode" },
    { id: 2, name: "Title AZ", value: "title" },
    { id: 3, name: "Title ZA", value: "-title" },
    { id: 4, name: "Last modified date ASC", value: "lastModifiedDate" },
    { id: 5, name: "Last modified date DESC", value: "-lastModifiedDate" },
    { id: 6, name: "Questions amount ASC", value: "questionsAmount" },
    { id: 7, name: "Questions amount DESC", value: "-questionsAmount" },
    { id: 8, name: "Instances amount ASC", value: "instancesAmount" },
    { id: 9, name: "Instances amount DESC", value: "-instancesAmount" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface SearchInputs {
    formTitle: string,
    publicCode: string
}
export const Forms = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        }
    }, []);

    const location = useLocation();

    const isUserFormsRoute = location.pathname.startsWith(ROUTES.formsByUserId.replace("/:user_id", ""));
    // console.log('isUserFormsRoute', isUserFormsRoute, user_id)
    const userIdFormsRoute = isUserFormsRoute && user_id;

    const isMyFormsRoute = location.pathname === ROUTES.myForms;
    const userId = isMyFormsRoute ? user?.id : isUserFormsRoute ? userIdFormsRoute : "";
    // console.log('userId', userId)
    const [search, setSearch] = useState<SearchInputs>({ formTitle: "", publicCode: "" });
    const [debouncedSearch, setDebouncedSearch] = useState<SearchInputs>({ formTitle: "", publicCode: "" });

    const handleDebouncedSearch = useCallback(
        debounce((query: SearchInputs) => {
            setDebouncedSearch(query);
        }, 500) as (query: SearchInputs) => void,
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setSearch(prevState => {
            const updatedState = { ...prevState, [id]: value };
            handleDebouncedSearch(updatedState);
            return updatedState;
        });
    };

    const [sort, setSort] = useState(sortOptions[5]);
    const handleComboboxChange = useCallback((selectedOptionId: number) => {
        const selectedOption = sortOptions.find(option => option.id === selectedOptionId);
        if (selectedOption) {
            setSort(selectedOption);
        }
    }, []);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [enabledActive, setEnabledActive] = useState(false);

    const { data, isLoading: isLoadingForms, isFetching: isFetchingForms } = useQuery({
        ...getFormsQuery(perPage, currentPage, userId!.toString(), enabledActive, debouncedSearch.formTitle, debouncedSearch.publicCode, sort?.value ?? "-lastModifiedDate"),
        enabled: !!token,
    });

    const forms = data?.data;

    return (
        <>
            <div className="bg-white">
                <h2 className="flex items-center justify-between px-2 pb-7 text-2xl font-semibold leading-7 text-black">
                    Forms
                    <Button
                        variant="primary"
                        onClick={() => navigate(ROUTES.newForm)}
                    >
                        <icons.PlusIcon className={tw(`h-5 w-5`)} />
                        Create Form
                    </Button>
                </h2>
            </div>
            <div className="rounded-xl border-[1px] bg-white p-2 pt-4 pl-4 shadow-lg">
                <div className="flex gap-5">
                    <Input
                        type="search"
                        id="publicCode"
                        label="Public Code"
                        placeholder="Public Code"
                        value={search.publicCode}
                        onChange={handleInputChange}
                        className="h-[43px]"
                    />
                    <Input
                        type="search"
                        id="formTitle"
                        label="Title"
                        placeholder="Form title"
                        className="min-w-[210px] h-[43px]"
                        value={search.formTitle}
                        onChange={handleInputChange}
                    />
                    {/* <div className="gap-2 items-center">
                        <Label label={"Start date"} />
                        <DatePickerUnit />
                    </div>
                    <div className="gap-2 items-center">
                        <Label label={"End date"} />
                        <DatePickerUnit />
                    </div> */}
                    <Switch.Group
                        as="div"
                        className="flex items-center justify-between gap-2"
                    >
                        <span className="flex flex-grow flex-col">
                            <Switch.Label
                                as="span"
                                className="text-sm font-medium leading-6 text-gray-900"
                                passive
                            >
                                Show only Active
                            </Switch.Label>
                        </span>
                        <Switch
                            checked={enabledActive}
                            onChange={setEnabledActive}
                            className={classNames(
                                enabledActive ? "bg-[#00519E]" : "bg-gray-200",
                                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2",
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    enabledActive ? "translate-x-5" : "translate-x-0",
                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                )}
                            />
                        </Switch>
                    </Switch.Group>
                    <div className="ml-auto gap-2 items-center">
                        <Label containerClassName="justify-end" label={"Sort by"} />
                        <ComboBox
                            id="sortOptions"
                            items={sortOptions}
                            defaultValue={sort?.name}
                            onValueChange={(item) => handleComboboxChange(item.id as keyof typeof Option)}
                        />
                    </div>
                </div>
                {
                    isFetchingForms ?
                        (
                            <TableSkeleton />
                        ) :
                        !forms?.length ? (
                            <EmptyState message={message.EMPTY_STATE} iconName="PencilSquareIcon" />
                        ) : (
                            <div className="rounded-lg border border-gray-300 overflow-x-auto">
                                <table className="w-full whitespace-nowrap bg-white text-left shadow-md">
                                    <colgroup>
                                        <col className="sm:w-2/12" />
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
                                                className="py-2 pl-2 pr-8 font-normal text-[#6B7280] sm:pl-4 lg:pl-5"
                                            >
                                                PUBLIC CODE
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-2 pl-2 pr-8 font-normal text-[#6B7280] sm:pl-4 lg:pl-5"
                                            >
                                                TITLE
                                            </th>
                                            {
                                                !isMyFormsRoute && (
                                                    <th
                                                        scope="col"
                                                        className="py-2 pl-2 pr-8 font-normal text-[#6B7280] sm:pl-4 lg:pl-5"
                                                    >
                                                        USER
                                                    </th>
                                                )
                                            }
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
                                            >
                                                EDIT
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {isLoadingForms && (
                                            <tr className="h-full items-center">
                                                <td colSpan={5}>
                                                    <div className="flex justify-center p-9">
                                                        <icons.SpinnerIcon />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {forms?.map((item) => (

                                            <tr key={item.id}
                                                onClick={() => { navigate(`/forms/${item.id}`) }}
                                                className="cursor-pointer hover:bg-gray-100"
                                            >

                                                <td className="py-4 pl-2 pr-5 sm:pl-4 lg:pl-5">
                                                    <div className="flex items-center gap-x-4">
                                                        <div className="truncate text-sm leading-6 text-black">
                                                            {truncateText(item.public_code!, 6)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 pl-2 pr-5 sm:pl-4 lg:pl-5">
                                                    <div className="flex items-center gap-x-4">
                                                        <div className="truncate text-sm leading-6 text-black">
                                                            {truncateText(item.name!, 30)}
                                                        </div>
                                                    </div>
                                                </td>
                                                {
                                                    !isMyFormsRoute && (
                                                        <td className="py-4 pl-2 pr-5 sm:pl-4 lg:pl-5">
                                                            <div className="flex items-center gap-x-4">
                                                                <div className="truncate text-sm leading-6 text-black">
                                                                    {truncateText(item.user_name!, 30)}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                                    <div className="flex gap-x-3">
                                                        <div className="truncate text-sm leading-6 text-black">
                                                            {parseDate(item?.last_modified_date_time?.toString())}
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
                                                <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                                    <a href={`/forms/${item.id}`} className="flex justify-end">
                                                        <icons.ChevronRightIcon aria-label="Edit form" className="h-6 w-6 text-primary" />
                                                    </a>
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
