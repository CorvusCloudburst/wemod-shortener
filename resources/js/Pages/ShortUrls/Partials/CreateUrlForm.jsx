import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function CreateUrlForm({ className = '' }) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        longUrl: 'https://example.com/path/my-link',
    });

const submit = (e) => {
    e.preventDefault();

    post(route('shortUrls.generate')); // Sends form data to this route. Wow, magic!
};

    return (
        <section className={className}>
            <div>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Upload a CSV file.</h2>
                    <p className="mt-1 text-sm text-gray-600">Short URLs will be generated upon submission.</p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="csv_file" value="CSV File:" />
                        <input 
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
            </div>

            <p className="text-4xl font-bold p-16">OR</p>

            <div>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Enter your url.</h2>
                    <p className="mt-1 text-sm text-gray-600">A short URL will be generated upon submission.</p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="url" value="URL:" />
                        <TextInput 
                            id="url" 
                            className="mt-1 block w-full" 
                            defaultValue={data.longUrl} 
                            onChange={(e) => setData('url', e.target.value)}
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
                            <p className="text-sm text-gray-600">URL Saved. One moment please...</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </section>
    );
}