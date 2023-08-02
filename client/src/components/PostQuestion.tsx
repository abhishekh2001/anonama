import { FormEvent, useRef } from 'react'

type PostQuestionPropsType = {
    clickHandler: (text: string) => void
}

const PostQuestion: React.FC<PostQuestionPropsType> = ({ clickHandler }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (textAreaRef.current) {
            const textareaValue = textAreaRef.current.value
            console.log('Textarea Value:', textareaValue)
            clickHandler(textareaValue)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full my-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">
                        Your comment
                    </label>
                    <textarea
                        ref={textAreaRef}
                        id="comment"
                        rows={4}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none"
                        placeholder="Write a comment..."
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Post comment
                    </button>
                </div>
            </form>

            {/* <div className="bg-white mt-2 rounded-b-lg dark:bg-gray-800">
                <label htmlFor="editor" className="sr-only">
                    Publish post
                </label>
                <textarea
                    id="editor"
                    rows={8}
                    className="block w-full p-2 text-sm text-gray-800 bg-white border-2 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Make a comment..."
                    required
                ></textarea>
                <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                    Post comment
                </button>
            </div> */}
        </>
    )
}

export default PostQuestion
