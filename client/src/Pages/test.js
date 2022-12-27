import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createForm } from "../slices/form";

const AddForm = () => {
    const initalFormState = {
        createdBy: "",
        name: "",
        description: "",
        questions: [{
            questionText: "Untitled Question",
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}],
            openView: false,
        }],
        once: false,
    };

    const [form, setForm] = useState(initalFormState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveForm = () => {
        const { createdBy, name, description, questions, once } = form;

        dispatch(createForm({ createdBy, name, description, questions, once }))
        .unwrap()
        .then(data => {
            console.log(data);
            setForm({
                createdBy: data.createdBy,
                name: data.name,
                description: data.description,
                questions: data.questions,
                once: data.once,
            });
            setSubmitted(true);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const newForm = () => {
        setForm(initalFormState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newForm}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="createdBy">Created By</label>
                        <input
                            type="text"
                            className="form-control"
                            id="createdBy"
                            required
                            value={form.createdBy || ""}
                            onChange={handleInputChange}
                            name="createdBy"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={form.name || ""}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input

                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={form.description || ""}
                            onChange={handleInputChange}
                            name="description"
                        />

                    </div>

                    <button onClick={saveForm} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddForm;


