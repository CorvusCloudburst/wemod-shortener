import Table from '@/Components/Table';
import NavLayout from '@/Layouts/NavLayout';
import { Head } from '@inertiajs/react';

const columns = [
    'short_url_path',
    'original_url',
    'owner',
    'visits',
];

export default function MyUrls({ auth, urls}) {

    return (
        <NavLayout>
            <Head title="My Urls" />
            <h2 className="text-2xl font-semibold leading-tight text-gray-400 text-center">
                My Urls
            </h2>

            <div className="py-12">
                <Table items={urls} columns={columns} primary="Link ID" action="shortUrls.analytics" />
            </div>
        </NavLayout>
    );
}