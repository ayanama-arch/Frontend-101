import { useState } from "react";
import {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} from "../store/reducers/productsReducer";

export default function ProductsDemo() {
  const { data: products = [], isLoading: loadingList } = useGetProductsQuery();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: selectedProduct } = useGetProductQuery(selectedId!, {
    skip: selectedId === null,
  });

  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Add product handler
  const handleAdd = async () => {
    await addProduct({
      name: "New Phone",
      price: 599,
      category: "Electronics",
      inStock: true,
      rating: 4.5,
    }).unwrap();
    alert("Product added!");
  };

  // Edit product handler
  const handleEdit = async (id: number) => {
    await editProduct({ id, price: Math.floor(Math.random() * 1000) }).unwrap();
    alert("Product updated!");
  };

  // Delete product handler
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteProduct(id).unwrap();
      alert("Product deleted!");
    }
  };

  if (loadingList) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Products List</h2>
      <button onClick={handleAdd}>➕ Add Product</button>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => setSelectedId(p.id)}>View</button>
            <button onClick={() => handleEdit(p.id)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedId && selectedProduct && (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid gray",
            padding: "1rem",
          }}
        >
          <h3>Selected Product Details</h3>
          <p>
            <strong>ID:</strong> {selectedProduct.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedProduct.name}
          </p>
          <p>
            <strong>Price:</strong> ${selectedProduct.price}
          </p>
          <p>
            <strong>Category:</strong> {selectedProduct.category}
          </p>
          <p>
            <strong>In Stock:</strong> {selectedProduct.inStock ? "Yes" : "No"}
          </p>
          <p>
            <strong>Rating:</strong> {selectedProduct.rating}
          </p>
        </div>
      )}
    </div>
  );
}
