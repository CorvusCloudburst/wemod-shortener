import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const columns = [
    'short_url_path',
    'original_url',
    'owner',
    'visits',
];

export default function All({ auth, urls}) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Urls
                </h2>
            }
        >
            <Head title="All Urls" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Table items={urls} columns={columns} primary="Link ID" action="shortUrls.analytics" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}