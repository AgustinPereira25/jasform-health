import { useState, useCallback, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';

import { paginatorValues } from "../../constants/pagination";
import { getUsersQuery } from "@/api";
import { ROUTES } from "@/router";
import { Button, icons, Input, Label } from "@/ui";
import { tw } from "@/utils";
import { isValidImageUrl } from "@/helpers/helpers";
import Pagination from "@/ui/common/Pagination";
import TableSkeleton from "@/ui/common/Skeletons/TableSkeleton";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";
import { truncateText } from "@/helpers/helpers";
import { useUserStore } from "@/stores";
import type { Option } from "@/ui/form/Combobox";
import ComboBox from "@/ui/form/Combobox";

const sortOptions: Option[] = [
    { id: 0, name: "Name AZ", value: "name" },
    { id: 1, name: "Name ZA", value: "-name" },
    { id: 2, name: "Email AZ", value: "email" },
    { id: 3, name: "Email ZA", value: "-email" },
    { id: 4, name: "Position AZ", value: "position" },
    { id: 5, name: "Position ZA", value: "-position" },
    { id: 6, name: "Organization AZ", value: "organization" },
    { id: 7, name: "Organization ZA", value: "-organization" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface SearchInputs {
    nameEmail: string;
    positionOrg: string;
}
export const Users = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        }
    }, []);

    const [sort, setSort] = useState(sortOptions[0]);
    const handleComboboxChange = useCallback((selectedOptionId: number) => {
        const selectedOption = sortOptions.find(option => option.id === selectedOptionId);
        if (selectedOption) {
            setSort(selectedOption);
        }
    }, []);

    const [search, setSearch] = useState<SearchInputs>({ nameEmail: "", positionOrg: "" });
    const [debouncedSearch, setDebouncedSearch] = useState<SearchInputs>({ nameEmail: "", positionOrg: "" });

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

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [enabledActive, setEnabledActive] = useState(true);
    const [enabledAdmin, setEnabledAdmin] = useState(false);

    const { data, isFetching, isError, isLoading: isLoadingUsers } = useQuery({
        ...getUsersQuery(perPage, currentPage, enabledActive, enabledAdmin, debouncedSearch.nameEmail, debouncedSearch.positionOrg, sort?.value ?? "name"),
        enabled: !!token,
    });
    const users = data?.data;

    if (!token) {
        return null;
    }

    return (
        <>
            <div className="bg-white">
                <h1 className="flex items-center justify-between px-2 pb-7 text-2xl font-semibold leading-7 text-black">
                    Users
                    <Button variant="primary" onClick={() => navigate(ROUTES.newUser)}>
                        <icons.PlusIcon className={tw(`h-5 w-5`)} />
                        Create User
                    </Button>
                </h1>
            </div>
            <div className="rounded-xl border-[1px] bg-white p-2 pt-4 pl-4 shadow-lg">
                <div className="flex gap-5">
                    <Input
                        type="search"
                        id="nameEmail"
                        label="Name/Email"
                        placeholder="Name or Email"
                        className="min-w-[210px]"
                        value={search.nameEmail}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="search"
                        id="positionOrg"
                        label="Position/Organization"
                        placeholder="Position or Organization"
                        className="min-w-[270px]"
                        value={search.positionOrg}
                        onChange={handleInputChange}
                    />
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
                                Show only Admin
                            </Switch.Label>
                        </span>
                        <Switch
                            checked={enabledAdmin}
                            onChange={setEnabledAdmin}
                            className={classNames(
                                enabledAdmin ? "bg-[#00519E]" : "bg-gray-200",
                                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2",
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    enabledAdmin ? "translate-x-5" : "translate-x-0",
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
                {isFetching ? (
                    <TableSkeleton />
                ) : isError ? (
                    <EmptyState
                        message={message.ERROR_STATE}
                        iconName="ArchiveBoxXMarkIcon"
                    />
                ) : !data?.data.length ? (
                    <EmptyState message={message.EMPTY_STATE} iconName="PencilSquareIcon" />
                ) : (

                    <div className="rounded-lg border border-gray-300 overflow-x-auto">
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
                                        NAME
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                                    >
                                        POSITION / ORGANIZATION
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-8 sm:text-left lg:pr-20"
                                    >
                                        STATUS
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-4 text-left font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                    >
                                        ROLE
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                    >
                                        EDIT
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoadingUsers && (
                                    <tr className="h-full items-center">
                                        <td colSpan={5}>
                                            <div className="flex justify-center p-9">
                                                <icons.SpinnerIcon />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {users?.map((item) => (
                                    <tr key={item.id}
                                        onClick={() => { navigate(`/users/${item.id}`) }}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4 ">
                                                <div className="rounded-full bg-gray-100">
                                                    <img
                                                        src={isValidImageUrl(item?.photo ?? '') ? item?.photo : '/Profile-Hello-Smile1b.png'}
                                                        alt={`${item.first_name} ${item.last_name}`}
                                                        className="object-scale-down h-8 w-8 rounded-full bg-gray-100"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="truncate text-sm leading-6 text-black">
                                                        {truncateText(item.first_name + " " + item.last_name, 30)}
                                                    </div>
                                                    <div className="truncate text-sm leading-6 text-gray-500">
                                                        {truncateText(item.email!, 30)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                            <div className="flex gap-x-3">
                                                <div className="flex flex-col">
                                                    <div className="truncate text-sm leading-6 text-black">
                                                        {truncateText(item.position_in_org ?? "", 30)}
                                                    </div>
                                                    <div className="truncate text-sm leading-6 text-gray-500">
                                                        {truncateText(item.organization_name!, 30)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
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
                                        <td className="hidden py-4 pl-0 pr-4 text-left text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            {
                                                item.role_name
                                                ?? "No role"}
                                        </td>
                                        <td className="flex justify-end py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            <a href={`/users/${item.id}`} className="flex justify-end">
                                                <icons.ChevronRightIcon className="h-6 w-6 text-primary" />
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
                )}
            </div>
        </>
    );
};
