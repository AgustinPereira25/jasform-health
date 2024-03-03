import React, { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
// import { debounce } from 'lodash'
import { useQuery } from '@tanstack/react-query'

import { Button, icons } from '@/ui'
import { tw } from '@/utils'
import { paginatorValues } from '@/constants/pagination'
import Pagination from '@/ui/common/Pagination'
import { getFormInstancesQuery } from '@/api/formInstance'
import { useCompletedQuestions, useUserStore } from '@/stores'

export const FormInstance: React.FC = () => {
    const { formId } = useParams();
    const [searchParams] = useSearchParams();
    const publicCode = searchParams.get('publicCode');
    const { token } = useUserStore();
    const navigate = useNavigate();

    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

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

    const { data, isLoading: isLoadingForms } = useQuery({
        // ...getFormInstancesQuery(perPage, currentPage, formId!, debouncedSearch.nameEmailCode, debouncedSearch.submitted_start_date, debouncedSearch.submitted_end_date),
        ...getFormInstancesQuery(perPage, currentPage, formId!),
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
                >
                    <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                    Return
                </Button>
                <span className="pl-3 text-2xl text-black">
                    Form&apos;s Instances
                </span>
                {
                    publicCode && (
                        <span className="text-2xl text-gray-500 italic">- Form Public Code: {publicCode}</span>
                    )
                }
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
                                    # QUESTIONS
                                </th>
                                <th
                                    scope="col"
                                    className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                                ></th>
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
                                <tr key={item.public_code}>
                                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                        <div className="flex items-center gap-x-4">
                                            <div className="truncate text-sm leading-6 text-black">
                                                {`${item.completer_user_first_name} ${item.completer_user_last_name}`}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                        <div className="flex gap-x-3">
                                            <div className="truncate text-sm leading-6 text-black">
                                                {item?.public_code}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                                        {item.final_date_time?.toString()}
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                        {item?.completed_questions_count}
                                    </td>
                                    <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                                        <icons.ChevronRightIcon className={tw(`w-5 h-5`, 'cursor-pointer')} onClick={() => handleGoCompletedQuestions(idx)} />
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
            </div>
            <div className="h-[100px]"></div>
        </div>
    )
}
