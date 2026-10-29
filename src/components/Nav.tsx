import { NavLink } from "react-router";

export default function Nav() {
    return (
        <nav>
            <ul>
                <li><NavLink style={
                    ({isActive}) => { return isActive ? { color: "red" } : {} }
                } to="/">Home</NavLink></li>
                {/* Remove the end attribute to keep this item active
                when any of its children is active */}
                <li><NavLink end to="/about">About</NavLink>
                    <ul>
                        <li><NavLink to="/about/saeid">about subpage (nested route)</NavLink></li>
                        <li><NavLink to="/about/123">about with id</NavLink></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

