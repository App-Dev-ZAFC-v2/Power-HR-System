import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResponseByFormID } from "../../../Redux/slices/response";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";


function Response(){
    const { id } = useParams();
    const response = useSelector(state => state.responses.feedback);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getResponseByFormID(id))
    }, [dispatch, id])

    return (
        <Pagination count={10} variant="outlined" shape="rounded" />
    )
}

export default Response;