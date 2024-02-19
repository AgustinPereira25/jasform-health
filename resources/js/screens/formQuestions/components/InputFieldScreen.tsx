import { Input } from '@/ui'

export const InputFieldScreen = () => {
    return (
        <div className="flex flex-col pt-3">
            <div className="flex gap-3">
                <span className="shrink-0">Question to Show</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="question_to_show"
                    placeholder="Question to Show"
                // error={errors.firstName?.message}
                // value={passwordInput}
                // defaultValue={user?.first_name}
                />
            </div>
            <hr />
            <div className="flex gap-3 py-4">
                <span className="shrink-0">Text to Show</span>
                <Input
                    containerClassName="w-full"
                    fullHeight
                    type="text"
                    id="text_to_show"
                    placeholder="Text to Show"
                // error={errors.firstName?.message}
                // value={passwordInput}
                // defaultValue={user?.first_name}
                />
            </div>
            <hr />
        </div>
    )
}