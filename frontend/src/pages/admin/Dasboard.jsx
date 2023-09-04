import React, { useEffect, useState } from "react";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../../../services/axios.service";
import Loading from "../../components/Loading";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductModal from "./forms/ProductModal";
import ReactPaginate from "react-paginate";

import { ToastContainer, toast } from "react-toastify";

const Dasboard = () => {
  const itemsPerPage = 6;

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    productImage: "",
  });
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(false);
  const { jwt } = useSelector((state) => state.auth);

  const [itemOffset, setItemOffset] = useState(0);

  const [products, setProducts] = useState({});
  const [originalProduct, setOriginalProducts] = useState({});

  const [editId, setEditId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  let endOffset;
  let currentItems;

  const getProduct = async () => {
    const response = await getData("product");
    setProducts(response.data);
    paginate(response.data);
    setOriginalProducts(response.data);
  };

  function paginate(items) {
    endOffset = itemOffset + itemsPerPage;

    currentItems = items.results.slice(itemOffset, endOffset);

    let count = Math.ceil(items.results.length / itemsPerPage);

    setPageCount(count);

    setProducts((prev) => {
      return { ...prev, count: currentItems.length, results: currentItems };
    });
  }

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % originalProduct.results.length;

    console.log("newOffset", newOffset);
    setItemOffset(newOffset);
  };
  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteData(`product/${id}`, jwt);
    const filteredProds = products.results.filter((product) => {
      return product._id !== id;
    });
    setProducts((prev) => {
      return { ...prev, count: filteredProds.length, results: filteredProds };
    });
    toast.success("Product Deleted Successfully");
  };
  useEffect(() => {
    if (products.status) {
      const endOffset = itemOffset + itemsPerPage;

      let currItems = originalProduct.results.slice(itemOffset, endOffset);

      setProducts((prev) => {
        return { ...prev, results: currItems, count: currItems.length };
      });
      setPageCount(Math.ceil(originalProduct.results.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);

  const addProductHandler = (e) => {
    e.preventDefault();
    setEdit(false);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      setProduct((prev) => {
        return { ...prev, [e.target.name]: e.target.files[0] };
      });
    } else {
      setProduct((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("productImage", product.productImage);
    formData.append("countInStock", product.countInStock);
    formData.append("description", product.description);
    setLoading(true);

    const response = await postData("product", formData, jwt);

    if (response.status) {
      setProducts((prev) => {
        return { ...prev, results: [...prev.results, response.data] };
      });
      setOpenModal(false);
      setLoading(false);

      toast.success("Successfully Added Product");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    delete product["id"];
    delete product["_id"];
    delete product["createdAt"];
    setLoading(true);

    const response = await updateData(`product/${editId}`, product, jwt);

    if (response.status) {
      setOpenModal(false);
      setLoading(false);
      toast.success("Successfully Edited Product");
      const updateProd = products.results.map((prod) => {
        return prod.id === editId ? response.data : prod;
      });
      setProducts((prev) => {
        return { ...prev, results: updateProd };
      });
    } else {
      toast.error("Can't Edit Product");
    }
  };
  const editHandler = (e, product) => {
    e.preventDefault();
    setEdit(true);
    setOpenModal(true);
    setProduct(product);
    setEditId(product.id);
  };
  useEffect(() => {
    getProduct();
  }, []);
  function returnDate(product) {
    return (
      new Date(product.createdAt).getFullYear() +
      "-" +
      new Date(product.createdAt).getMonth() +
      "-" +
      new Date(product.createdAt).getDate()
    );
  }

  return (
    <>
      {products.status === "success" ? (
        <>
          <Row>
            <Col>
              <h1 className="text-center">Products ({products.count})</h1>
            </Col>
            <Col className="text-right">
              <Button
                className="btn btn-warning"
                onClick={(e) => addProductHandler(e)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Product
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr className="text-center">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.count > 0 ? (
                products.results.map((product) => {
                  return (
                    <tr key={product._id} className="text-center">
                      <td>
                        <img
                          className="rounded"
                          src={product.productImage}
                          alt={product.name}
                          height={0} //height bug
                          width={80}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{product.countInStock}</td>
                      <td>{returnDate(product)}</td>
                      <td>
                        <Button
                          className="btn btn-secondary me-3 mb-2"
                          onClick={(e) => editHandler(e, product)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </Button>
                        <Button
                          className="btn btn-danger  ms-1 mb-2"
                          onClick={(e) => deleteHandler(e, product._id)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <ToastContainer />
          <ProductModal
            openModal={openModal}
            handleClose={handleClose}
            handleChange={handleChange}
            handleAdd={handleAdd}
            loading={loading}
            edit={edit}
            product={product}
            handleEdit={handleEdit}
          />
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dasboard;
