import React, { useState } from "react";

import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";

const ExcludedComponent = ({ formik }) => {
  const [items, setItems] = useState([...formik.values.excluded]);
  const [input, setInput] = useState("");

  const addItem = async () => {
    if (!input) {
    } else {
      setItems([...items, input]);
      setInput("");
      await formik.setFieldValue("excluded", [...items, input]);
    }
  };

  const deleteItem = (id) => {
    const updateItems = formik.values.excluded.filter((item, i) => {
      return i !== id;
    });
    formik.setFieldValue("excluded", updateItems);
    setItems(updateItems);
  };

  return (
    <>
      <div className="flex items-center gap-5">
        <div className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 w-full bolder-black px-4 py-2 outline-none rounded-md"
          />
        </div>
        <AiFillPlusCircle
          onClick={addItem}
          className="text-[45px] cursor-pointer"
        />
      </div>
      <div className="mt-5">
        {items.map((item, i) => (
          <div
            className="bg-black flex justify-between items-start gap-5 h-full mb-4 text-lg py-1 px-4 rounded-lg overflow-scroll"
            key={i}
          >
            <div className="flex gap-4">
              <p className="text-white">{i + 1}</p>
              <p className="text-white">{item}</p>
            </div>
            <div className="w-5 h-5 mt-1">
              <AiFillDelete
                onClick={() => deleteItem(i)}
                className="text-[red] text-xl cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExcludedComponent;
