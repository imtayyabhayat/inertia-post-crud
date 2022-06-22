import React, { useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import Front from "../Layouts/Front";
import { Inertia } from "@inertiajs/inertia";

const Create = () => {
    const { title, base_url, errors } = usePage().props
    const coverRef = useRef(null)
    const [values, setValues] = useState({
        title: "",
        body: "",
        cover: ""
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("body", values.body)
        formData.append("cover", coverRef.current.files[0])
        Inertia.post(base_url+ 'posts', formData)
    }
    return (
        <Front title={'Create Post | '+title}>
            <div className="row m-2 p-2">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-body p-2">
                            <h5 className="card-title">Create New Post</h5>
                            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className={errors.title ? 'is-invalid form-control' : 'form-control'} id="title" value={values.title} onChange={handleChange} name="title" />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">Body</label>
                                    <textarea className={errors.body ? 'is-invalid form-control' : 'form-control'} id="body" value={values.body} onChange={handleChange} name="body" rows="3"></textarea>
                                    {errors.body && <div className="invalid-feedback">{errors.body}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cover">Cover</label>
                                    <input type="file" ref={coverRef} className={errors.title ? 'is-invalid form-control-file form-control' : 'form-control-file form-control'} id="cover" name="cover" />
                                    {errors.cover && <div className="invalid-feedback">{errors.cover}</div>}
                                </div>
                                <div className="form-group mt-2">
                                    <button type="submit" className="float-end btn btn-primary">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Front>
    );
}

export default Create;