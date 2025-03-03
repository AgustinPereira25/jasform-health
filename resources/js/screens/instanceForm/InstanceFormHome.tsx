import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Input, icons } from '@/ui';
import type { InstanceProps } from './components';
import type { CompletedForm } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { adjustHoverColor, getColorContrast, isValidEmail, isValidImageUrl } from '@/helpers/helpers';

export const InstanceFormHome: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
    const [searchParams] = useSearchParams();
    const aux_code = searchParams.get('aux_code');
    // console.log("aux_code:", aux_code)
    const currentState = useFormInstance.getState().formInstance!;
    if (!currentState) {
        const initialFormData: CompletedForm = {
            form_id: formInstanceInfo.id!,
            initial_date_time: new Date,
            completer_user_first_name: "",
            completer_user_last_name: "",
            completer_user_email: "",
            completer_user_code: "",
            completed_questions_count: 0,
            public_code: formInstanceInfo.public_code!,
            completed_questions: [],
            api_url: formInstanceInfo.api_url ?? '',
            aux_code: aux_code ?? '',
        };
        // console.log("initialFormData:", { initialFormData });
        useFormInstance.setState({
            formInstance: initialFormData,
            previewMode: false,
        });
    };
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [errors, setErrors] = useState<{ firstName: string, lastName: string, email: string }>({ firstName: '', lastName: '', email: '' });
    const [hovered, setHovered] = useState(false);

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

    // useEffect(() => {
    //     // Put HTML on head tag
    //     const htmlExampleHead = formInstanceInfo.html_head;
    //     const htmlExampleBody = formInstanceInfo.html_body;
    //     document.getElementsByTagName("head")[0]!.innerHTML += htmlExampleHead;
    //     document.getElementsByTagName("body")[0]!.innerHTML += htmlExampleBody;
    // }, [])

    // document.getElementsByTagName('head')[0].appendChild(formInstanceInfo.html_head);
    // console.log(`${formInstanceInfo.logo}`)
    const hoverColor = adjustHoverColor(formInstanceInfo.primary_color);
    return (
        <div className="bg-white p-8 rounded-lg w-full max-w-md h-full max-h-[600px]">
            <div className="flex flex-col justify-center items-center gap-3 pb-2 w-full">
                {
                    isValidImageUrl(formInstanceInfo.logo ?? '') && (
                        <img className="object-scale-down max-h-[70px]" src={formInstanceInfo.logo} alt={formInstanceInfo.name} />
                    )
                }
                <span className="text-2xl font-medium" style={{
                    color: formInstanceInfo.primary_color ?? '#407EC9',
                }}>{formInstanceInfo.welcome_text}</span>
                <div className="p-4 w-full h-24 overflow-auto">
                    <span className="break-words italic">{formInstanceInfo.description}</span>
                </div>
            </div>
            <form
                onSubmit={handleHomeSubmit}
            >
                <div className="grid">
                    {/* <div> */}
                    <Input
                        aria-label="First Name"
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
                        aria-label="Last Name"
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
                        aria-label="Email Address"
                        id="email"
                        label="Email Address"
                        placeholder="email@email.com"
                        error={errors.email}
                        value={email}
                        onChange={handleChange}
                    />
                    {/* </div> */}
                    <div className="">
                        <Button
                            aria-label="Complete the form"
                            type="submit"
                            variant="primary"
                            className={`flex w-full hover:${adjustHoverColor(formInstanceInfo.primary_color)}`}
                            style={{
                                backgroundColor: hovered ? hoverColor : formInstanceInfo.primary_color,
                                border: formInstanceInfo.rounded_style ? 1 : 'none',
                                borderRadius: formInstanceInfo.rounded_style ?? 'none',
                                color: getColorContrast(formInstanceInfo.primary_color),
                            }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
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
