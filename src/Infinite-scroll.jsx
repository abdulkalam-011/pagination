import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);

    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
    );
    const data = await res.json();

    setTotalPages(Math.ceil(data.total / 10));

    if (data && data.products) {
      setProducts((prev) => [...prev, ...data.products]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Intersection Observer to detect last element
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting && !loading) {
        setPage((prev) => (prev < totalPages ? prev + 1 : prev));
      }
    },
    [loading, totalPages]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      <div className="product_container">
        {products.map((product,idx) => (
          <div key={idx} className="product_single">
            <img src={product.thumbnail} alt={product.title} loading="lazy" />
            <span>{product.title}</span>
            <a
              className="download"
              target="blank"
              href={product.thumbnail}
              download={`${product.title}.jpg`}
            >
              Download Image
            </a>
          </div>
        ))}

        {/* Skeleton Loading (10 cards) */}
        {loading &&
          [...Array(10)].map((_, i) => (
            <div key={i} className="skeleton_card">
              <div className="skeleton_img"></div>
              <div className="skeleton_text"></div>
              <div className="skeleton_btn"></div>
            </div>
          ))}
      </div>

      {/* Observer Target */}
      <div ref={loaderRef} style={{ height: "40px" }}></div>
    </>
  );
};

export default InfiniteScroll;
