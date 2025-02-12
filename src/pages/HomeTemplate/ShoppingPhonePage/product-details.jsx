import React from "react";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const product = useSelector(
    (state) => state.shoppingPhoneReducer.dataDetails
  );
  console.log("🔥 ~ ProductDetails ~ product:", product);
  return (
    <div className="flex gap-6">
      <div className="space-y-6">
        <h4 className="text-2xl font-bold">{product.tenSP}</h4>
        <img
          src={product.hinhAnh}
          className="w-full h-[300px]"
          alt="apple-phone"
        />
      </div>
      <div className="space-y-6">
        <h4 className="text-2xl font-bold">Thông số</h4>
        <div className="space-y-8">
          <div className="space-x-24  flex items-center">
            <p>Màn hình</p>
            <p>{product.manHinh}</p>
          </div>

          <div className="space-x-24  flex items-center">
            <p>Hệ điều hành</p>
            <p>{product.heDieuHanh}</p>
          </div>

          <div className="space-x-24  flex items-center">
            <p>Camera trước</p>
            <p>{product.cameraTruoc}</p>
          </div>

          <div className="space-x-24  flex items-center">
            <p>Camera sau</p>
            <p>{product.cameraSau}</p>
          </div>

          <div className="space-x-24  flex items-center">
            <p>RAM</p>
            <p>{product.ram}</p>
          </div>

          <div className="space-x-24  flex items-center">
            <p>ROM</p>
            <p>{product.rom}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
