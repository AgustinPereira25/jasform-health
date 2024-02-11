import { Button, Input, icons } from '@/ui';

export const IssueFormHome = () => {
    return (
        <div className="w-[35%] bg-white p-8 rounded-lg">
            <div className="flex flex-col justify-center items-center gap-6 pb-6">
                <img src={'/LogoIpsum.svg'} alt="cardiology" />
                <span className='text-2xl font-medium text-[#407EC9]'>Welcome to Cardiology Form</span>
                <div className='p-4 border border-gray-300 rounded-lg'>
                    <span>This is the cardiology form for symptom monitoring.
                        Your data is not collected in this form and your privacy will be safeguarded by the HIPAA compliant certification.</span>
                </div>
            </div>
            <form
            // onSubmit={(e) => { void handleSubmit((value) => logUserMutation(value))(e); }}
            >
                <div className="grid gap-3">
                    {/* <div> */}
                    <Input
                        type="text"
                        id="first_name"
                        label="First Name"
                        placeholder="First Name"
                    // {...register("password")}
                    // error={errors.password?.message}
                    //value={passwordInput}
                    //onChange={(e) => { setPasswordInput(e.target.value); }}
                    />
                    {/* </div> */}
                    {/* <div> */}
                    <Input
                        type="text"
                        id="last_name"
                        label="Last Name"
                        placeholder="Last Name"
                    // {...register("password")}
                    // error={errors.password?.message}
                    //value={passwordInput}
                    //onChange={(e) => { setPasswordInput(e.target.value); }}
                    />
                    {/* </div> */}
                    {/* <div> */}
                    <Input
                        id="email"
                        label="Email Address"
                        placeholder="Email@email.com"
                    // {...register("email")}
                    // error={errors.email?.message}
                    // value={emailInput}
                    // onChange={(e) => { setEmailInput(e.target.value); }}
                    />
                    {/* </div> */}
                    <div className="pb-8">
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex w-full"
                        // disabled={!isDirty || isPendingLogUserMutation}
                        >
                            {/* {isPendingLogUserMutation ? (
                  <icons.SpinnerIcon className="h-5 w-5" />
                ) : (
                  "Log in"
                )} */}
                            Complete the form
                            <icons.ArrowRightIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
