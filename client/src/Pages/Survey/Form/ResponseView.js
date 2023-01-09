import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Executive/Dashboard/dashboard-layout";
import Response from "../../../Components/Survey/Response/Response";
import { getFormByID } from "../../../Redux/slices/form";

export default function ResponseView(){
    const { id } = useParams();
    const rform = useSelector(state => state.forms.form);
    const dispatch = useDispatch();
    const retrieveForm = useCallback(() => {
        dispatch(getFormByID(id));
    }, [dispatch]);

    useEffect(() => {
        retrieveForm();
    }, [retrieveForm]);

    return(
        <DashboardLayout tab="Survey Response">
            <Response/>
        </DashboardLayout>
    )
}

