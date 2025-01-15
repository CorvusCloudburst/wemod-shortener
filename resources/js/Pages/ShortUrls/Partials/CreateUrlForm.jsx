import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function CreateUrlForm({ className = '' }) {

    const { data, setData, post, recentlySuccessful } = useForm({
        longUrl: 'https://example.com/path/my-link',
    });

const submit = (e) => {
    e.preventDefault();

    post(route('shortUrls.generate')); // Sends form data to this route. Wow, magic!
};

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-400">Enter your url.</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="url" value="URL:" />
                    <TextInput 
                        id="url" 
                        className="mt-1 block w-full bg-gray-950 text-gray-300 border-gray-700" 
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
        </section>
    );
}