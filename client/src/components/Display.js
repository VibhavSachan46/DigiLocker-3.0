import React, { useState } from 'react';
import { toast } from "react-hot-toast"

const Display = ({ contract, account }) => {
  const [data, setData] = useState(null);

  const getData = async () => {
    let dataArray;
    try {
      dataArray = await contract.display(account);
      console.log(dataArray);
    } catch (error) {
      alert(error);
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const images = dataArray.map((item, i) => (
        <div>
          <a href={item} key={`a-${i}`} target="_blank" rel="noopener noreferrer">
          <img
            key={`img-${i}`}
            src={item}
            alt="new"
            className="h-64 w-64 object-cover rounded-xl"
          />
        </a>
        </div>
      ));
      console.log('images are', images);
      setData(images);
      toast.success('Data fetched successfully');
    } else {
      toast.error('No images to display');
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <button
        className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        onClick={getData}
      >
        Get Data
      </button>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {data}
      </div>
    </div>
  );
};

export default Display;
