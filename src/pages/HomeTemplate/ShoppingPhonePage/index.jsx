import Product from "./product";
import ProductDetails from "./product-details";
import Cart from "./cart";
import { useSelector } from "react-redux";

export default function ShoppingPhonePage() {
  const props = useSelector((state) => state.shoppingPhoneReducer);
  const { data, dataDetails } = props;

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>

      {/* Giỏ hàng */}
      <Cart />

      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        {data.map((item, index) => {
          return <Product key={item.maSP} product={item} />;
        })}
      </div>

      {/* {dataDetails !== null && dataDetails !== undefined && ( */}
      {!!dataDetails && (
        <>
          <h2 className="text-lg font-bold mt-8 mb-4">Thông số kỹ thuật</h2>
          <ProductDetails />
        </>
      )}
    </div>
  );
}
