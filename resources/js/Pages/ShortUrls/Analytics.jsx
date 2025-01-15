import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const columns = [
    'ip',
    'created_at',
];

export default function Analytics({ auth, shortUrl, visits }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Url Visits
                </h2>
            }
        >
            <Head title="Url Visits" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 m-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8 space-y-4 text-lg">
                    <h3 className="text-3xl font-bold">Summary</h3>
                    {/* Shortened URL: */}
                    <div className="flex space-x-4 items-center">
                        <p className="font-bold">Short Url:</p>
                        <p>{route("shortUrls.go", shortUrl.short_url_path)}</p>
                    </div>
                    {/* Original URL: */}
                    <div className="flex space-x-4 items-center">
                        <p className="font-bold">Original Url:</p>
                        <p>{shortUrl.original_url}</p>
                    </div>
                    {/* Total number of link clicks: */}
                    <div className="flex space-x-4 items-center">
                        <p className="font-bold">Total visits:</p>
                        <p>{visits.length}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 m-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8">
                    <Table items={visits} columns={columns} primary="Visit ID" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}