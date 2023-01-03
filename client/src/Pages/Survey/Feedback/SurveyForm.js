import React, { useEffect, useCallback } from "react";
import Navbar from "../../../Components/Navbar";
import ViewFormCard from "../../../Components/Survey/ViewFormCard";
//import API from "../../../API/form";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../../Redux/slices/form";

// function SurveyForm() {
//   const [form, setForm] = useState([]);
//   const [loadingForm, setLoading] = useState(true);

//   useEffect(() => {
//     API.getForms()

//       .then((data) => {
//         setForm(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   return (
//     <>
//       <Navbar />
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h2">Survey Form</Typography>
//         <Grid container spacing={4} sx={{ mt: 0 }}>
//           {loadingForm ? (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               minHeight="100vh"
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             <>
//               {form.map((f) => (
//                 // <FormCard dataform={f} />
//                 <ViewForm dataform={f} />
//               ))}
//             </>
//           )}
//         </Grid>
//       </Container>
//     </>
//   );
// }

// export default SurveyForm;

//redux

export default function SurveyForm() {
  //redux
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms.form);

  const retrieveForms = useCallback(() => {
    dispatch(getForms());
  }, [dispatch]);

  useEffect(() => {
    retrieveForms();
  }, [retrieveForms]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h2">Survey Form</Typography>
        <Grid container spacing={4} sx={{ mt: 0 }}>
          {forms?.map((f) => (
            <ViewFormCard dataform={f} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
