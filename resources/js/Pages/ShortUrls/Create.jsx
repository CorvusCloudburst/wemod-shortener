import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateUrlForm from "./Partials/CreateUrlForm";
import CreateManyUrlsForm from "./Partials/CreateManyUrlsForm";

export default function Create({ auth }) {

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Shorten a URL
                </h2>}
        >
            <Head title="Shorten a URL" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 mx-auto sm:p-8 bg:white shadow sm:rounded-lg space-y-8 flex flex-col items-center">
                        <CreateManyUrlsForm className="w-1/2" />
                        <p className="text-4xl font-bold">OR</p>
                        <CreateUrlForm className="w-1/2" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}