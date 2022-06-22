import React, { useRef, useState } from "react";
import Front from "../Layouts/Front";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const Edit = () => {
    const { id, name, body, cover,title, base_url, errors } = usePage().props
    const coverRef = useRef(null)
    const [values, setValues] = useState({name, body, cover})

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", values.name)
        formData.append("body", values.body)
        formData.append("cover", coverRef.current.files[0])
        formData.append("_method", "PUT")
        Inertia.post(base_url+ 'posts/'+id, formData)
    }
    return (
        <Front title={name+ ' | Blog'}>
            <div className="row">
                <div className="col-md-8 offset-2">
                    <h2>Edit Post</h2>
                    <div className="list-group">
                        <div className="card m-3">
                            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className={errors.name ? 'is-invalid form-control' : 'form-control'} id="name" value={values.name} onChange={handleChange} name="name" />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">Body</label>
                                    <textarea className={errors.body ? 'is-invalid form-control' : 'form-control'} id="body" value={values.body} onChange={handleChange} name="body" rows="3"></textarea>
                                    {errors.body && <div className="invalid-feedback">{errors.body}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cover">Cover</label>
                                    <input type="file" ref={coverRef} className={errors.cover ? 'is-invalid form-control-file form-control' : 'form-control-file form-control'} id="cover" name="cover" />
                                    {errors.cover && <div className="invalid-feedback">{errors.cover}</div>}
                                </div>
                                <div className="form-group mt-2">
                                    <button type="submit" className="float-end btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Front>
    );

}

export default Edit;