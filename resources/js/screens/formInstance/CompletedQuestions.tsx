import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useCompletedQuestions } from '@/stores';
import { tw } from '@/utils';
import { Button, icons } from '@/ui';
import EmptyState from '@/ui/common/EmptyState';
import { message } from '@/constants/message';
import { CompleterUserAnswerCheckedOption } from '@/api/formInstance';

// import type { CompletedQuestion } from '@/api/formInstance'

// interface CompletedQuestionsProps {
//     completed_questions: CompletedQuestion[];
// }
export const CompletedQuestions: React.FC = () => {
    const completed_questions = useCompletedQuestions.getState().completedQuestions!;
    console.log(completed_questions);

    const navigate = useNavigate();

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
                    Form&apos;s Instances - Completed Questions
                </span>
            </div>
            <div className="rounded-xl border-[1px] bg-white p-3 pt-5 pb-7 shadow-lg w-full">
                {!completed_questions?.length ? (
                    <EmptyState message={message.EMPTY_STATE_WITHOUT_FILTER} iconName="MagnifyingGlassIcon" />
                ) : (

                    <div className="rounded-sm border-[1px] border-gray-300">
                        <table className="w-full whitespace-nowrap bg-white text-left shadow-md">
                            <colgroup>
                                <col className="sm:w-1/12" />
                                <col className="lg:w-4/12" />
                                <col className="lg:w-2/12" />
                                <col className="lg:w-1/12" />
                                <col className="lg:w-4/12" />
                            </colgroup>
                            <thead className="border-b-[1px] border-gray-300 bg-gray-200 text-sm leading-6">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-2 pl-4 pr-8 font-normal text-[#6B7280] sm:pl-6 lg:pl-8"
                                    >
                                        ORDER
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                                    >
                                        TITLE
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-8 sm:text-left lg:pr-20"
                                    >
                                        TYPE
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-2 pl-0 pr-3 font-normal text-[#6B7280] md:table-cell"
                                    >
                                        ANSWER
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {completed_questions?.map((item, idx) => (
                                    <tr key={item.id} className="font-normal">
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4">
                                                <div className="truncate text-sm leading-6 text-black">
                                                    {idx + 1}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                            <div className="flex gap-x-3">
                                                <div className="truncate text-sm leading-6 text-black">
                                                    {item?.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                                            {item.question_type_name}
                                        </td>
                                        <td className="whitespace-pre-wrap w-full max-w-sm py-4 pl-0 pr-3 text-sm leading-6 text-[#6B7280] grow sm:table-cell">
                                            {
                                                item.question_type_id === 3 ? (
                                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                                                    JSON.parse(item.answer).map((option: CompleterUserAnswerCheckedOption) => option.title).join(', ')
                                                ) : (
                                                    item.answer
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                }
            </div>
            <div className="h-[100px]"></div>
        </div>
    )
}
