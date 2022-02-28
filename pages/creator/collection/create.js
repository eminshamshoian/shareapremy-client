import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/Routes/CreatorRoute";
import CollectionCreateForm from "../../../components/forms/CollectionCreateForm";

const CollectionCreate = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    imagePreview: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <InstructorRoute>
      <h1 className='text-center p-5 mb-4 '>Create Collection</h1>
      <div className='container col-md-4 offset-md-4 pb-5 form-collection'>
        <CollectionCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
        />
      </div>
    </InstructorRoute>
  );
};

export default CollectionCreate;
