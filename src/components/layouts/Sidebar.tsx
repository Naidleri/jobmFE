import { useState } from 'react'
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

function CreateIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] shrink-0 fill-none stroke-current stroke-[1.8]">
            <path d="M12 5v14M5 12h14" />
        </svg>
    )
}

export default function Sidebar() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

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
    <>
        <button
            type="button"
            aria-label="Buka menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
            className="fixed left-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-xl bg-[#15213f] text-white shadow-lg sm:hidden"
        >
            <span className="text-2xl leading-none">☰</span>
        </button>
        {isOpen && (
            <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/30 sm:hidden"
            />
        )}
    <aside className={`fixed inset-y-0 left-0 z-50 min-h-screen w-[min(336px,85vw)] overflow-y-auto bg-[#f4f5f7] p-[18px_15px] text-[#15213f] shadow-xl transition-transform duration-200 sm:static sm:z-auto sm:block sm:w-[260px] sm:translate-x-0 sm:shadow-none lg:w-[336px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-3 flex items-center justify-end sm:hidden">
            <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setIsOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg text-2xl text-[#45516c] hover:bg-[#e6ebf5]"
            >
                ×
            </button>
        </div>
        <div className="relative mb-[18px] ml-0.5 w-max text-[25px] font-extrabold leading-none tracking-[-1.4px]" aria-label="Indokerja.id">
            <span>indokerja</span><strong className="font-medium text-[#5a6479]">.id</strong>
            <small className="mt-[3px] block text-center text-[8px] font-bold tracking-normal">Gerbang Karier Indonesia</small>
        </div>

        <button
            type="button"
            className="flex min-h-[72px] w-full items-center gap-3.5 rounded-[21px] border border-[#dfe2e8] bg-white px-[15px] py-2.5 text-left transition hover:border-[#15213f]"
            onClick={() => {
                setIsOpen(false)
                navigate(isGuest ? '/login' : '/profile')
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
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                    `flex min-h-[51px] items-center gap-4 rounded-[25px] px-4 text-lg font-medium text-[#45516c] no-underline transition hover:bg-[#e6ebf5] hover:text-[#15213f] ${isActive ? 'bg-[#e6ebf5] font-bold text-[#15213f]' : ''}`
                }
                >
                <HomeIcon />
                <span>{user?.role === 'COMPANY' ? 'My Job' : 'Home'}</span>
            </NavLink>
            {user?.role === 'COMPANY' ? (
                <>
                    <NavLink
                        to="/company/jobs/create"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `flex min-h-[51px] items-center gap-4 rounded-[25px] px-4 text-lg font-medium text-[#45516c] no-underline transition hover:bg-[#e6ebf5] hover:text-[#15213f] ${isActive ? 'bg-[#e6ebf5] font-bold text-[#15213f]' : ''}`
                        }
                    >
                        <CreateIcon />
                        <span>Create Job</span>
                    </NavLink>
                    <NavLink
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `flex min-h-[51px] items-center gap-4 rounded-[25px] px-4 text-lg font-medium text-[#45516c] no-underline transition hover:bg-[#e6ebf5] hover:text-[#15213f] ${isActive ? 'bg-[#e6ebf5] font-bold text-[#15213f]' : ''}`
                        }
                    >
                        <ProfileIcon />
                        <span>My Profile</span>
                    </NavLink>
                </>
            ) : (
                <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                        `flex min-h-[51px] items-center gap-4 rounded-[25px] px-4 text-lg font-medium text-[#45516c] no-underline transition hover:bg-[#e6ebf5] hover:text-[#15213f] ${isActive ? 'bg-[#e6ebf5] font-bold text-[#15213f]' : ''}`
                    }
                >
                    <ProfileIcon />
                    <span>My Profile</span>
                </NavLink>
            )}
        </nav>
    </aside>
    </>
)}