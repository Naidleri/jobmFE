import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

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

export default function Sidebar() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const isGuest = !user
    const displayName = user?.name ?? 'Guest'
    const displayRole = user?.role === 'COMPANY'
        ? 'Company workspace'
        : user
            ? 'Job seeker workspace'
            : 'Guest workspace'
    const initials = user
        ? user.name
            .split(' ')
            .filter((word) => word.length > 0)
            .slice(0, 2)
            .map((word) => word[0])
            .join('')
            .toUpperCase()
        : 'G'

    return (
    <aside className="min-h-screen w-[260px] shrink-0 bg-[#f4f5f7] p-[18px_15px] text-[#15213f] sm:w-[336px]">
        <div className="relative mb-[18px] ml-0.5 w-max text-[25px] font-extrabold leading-none tracking-[-1.4px]" aria-label="Indokerja.id">
            <span>indokerja</span><strong className="font-medium text-[#5a6479]">.id</strong>
            <small className="mt-[3px] block text-center text-[8px] font-bold tracking-normal">Gerbang Karier Indonesia</small>
        </div>

        <button
            type="button"
            className="flex min-h-[72px] w-full items-center gap-3.5 rounded-[21px] border border-[#dfe2e8] bg-white px-[15px] py-2.5 text-left transition hover:border-[#15213f]"
            onClick={() => {
                if (isGuest) navigate('/login')
            }}
        >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#15213f] text-xs font-bold text-white" aria-hidden="true">
                {initials}
            </div>
            <div>
                <span className="block text-sm text-[#5b6680]">{displayRole}</span>
                <strong className="mt-0.5 block text-[17px]">{displayName}</strong>
            </div>
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