export default function Example() {
  const count = 0;

  return (
    <div>
      {/* You expect nothing, but 0 will render */}
      {count && <p>Items in cart</p>}
    </div>
  );
}
