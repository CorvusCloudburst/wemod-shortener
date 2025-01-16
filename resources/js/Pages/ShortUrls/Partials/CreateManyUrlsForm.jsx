import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function CreateManyUrlsForm({ className = '' }) {

    const { setData, post, recentlySuccessful } = useForm();

const submit = (e) => {
    e.preventDefault();

    post(route('shortUrls.generate')); // Sends form data to this route. Wow, magic!
};

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-400">Upload a CSV file.</h2>
                <p className="mt-1 text-sm text-gray-600">Urls should be comma-separated.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="csv_file" value="CSV File:" className="mb-2 text-gray-500" />
                    <input 
                        className="text-gray-600"
                        id="csv_file"
                        type="file"
                        name="csv_file"
                        accept=".csv"
                        onChange={(e) => setData('csv_file', e.target.files[0])}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton>Submit</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition-ease-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">File Saved. One moment please...</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}