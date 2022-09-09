import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutPage from "../../HOC/Layout";
import { createAction } from "../../stores/actions";
import { actionType } from "../../stores/actions/type";
import "./index.css";

export const Products = () => {
  const [keyword, setKeyword] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const { productList, isEdit, selectedId } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const handleDeleteProduct = (id) => {
    dispatch(createAction(actionType.DELETE_PRODUCT, id));
  };
  const handleIncreaseProduct = (id) => {
    dispatch(createAction(actionType.INCREASE_PRODUCT, id));
  };
  const handleDecreaseProduct = (id) => {
    dispatch(createAction(actionType.DECREASE_PRODUCT, id));
  };
  const handleAddProduct = () => {
    dispatch(createAction(actionType.ADD_PRODUCT));
  };
  const handleEditProduct = (id) => {
    dispatch(createAction(actionType.EDIT_PRODUCT, id));
  };
  const handleChangProduct = (e, field) => {
    dispatch(
      createAction(actionType.CHANGE_PRODUCT, { value: e.target.value, field })
    );
  };

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setKeyword(lowerCase);
  };
  const filteredData = productList.filter((product) => {
    if (keyword === "") {
      return product;
    } else {
      return product.productName.toLowerCase().includes(keyword);
    }
  });

  return (
    <LayoutPage>
      <button onClick={handleAddProduct} className="add_profile">
        Add products
      </button>
      <div className="search">
        <input onChange={inputHandler} type="text" placeholder="Search" />
        <select onChange={(e) => setFilterPrice(e.target.value)} name="" id="">
          <option defaultValue="all">All</option>
          <option value="decreasing">Price(High - Low)</option>
          <option value="increasing">Price(Low - High)</option>
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Option</th>
          </tr>
          {filteredData.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {isEdit && item.id === selectedId ? (
                    <input
                      className={isEdit ? "item_input show" : "item_input"}
                      defaultValue={item.productName}
                      onChange={(e) => handleChangProduct(e, "productName")}
                      type="text"
                    />
                  ) : (
                    item.productName
                  )}
                </td>

                <td>
                  {isEdit && item.id === selectedId ? (
                    <input
                      className={isEdit ? "item_input show" : "item_input"}
                      defaultValue={item.price}
                      onChange={(e) => handleChangProduct(e, "price")}
                      type="text"
                    />
                  ) : (
                    item.price
                  )}
                </td>

                <td
                  className={
                    isEdit && item.id === selectedId ? "btn_quantity" : ""
                  }
                >
                  <button
                    onClick={() => handleDecreaseProduct(item.id)}
                    className="btn_quantity btn_decrease"
                  >
                    -
                  </button>
                  {isEdit && item.id === selectedId ? (
                    <input
                      className={
                        isEdit ? "item_input show input_quantity" : "item_input"
                      }
                      defaultValue={item.quantity}
                      onChange={(e) => handleChangProduct(e, "quantity")}
                      type="text"
                    />
                  ) : (
                    item.quantity
                  )}
                  <button
                    onClick={() => handleIncreaseProduct(item.id)}
                    className="btn_quantity btn_increase"
                  >
                    +
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleEditProduct(item.id)}
                    className="btn_edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="btn_remove"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </LayoutPage>
  );
};
