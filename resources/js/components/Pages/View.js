import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Front from "../Layouts/Front";

const View = () => {
    const { title, post} = usePage().props
    return (
        <Front title={post.title+' | '+title}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2>Single Posts</h2>
                    <div className="list-group">
                        <div className="card m-3" key={post.id}>
                            <img className="card-img-top" src={post.cover} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <p className="card-text"><small className="text-muted">{post.creted_at}</small></p>
                            </div>
                            <div className="card-footer text-muted">
                                <InertiaLink className="btn btn-primary" href={post.edit_url}>Edit</InertiaLink>
                                <InertiaLink className="btn btn-danger float-end" replace method="POST" data={{_method:'delete'}} role="button" href={post.delete_url}>Delete</InertiaLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Front>
    );
}

export default View;
