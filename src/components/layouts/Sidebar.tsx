import { NavLink } from 'react-router-dom'

function HomeIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] shrink-0 fill-none stroke-current stroke-[1.8]">
            <path d="m3.5 10.5 8.5-7 8.5 7v9a1 1 0 0 1-1 1h-5v-6h-5v6H4.5a1 1 0 0 1-1-1v-9Z" />
        </svg>
    )
}

function ProfileIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] shrink-0 fill-none stroke-current stroke-[1.8]">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
    )
}

function PlusIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M12 5v14M5 12h14" />
        </svg>
    )
}

export default function Sidebar() {
    return (
    <aside className="min-h-screen w-[260px] shrink-0 bg-[#f4f5f7] p-[18px_15px] text-[#15213f] sm:w-[336px]">
        <div className="relative mb-[18px] ml-0.5 w-max text-[25px] font-extrabold leading-none tracking-[-1.4px]" aria-label="Indokerja.id">
            <span>indokerja</span><strong className="font-medium text-[#5a6479]">.id</strong>
            <small className="mt-[3px] block text-center text-[8px] font-bold tracking-normal">Gerbang Karier Indonesia</small>
        </div>

        <div className="flex min-h-[72px] items-center gap-3.5 rounded-[21px] border border-[#dfe2e8] bg-white px-[15px] py-2.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#15213f] text-xs font-bold text-white" aria-hidden="true">
                HA
            </div>
            <div>
                <span className="block text-sm text-[#5b6680]">Personal workspace</span>
                <strong className="mt-0.5 block text-[17px]">Haris Ardiansyah</strong>
            </div>
        </div>

        <button type="button" className="my-[15px] flex h-[50px] w-full items-center justify-center gap-3 rounded-[28px] border-0 bg-[#101c40] text-lg font-bold text-white transition hover:bg-[#1b2a57]">
            <PlusIcon />
            <span>Create</span>
        </button>

        <nav className="grid gap-[3px]" aria-label="Main navigation">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `flex min-h-[51px] items-center gap-4 rounded-[25px] px-4 text-lg font-medium text-[#45516c] no-underline transition hover:bg-[#e6ebf5] hover:text-[#15213f] ${isActive ? 'bg-[#e6ebf5] font-bold text-[#15213f]' : ''}`
                }
                >
                <HomeIcon />
                <span>Home</span>
            </NavLink>
                <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `flex min-h-[51px] items-center gap-4 rounded-[25px] px-4 text-lg font-medium text-[#45516c] no-underline transition hover:bg-[#e6ebf5] hover:text-[#15213f] ${isActive ? 'bg-[#e6ebf5] font-bold text-[#15213f]' : ''}`
                }
                >
                <ProfileIcon />
                <span>My Profile</span>
            </NavLink>
        </nav>
    </aside>
)}