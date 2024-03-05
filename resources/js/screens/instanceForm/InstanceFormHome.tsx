import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Input, icons } from '@/ui';
import type { InstanceProps } from './components';
import type { CompletedForm } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { isValidEmail } from '@/helpers/helpers';

export const InstanceFormHome: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const [searchParams] = useSearchParams();
    const aux_code = searchParams.get('aux_code');

    const currentState = useFormInstance.getState().formInstance!;
    if (!currentState) {
        const initialFormData: CompletedForm = {
            form_id: formInstanceInfo.id!,
            initial_date_time: new Date,
            completer_user_first_name: "",
            completer_user_last_name: "",
            completer_user_email: "",
            completed_questions_count: 0,
            public_code: formInstanceInfo.public_code!,
            completed_questions: [],
            api_url: formInstanceInfo.api_url ?? '',
            aux_code: aux_code ?? '',
        };
        // console.log("initialFormData:", { initialFormData });
        useFormInstance.setState({
            formInstance: initialFormData,
        })
    }
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [errors, setErrors] = useState<{ firstName: string, lastName: string, email: string }>({ firstName: '', lastName: '', email: '' });

    const handleHomeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formInstanceInfo.is_initial_data_required) {

            let firstNameError = '';
            let lastNameError = '';
            let emailError = '';

            if (firstName === '') {
                firstNameError = 'First Name is mandatory';
            }
            if (lastName === '') {
                lastNameError = 'Last Name is mandatory';
            }
            if (email === '') {
                emailError = 'Email Address is mandatory';
            } else if (!isValidEmail(email)) {
                emailError = 'Email Address is invalid';
            }
            if (firstNameError !== '' || lastNameError !== '' || emailError !== '') {
                setErrors({ firstName: firstNameError, lastName: lastNameError, email: emailError })
                return;
            }
        }
        if (errors.firstName === '' && errors.lastName === '' && errors.email === '') {
            useFormInstance.setState({ formInstance: { ...currentState, completer_user_first_name: firstName, completer_user_last_name: lastName, completer_user_email: email } });

            const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder)?.question_type_id ?? 0;
            setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: 1 });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case 'first_name':
                setErrors({ ...errors, firstName: '' });
                setFirstName(value);
                break;
            case 'last_name':
                setErrors({ ...errors, lastName: '' });
                setLastName(value);
                break;
            case 'email':
                setErrors({ ...errors, email: '' });
                setEmail(value);
                break;
            default:
                break;
        }
    }
    // console.log(`${formInstanceInfo.logo}`)
    return (
        <div className="bg-white p-8 rounded-lg w-[35%] max-w-md">
            <div className="flex flex-col justify-center items-center gap-5 pb-6 w-full">
                <img className="object-contain" src={formInstanceInfo.logo} alt="cardiology" />
                <span className="text-2xl font-medium" style={{
                    color: formInstanceInfo.primary_color ?? '#407EC9',
                }}>{formInstanceInfo.welcome_text}</span>
                <div className="p-4 w-full">
                    <span className="italic">{formInstanceInfo.description}</span>
                </div>
            </div>
            <form
                onSubmit={handleHomeSubmit}
            >
                <div className="grid">
                    {/* <div> */}
                    <Input
                        type="text"
                        id="first_name"
                        label="First Name"
                        placeholder="First Name"
                        error={errors.firstName}
                        value={firstName}
                        onChange={handleChange}
                    />
                    {/* </div> */}
                    {/* <div> */}
                    <Input
                        type="text"
                        id="last_name"
                        label="Last Name"
                        placeholder="Last Name"
                        error={errors.lastName}
                        value={lastName}
                        onChange={handleChange}
                    />
                    {/* </div> */}
                    {/* <div> */}
                    <Input
                        id="email"
                        label="Email Address"
                        placeholder="Email@email.com"
                        error={errors.email}
                        value={email}
                        onChange={handleChange}
                    />
                    {/* </div> */}
                    <div className="pb-8">
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex w-full"
                            style={{
                                backgroundColor: formInstanceInfo.primary_color,
                                border: formInstanceInfo.rounded_style ? 1 : 'none',
                                borderRadius: formInstanceInfo.rounded_style ?? 'none',
                                color: formInstanceInfo.primary_color ? formInstanceInfo.primary_color.startsWith("#e") || formInstanceInfo.primary_color.startsWith("#f") ? 'black' : 'white' : 'black',
                            }}
                        >
                            Complete the form
                            <icons.ArrowRightIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
