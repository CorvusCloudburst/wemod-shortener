import { Head } from "@inertiajs/react";
import CreateUrlForm from "./Partials/CreateUrlForm";
import CreateManyUrlsForm from "./Partials/CreateManyUrlsForm";
import NavLayout from "@/Layouts/NavLayout";

export default function Create({ auth }) {

    return (
        <NavLayout user={auth.user}>
            <Head title="Shorten a URL" />
            <h2 className="text-2xl text-center font-semibold leading-tight text-gray-400">
                Shorten a URL
            </h2>
            <div className="max-w-7xl mx-auto sm:p-6 lg:p-8 space-y-6">
                <div className="p-4 mx-auto sm:p-8 bg-gray-900/[0.4] shadow sm:rounded-lg space-y-8 flex flex-col items-center">
                    <CreateManyUrlsForm className="w-1/2" />
                    <p className="text-xl font-bold text-gray-600">OR</p>
                    <CreateUrlForm className="w-1/2" />
                </div>
            </div>
        </NavLayout>
    );
}