// // import type { QueryClient } from "@tanstack/react-query";

// // import type { ServiceResponse } from "./api.types";
// // import { privateAPI } from "./axios";

// // import type { User } from "./users";

// const DOMAIN = "form";
// // const ALL = "all";

// export interface IFormInstance {
//   status: number;
//   success: boolean;
//   data: FormInstance;
// }
// export interface FormInstance {
//     id:                                number;
//     name:                              string;
//     welcome_text:                      string;
//     description:                       string;
//     creation_date_time:                Date;
//     last_modified_date_time:           Date;
//     logo:                              string;
//     primary_color:                     string;
//     secondary_color:                   string;
//     rounded_style:                     string;
//     api_url:                           string;
//     is_active:                         boolean;
//     is_anonymous_user_answers:         boolean;
//     is_request_mandatory_initial_data: boolean;
//     public_code:                       string;
//     user_id:                           number;
//     form_instances_count:              number;
//     form_questions_count:              number;
//     questions:                         Question[];
// }

// export interface Question {
//     id:                 number;
//     title:              string;
//     text:               string;
//     order:              number;
//     is_obligatory:      boolean;
//     form_id:            number;
//     question_type_id:   number;
//     question_type_name: string;
//     questions_options?: QuestionsOption[];
// }

// export interface QuestionsOption {
//     id:               number;
//     order:            number;
//     title:            string;
//     next_question:    number;
//     form_question_id: number;
// }

// // export const getFormsQuestionsQuery = () => ({
// //     queryKey: [DOMAIN, ALL, "getFormsQuery"],
// //     queryFn: async () => {
// //         const response = await privateAPI.get<ServiceResponse<FormQuestion[]>>("/form_questions");
// //         // console.log(response)
// //         return response.data.data;
// //     },
// // });

// // export const getFormInstanceQuery = (id: FormInstance["id"]) => ({
// //   queryKey: [DOMAIN, id, "getFormQuery"],
// //   queryFn: async () => {
// //     const response = await privateAPI.get<ServiceResponse<IFormQuestion[]>>(
// //       `/form_questions/byFormId/${id}`,
// //     );
// //     return response.data.data;
// //   },
// // });

// // interface CreateUserParams {
// //     name: string;
// //     email: string;
// //     password: string;
// //     passwordConfirmation: string;
// // }

// // export const createForm = {
// //     mutation: async (params: CreateUserParams) => {
// //         const { passwordConfirmation, ...rest } = params;
// //         const response = await privateAPI.post<ServiceResponse<User>>("/users", {
// //             ...rest,
// //             password_confirmation: passwordConfirmation,
// //         });

// //         return response.data.data;
// //     },
// //     invalidates: (queryClient: QueryClient) => {
// //         void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
// //     },
// // };

// // export const deleteForm = {
// //     mutation: async (userId: User["id"]) => {
// //         await privateAPI.delete(`/users/${userId}`);
// //     },
// //     invalidates: (
// //         queryClient: QueryClient,
// //         { userId }: { userId: User["id"] },
// //     ) => {
// //         void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
// //         void queryClient.invalidateQueries({ queryKey: [DOMAIN, userId] });
// //     },
// // };
