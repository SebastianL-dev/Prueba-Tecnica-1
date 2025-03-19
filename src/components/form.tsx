"use client";

import Product from "@/interfaces/product.interface";
import { useState } from "react";

export default function Form({
  close,
  setProduct,
}: {
  close: () => void;
  setProduct: (product: Product) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: 0,
  });
  const [id, setId] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product: Product = {
      code: id,
      ...form,
      date: new Date(),
    };

    setProduct(product);
    setForm({
      name: "",
      description: "",
      amount: 0,
    });
    setId(id + 1);
    close();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      action="create a product"
      className="text-white z-50 flex flex-col gap-12 bg-neutral-900 p-8 rounded-xl items-center border-2 border-neutral-700"
      onSubmit={handleSubmit}
    >
      <legend className="flex flex-col gap-2">
        <span className="text-3xl font-bold">Crear producto</span>
        <p className="text-neutral-400">
          Añade un nuevo producto en tu inventario.
        </p>
      </legend>

      <fieldset className="flex flex-col gap-8 w-full">
        <div className="flex relative w-full flex-col gap-3 text-sm">
          <label className="w-fit" htmlFor="name">
            Nombre del producto{" "}
            <span className="font-semibold text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre del producto"
            onChange={handleChange}
            value={form.name}
            required
            className="flex border px-3 py-2.5 border-white/40 rounded-lg focus:border-purple-500 outline-0 transition-all ease-linear duration-150 w-full"
          />
        </div>

        <div className="flex relative w-full flex-col gap-3 text-sm">
          <label className="w-fit" htmlFor="description">
            Descripción del producto{" "}
            <span className="font-semibold text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Ingrese la descripción del producto"
            onChange={handleChange}
            value={form.description}
            required
            className="flex border min-h-24 placeholder:text-sm px-3 py-2.5 border-white/40 rounded-lg focus:border-purple-500 outline-0 transition-all ease-linear duration-150 w-full resize-none"
          />
        </div>

        <div className="flex relative w-full flex-col gap-3 text-sm">
          <label className="w-fit" htmlFor="amount">
            Cantidad del producto{" "}
            <span className="font-semibold text-red-500">*</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Ingrese la cantidad del producto"
            onChange={handleChange}
            value={form.amount === 0 ? "" : form.amount}
            required
            className="flex border text-sm px-3 py-2.5 border-white/40 rounded-lg focus:border-purple-500 outline-0 transition-all ease-linear duration-150 w-full"
          />
        </div>
      </fieldset>

      <div className="flex gap-4 w-full">
        <button className="flex bg-purple-500 w-full shadow-primary-2 rounded-full px-4 py-2 hover:scale-110 ease-bounce duration-300 cursor-pointer justify-center">
          Crear
        </button>
        <button
          className="flex bg-neutral-600 w-full rounded-full px-4 py-2 hover:scale-110 ease-bounce duration-300 cursor-pointer justify-center shadow-gray"
          onClick={close}
        >
          Cancelar
        </button>
      </div>

      <p className="text-neutral-500 font-normal text-sm">
        Todos los campos son requeridos{" "}
        <span className="font-semibold text-red-500">*</span>
      </p>
    </form>
  );
}
