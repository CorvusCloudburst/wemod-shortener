import NavLink from '@/Components/NavLink';
import RightSideNav from '@/Components/RightSideNav';


export default function NavLayout({ header, children }) {
    
    return (
        <div className="flex min-h-screen min-w-full flex-col items-center bg-gray-950 justify-start pt-0">
            <nav className="fixed z-50 min-w-full border-b border-gray-500 bg-gray-900">
                <div className="flex w-full h-16 justify-between mx-auto w-full px-4">
                    {/* Home Icon (Cheeky link to my resume page) */}
                    <a href="https://corvus.rip" className="w-full max-w-10 h-full max-h-10 my-auto mr-6" >
                        <img src="/cloudburstLogo.png" className="w-full h-full opacity-50 hover:opacity-75" />
                    </a>
                    <div className="w-full flex flex-row space-between">
                        {/* Left Side Nav */}
                        <div className="w-full flex flex-row space-x-8">
                            <NavLink
                                href={route('shortUrls.homepage')}
                                active={route().current('shortUrls.homepage')}
                            >
                                All Urls
                            </NavLink>
                            <NavLink
                                href={route('shortUrls.index')}
                                active={route().current('shortUrls.index')}
                                title="Login to view your Urls."
                            >
                                My Urls
                            </NavLink>
                            <NavLink
                                href={route('shortUrls.create')}
                                active={route().current('shortUrls.create')}
                                title="Login to create a Url."
                            >
                                + New Url
                            </NavLink>
                        </div>

                        {/* Right Side Nav */}
                        <RightSideNav />
                    </div>
                </div>
            </nav>

            {/* Main Page Body */}
            <div className="mt-20 w-full min-w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
