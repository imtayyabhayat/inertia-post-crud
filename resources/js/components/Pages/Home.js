import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Front from "../Layouts/Front";

const Home = () => {
    const { title } = usePage().props
    return (
        <Front title={'Home | '+title}>
            <div className="row">
                <div className="col-md-8 offset-2">
                    <h2>Posts</h2>
                </div>
            </div>
        </Front>
    );
}

export default Home;
