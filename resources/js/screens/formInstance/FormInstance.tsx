import React, { useState, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Modal } from 'flowbite-react';
import ReactJson from "react-json-view";

import { Button, Label, icons } from '@/ui';
import { tw } from '@/utils';
import { paginatorValues } from '@/constants/pagination';
import Pagination from '@/ui/common/Pagination';
import { getFormInstancesQuery } from '@/api/formInstance';
import { useCompletedQuestions, useUserStore } from '@/stores';
import EmptyState from '@/ui/common/EmptyState';
import { message } from '@/constants/message';
import { isValidJson, parseDate, truncateText } from '@/helpers/helpers';
import TableSkeleton from "@/ui/common/Skeletons/TableSkeleton";
import ComboBox from '@/ui/form/Combobox';
import type { Option } from "@/ui/form/Combobox";

const sortOptions: Option[] = [
    { id: 0, name: "Name AZ", value: "userName" },
    { id: 1, name: "Name ZA", value: "-userName" },
    { id: 2, name: "Email AZ", value: "email" },
    { id: 3, name: "Email ZA", value: "-email" },
    { id: 4, name: "Aux User Code AZ", value: "auxUserCode" },
    { id: 5, name: "Aux User Code ZA", value: "-auxUserCode" },
    { id: 6, name: "Submitted Date ASC", value: "submittedDate" },
    { id: 7, name: "Submitted Date DESC", value: "-submittedDate" },
    { id: 8, name: "Answered Questions amount ASC", value: "answeredQuestions" },
    { id: 9, name: "Answered Questions amount DESC", value: "-answeredQuestions" },
];

export const FormInstance: React.FC = () => {
    const { formId } = useParams();
    const [searchParams] = useSearchParams();
    const publicCode = searchParams.get('publicCode');
    const { token } = useUserStore();
    const navigate = useNavigate();

    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [apiResponseToShow, setApiResponseToShow] = useState("");
    const handleRowClick = (apiReponse: string) => {
        setApiResponseToShow(apiReponse);
        setIsModalOpen(true);
    };

    //TODO - Make the filters work
    // const [search, setSearch] = useState({ nameEmailCode: "", submitted_start_date: "", submitted_end_date: "" });
    // const [debouncedSearch, setDebouncedSearch] = useState({ nameEmailCode: "", submitted_start_date: "", submitted_end_date: "" });

    // const handleDebouncedSearch = useCallback(
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     debounce((query: any) => {
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //         setDebouncedSearch(query);
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     }, 500) as (query: any) => void,
    //     []
    // );

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { id, value } = e.target;

    //     setSearch(prevState => {
    //         const updatedState = { ...prevState, [id]: value };
    //         handleDebouncedSearch(updatedState);
    //         return updatedState;
    //     });
    // };
    const [sort, setSort] = useState(sortOptions[7]);
    const handleComboboxChange = useCallback((selectedOptionId: number) => {
        console.log("selectedOptionId", selectedOptionId);
        const selectedOption = sortOptions.find(option => option.id === selectedOptionId);
        if (selectedOption) {
            console.log("selectedOption", selectedOption);
            setSort(selectedOption);
        }
    }, []);

    const { data, isFetching, isError, isLoading: isLoadingForms } = useQuery({
        // ...getFormInstancesQuery(perPage, currentPage, formId!, debouncedSearch.nameEmailCode, debouncedSearch.submitted_start_date, debouncedSearch.submitted_end_date),
        ...getFormInstancesQuery(perPage, currentPage, formId!, "", "", "", sort?.value ?? "-submittedDate"),
        enabled: !!token,
    });
    const forms = data?.data;

    const handleGoCompletedQuestions = (idx: number) => {
        useCompletedQuestions.setState({
            completedQuestions: forms![idx]!.completed_questions,
        });
        navigate(`/form-instance/${formId}/completed-questions`);
    };

    return (
        <div className="bg-white flex flex-col items-center justify-between px-2 pb-4 text-base font-semibold leading-7 w-full gap-5">
            <div className="flex gap-1 items-center w-full">
                <Button
                    variant="secondary"
                    onClick={() => navigate(-1)}
                    aria-label="Return"
                >
                    <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                    Return
                </Button>
                <span className="pl-3 text-2xl text-black">
                    Form&apos;s Instances
                </span>
                {
                    publicCode && (
                        <span className="text-2xl text-gray-500">- Form Public Code: {publicCode}</span>
                    )
                }
                <div className="ml-auto gap-2 items-center w-80">
                    <Label containerClassName="justify-end" label={"Sort by"} />
                    <ComboBox
                        id="sortOptions"
                        items={sortOptions}
                        defaultValue={sort?.name}
                        onValueChange={(item) => handleComboboxChange(item.id as keyof typeof Option)}
                    />
                </div>
            </div>
            <div className="rounded-xl border-[1px] bg-white p-2 pt-4 shadow-lg w-full">
                {/* <div className="flex gap-5">
                    <Input
                        type="search"
                        id="nameEmailCode"
                        label="Name / Email / Code"
                        placeholder="Search by name, email or code"
                        className="min-w-[210px]"
                        value={search.nameEmailCode}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="date"
                        id="submitted_start_date"
                        label="Date"
                        placeholder=""
                        value={search.submitted_start_date}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="date"
                        id="submitted_end_date"
                        label="Date"
                        placeholder=""
                        value={search.submitted_end_date}
                        onChange={handleInputChange}
                    />
                </div> */}

                {isFetching ? (
                    <TableSkeleton />
                ) : isError ? (
                    <EmptyState
                        message={message.ERROR_STATE}
                        iconName="ArchiveBoxXMarkIcon"
                    />
                ) : !forms?.length ? (
                    <EmptyState message={message.EMPTY_STATE_WITHOUT_FILTER} iconName="MagnifyingGlassIcon" />
                ) : (

                    // {
                    //     isError ? (
                    //         <EmptyState
                    //             message={message.ERROR_STATE}
                    //             iconName="ArchiveBoxXMarkIcon"
                    //         />
                    //     ) : !forms?.length ? (
                    //         <EmptyState message={message.EMPTY_STATE_WITHOUT_FILTER} iconName="PencilSquareIcon" />
                    //     ) : (

                    <div className="rounded-sm border-[1px] border-gray-300">
                        <table className="w-full whitespace-nowrap bg-white text-left shadow-md">
                            <colgroup>
                                <col className="w-full sm:w-4/12" />
                                <col className="lg:w-4/12" />
                                <col className="lg:w-2/12" />
                                <col className="lg:w-1/12" />
                                <col className="lg:w-1/12" />
                            </colgroup>
                            <thead className="border-b-[1px] border-gray-300 bg-gray-200 text-sm leading-6">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-2 pl-4 pr-8 font-normal text-[#6B7280] sm:pl-6 lg:pl-8"
                                    >
                                        NAME / EMAIL
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                                    >
                                        AUX USER CODE
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-8 sm:text-left lg:pr-20"
                                    >
                                        SUBMITTED DATE
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] md:table-cell lg:pr-20"
                                    >
                                        # ANSWERED QUESTIONS
                                    </th>

                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                    >
                                        API RESPONSE
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                    >
                                        VIEW
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
                                {forms?.map((item, idx) => (
                                    <tr key={item.public_code} className="font-normal">
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4">
                                                <div className="flex flex-col truncate text-sm leading-6 text-black">
                                                    <span>{
                                                        (() => {
                                                            const completeName = `${item.completer_user_first_name || ''} ${item.completer_user_last_name || ''}`;
                                                            if (!completeName.trim()) {
                                                                return 'Not Apply';
                                                            } else {
                                                                return truncateText(completeName, 30);
                                                            }
                                                        })()

                                                    }</span>
                                                    <span className="text-gray-500 italic"> {truncateText(item.completer_user_email ?? ' ', 30)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                            <div className="flex gap-x-3">
                                                <div className="truncate text-sm leading-6 text-black">
                                                    {
                                                        (item?.completer_user_code && item?.completer_user_code !== "") ? item?.completer_user_code : 'Not Apply'
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                                            {parseDate(item.final_date_time?.toString())}
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            {item?.completed_questions_count}
                                        </td>
                                        <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            <div className="flex justify-center">
                                                <icons.CommandLineIcon aria-label="View API Response" color={'#00519E'} className={tw(`w-5 h-5`, 'cursor-pointer')} onClick={() => handleRowClick(item.api_response ?? 'Not Apply')} />
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                            <div className="flex justify-end">
                                                <icons.ChevronRightIcon aria-label="Go completed questions" color={'#00519E'} className={tw(`w-5 h-5`, 'cursor-pointer')} onClick={() => handleGoCompletedQuestions(idx)} />
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
                        <Modal position={"center"} show={isModalOpen} size="7xl" popup onClose={() => setIsModalOpen(false)}>
                            <Modal.Header>API Response</Modal.Header>
                            <Modal.Body>
                                <div>
                                    <p>
                                        {isValidJson(apiResponseToShow)
                                            ? <ReactJson src={JSON.parse(apiResponseToShow) as Record<string, unknown>} />
                                            : apiResponseToShow}
                                    </p>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                )
                }
            </div>
            <div className="h-[100px]"></div>
        </div>
    )
}
