import { NavLink } from 'react-router-dom'

function HomeIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="sidebar__icon">
            <path d="m3.5 10.5 8.5-7 8.5 7v9a1 1 0 0 1-1 1h-5v-6h-5v6H4.5a1 1 0 0 1-1-1v-9Z" />
        </svg>
    )
}

function ProfileIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="sidebar__icon">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
    )
}

function PlusIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="sidebar__plus">
            <path d="M12 5v14M5 12h14" />
        </svg>
    )
}

export default function Sidebar() {
    return (
    <aside className="sidebar">
        <div className="sidebar__brand" aria-label="Indokerja.id">
            <span>indokerja</span>
            <strong>.id</strong>
            <small>Gerbang Karier Indonesia</small>
        </div>

        <div className="sidebar__profile">
            <div className="sidebar__avatar" aria-hidden="true">
                HA
            </div>
            <div>
                <span>Personal workspace</span>
                <strong>Haris Ardiansyah</strong>
            </div>
        </div>

        <button type="button" className="sidebar__create">
            <PlusIcon />
            <span>Create</span>
        </button>

        <nav className="sidebar__nav" aria-label="Main navigation">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                }
                >
                <HomeIcon />
                <span>Home</span>
            </NavLink>
                <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                }
                >
                <ProfileIcon />
                <span>My Profile</span>
            </NavLink>
        </nav>
    </aside>
)}