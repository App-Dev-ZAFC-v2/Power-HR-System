import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getForms,
    getForm,
} from "../slices/form";
import { Link } from "react-router-dom";

const TestList = () => {
    const form = useSelector(state => state.form);
    const dispatch = useDispatch();

    const retrieveForms = useCallback(() => {
        dispatch(getForms());
    }, [dispatch]);

    useEffect(() => {
        retrieveForms();
    }, [retrieveForms]);

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Form List</h4>
                
                <ul className="list-group">
                    {form &&
                        form.map((form, index) => (
                            <li
                                key={index}
                            >
                                {form.name}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default TestList;
