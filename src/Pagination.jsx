import React, { useEffect, useState } from "react";
import "./App.css";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    setTotalPages(data.total);
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const paginationHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  const onPrevClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    } else {
      setPage(Math.ceil(products.length / 10));
    }
  };
  const onNextClick = () => {
    if (page < totalPages / 10) {
      setPage((prev) => prev + 1);
    } else {
      setPage(1);
    }
  };


  // UI
  return (
    <>
      <div className="product_container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product_single">
              <img src={product.thumbnail} alt={product.title} loading="lazy"/>
              <span>{product.title} </span>
              <a
                className="download"
                target="blank"
                href={product.thumbnail}
                download={`${product.title}.jpg`}
              >
                Download Image
              </a>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {products.length > 0 && (
        <div className="pagination">
          <span
            className={`page-number ${page === 1 ? "hidden" : ""}`}
            onClick={() => onPrevClick()}
          >
            ⬅️
          </span>

          {[...Array(Math.ceil(totalPages / 10))].map((_, index) => (
            <span
              className={`page-number ${
                page === index + 1 ? "selected_page" : ""
              }`}
              key={index}
              onClick={() => paginationHandler(index + 1)}
            >
              {index + 1}
            </span>
          ))}

          <span
            className={`page-number ${page > totalPages / 10 ? "hidden" : ""}`}
            onClick={() => onNextClick()}
          >
            ➡️ 
          </span>
        </div>
      )}
    </>
  );
};

export default Pagination;
