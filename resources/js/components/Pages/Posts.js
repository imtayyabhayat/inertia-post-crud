import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Front from "../Layouts/Front";

const Posts = () => {
    const { title, posts, base_url} = usePage().props
    return (
        <Front title={'Posts | '+title}>
            <div className="row">
                <div className="col-md-6 offset-md-2">
                    <h2>Posts</h2>
                    <div className="list-group">
                        {posts.map(post => (
                            <div className="card m-3" key={post.id}>
                                <img className="card-img-top" src={post.cover} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.body}</p>
                                    <p className="card-text"><small className="text-muted">{post.creted_at}</small></p>
                                </div>
                                <div className="card-footer text-muted">
                                    <InertiaLink className="btn btn-primary" href={base_url+`posts/${post.slug}`}>Read More...</InertiaLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-2">
                    <h2>Categories</h2>
                    <ul className="list-group">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                        <li className="list-group-item">A fourth item</li>
                        <li className="list-group-item">And a fifth one</li>
                    </ul>
                    <hr />
                    <h2>Meta</h2>
                    <ul className="list-group">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                        <li className="list-group-item">A fourth item</li>
                        <li className="list-group-item">And a fifth one</li>
                    </ul>
                    <hr />
                </div>
            </div>
        </Front>
    );
}

export default Posts;
