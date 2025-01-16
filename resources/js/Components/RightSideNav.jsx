import Dropdown from '@/Components/Dropdown';

import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import NavLink from './NavLink';

export default function RightSideNav({}) {
    const user = usePage().props.auth.user;
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (<>
        { user ? (
            <div className="ms-6 flex items-center min-w-max">
                <div className="relative ms-3 w-full">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md w-full">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md w-full border border-transparent bg-gray-950 px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-300 focus:outline-none"
                                >
                                    {user.name}

                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route('profile.edit')}
                            >
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        ) : (
            <div className="w-full flex justify-end space-x-8">
            <NavLink 
                href={route('login')} 
                active={route().current('login')}
            >
                Log in
            </NavLink>
            <NavLink 
                href={route('register')} 
                active={route().current('register')}
            >
                Register
            </NavLink>
        </div>
        )}
    </>);
}