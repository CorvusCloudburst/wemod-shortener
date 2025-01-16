import Table from '@/Components/Table';
import NavLayout from '@/Layouts/NavLayout';
import { Head } from '@inertiajs/react';

const columns = [
    'shortlink',
    'original_url',
    'owner',
    'visits',
];

export default function Homepage({ auth, urls }) {

    return (
        <NavLayout>
            <Head title="Welcome" />
            <div className="">
                <Head title="All Urls" />
                <h2 className="text-2xl font-semibold leading-tight text-gray-400 text-center">
                    All Urls
                </h2>
                
                <div className="py-12">
                    <Table items={urls} columns={columns} primary="Link ID" />
                </div>
            </div>
        </NavLayout>
    );
}
