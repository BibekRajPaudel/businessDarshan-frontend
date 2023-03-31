import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import AddHighLightModal from "../modal/AddHighLightModal";
import { FormInput, FormTextAreaField } from "../input/FormInput";
import { useFormik } from "formik";
import axios from "axios";
import AddItineraryModal from "../modal/AddItineraryModal";
import AddIncludeModal from "../modal/AddIncludeModal";
import AddExcludeModal from "../modal/AddExcludedModal";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const PackageForm = () => {
  const [openHighLight, setHighLight] = useState(false);
  const [openItinerary, setItinerary] = useState(false);
  const [openInclude, setIncluded] = useState(false);
  const [openExclude, setExcluded] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      country: "",
      continent: "",
      price: "",
      duration: "",
      image: "",
      highlights: "",
      overview: "",
      itinerary: "",
      included: "",
      excluded: "",
    },

    onSubmit: async (
      {
        title,
        country,
        continent,
        price,
        duration,
        highlights,
        itinerary,
        included,
        excluded,
        overview,
        image,
      },
      actions
    ) => {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      formData.append("title", title);
      formData.append("country", country);
      formData.append("overview", overview);
      formData.append("continent", continent);
      formData.append("price", price);
      formData.append("duration", duration);

      for (let i = 0; i < highlights.length; i++) {
        formData.append("highlights", highlights[i]);
      }

      for (let i = 0; i < itinerary.length; i++) {
        formData.append("itinerary", itinerary[i]);
      }

      for (let i = 0; i < included.length; i++) {
        formData.append("included", included[i]);
      }

      for (let i = 0; i < excluded.length; i++) {
        formData.append("excluded", excluded[i]);
      }

      await axios.post(`${process.env.REACT_APP_URL}/trip`, formData);
      actions.resetForm();
      setSelectedFile([]);
      router("/dashboard");
    },
  });

  const onfileChange = () => {
    formik.setFieldValue("image", selectedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setSelectedFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      formik.setFieldValue("image", acceptedFiles);
    },
  });

  const selectedImages = selectedFile?.map((file, i) => (
    <div key={i}>
      <img
        className="rounded-[8px] w-[200px] h-[200px]"
        src={file.preview}
        alt=""
      />
    </div>
  ));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-3 gap-5 px-4">
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Title</h1>
          <FormInput
            name="title"
            formik={formik}
            placeholder="Enter Title..."
            type="text"
          />
        </div>

        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Continent</h1>
          <FormInput
            name="continent"
            formik={formik}
            type="text"
            placeholder="Enter Continent..."
          />
        </div>

        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Country</h1>
          <FormInput
            name="country"
            formik={formik}
            placeholder="Enter Country..."
            type="text"
          />
        </div>

        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Price</h1>
          <FormInput
            name="price"
            formik={formik}
            placeholder="Enter Price..."
            type="number"
          />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Highlights</h1>
          <p
            onClick={() => setHighLight(true)}
            className="border-2 border-black border-dashed  cursor-pointer flex justify-center items-center rounded-md px-[10px] py-1 w-full h-[45px] "
          >
            Add Highlights
          </p>

          {openHighLight && (
            <AddHighLightModal formik={formik} setHighLight={setHighLight} />
          )}
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Itinerary</h1>

          <p
            onClick={() => setItinerary(true)}
            className="border-2 border-black border-dashed  cursor-pointer flex justify-center items-center rounded-md px-[10px] py-1 w-full h-[45px] "
          >
            Add itinerary
          </p>
          {openItinerary && (
            <AddItineraryModal formik={formik} setItinerary={setItinerary} />
          )}
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Duration</h1>
          <FormInput
            name="duration"
            formik={formik}
            type="text"
            placeholder="Enter Duration..."
          />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Included</h1>
          <p
            onClick={() => setIncluded(true)}
            className="border-2 border-black border-dashed  cursor-pointer flex justify-center items-center rounded-md px-[10px] py-1 w-full h-[45px] "
          >
            Add included
          </p>
          {openInclude && (
            <AddIncludeModal formik={formik} setIncluded={setIncluded} />
          )}
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Excluded</h1>
          <p
            onClick={() => setExcluded(true)}
            className="border-2 border-black border-dashed  cursor-pointer flex justify-center items-center rounded-md px-[10px] py-1 w-full h-[45px] "
          >
            Add Excluded
          </p>
          {openExclude && (
            <AddExcludeModal formik={formik} setExcluded={setExcluded} />
          )}
        </div>
      </div>
      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">Overview</h1>
        <FormTextAreaField name="overview" formik={formik} type="text" />
      </div>
      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">Images</h1>
        <div
          {...getRootProps()}
          className="flex justify-center items-center bg-[#FAFAFA] w-full border-[1px] border-dashed border-[#686868] h-[215px] rounded-[8px] cursor-pointer"
        >
          <input
            name="image"
            {...getInputProps()}
            onChange={onfileChange}
            type="file"
          />
          <label
            className="bg-[#FFFFFF] p-[10px] rounded-[8px] shadow-allShadow"
            htmlFor="file-input"
          >
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drop files here to upload</p>
            )}
          </label>
        </div>
        <div className="text-[red]">
          {formik.touched["image"] && formik.errors["image"]
            ? formik.errors["image"]
            : null}
        </div>
      </div>
      <div className="flex flex-wrap justify-around mt-5 gap-5">
        {selectedImages}
      </div>
      <div className="flex justify-end py-5 px-4">
        <button
          className="bg-[#2266D1] px-5 py-2 rounded-md text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex gap-2 items-center">
              <ClipLoader color="#36d7b7" size={20} />
              <p className="opacity-[0.7]">Submit</p>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default PackageForm;
