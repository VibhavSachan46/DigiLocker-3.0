import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    };
    setFileName(data.name);
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      // Display loading toast
      const toastId = toast.loading("Uploading file, please wait...");

      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `ea4bd3765b970b55e964`,
            pinata_secret_api_key: `b13b1c3636db867321c88ced580e13425ab04ededc53ffbc60b9002826b4dccd`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);

        // Add file hash to the blockchain
        await contract.add(account, ImgHash);

        // Reset file input
        setFileName("No image selected");
        setFile(null);

        // Update the toast to success
        toast.dismiss(toastId);
        toast.success("File uploaded successfully!", { id: toastId });
      } catch (error) {
        // Update the toast to error
        toast.error("Failed to upload file. Please try again.", { id: toastId });
      }
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-gray-800 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
          Upload Your File
        </h2>
        <label
          htmlFor="file-upload"
          className="block text-gray-200 font-medium mb-2"
        >
          Choose an Image
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="file-upload"
            name="data"
            className="hidden"
            onChange={retrieveFile}
            disabled={!account}
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Browse
          </label>
          <span className="text-gray-500 text-sm">{fileName}</span>
        </div>
        <button
          type="submit"
          disabled={!file}
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
