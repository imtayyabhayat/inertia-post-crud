import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";

const Header = () => {
    const { base_url } = usePage().props;
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <InertiaLink className="navbar-brand" href={base_url}>Navbar</InertiaLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <InertiaLink className="nav-link" href={base_url+ 'posts'}>Posts</InertiaLink>
                        </li>
                        <li className="nav-item">
                            <InertiaLink className="nav-link" href={base_url + 'posts/create'}>Create</InertiaLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;