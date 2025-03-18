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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    console.log(form);
  };

  return (
    <form
      action="create a product"
      className="text-white z-50 flex flex-col gap-16 bg-neutral-800 p-8 rounded-xl items-center border-2 border-neutral-700"
      onSubmit={handleSubmit}
    >
      <legend>
        <span className="text-3xl font-bold">Crear producto</span>
      </legend>

      <fieldset className="flex flex-col gap-8">
        <label className="flex relative w-fit items-center">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            value={form.name}
            required
            className="flex border-b-2 border-white/55 focus:border-purple-500 outline-0 py-1.5 px-1 transition-all ease-linear duration-150"
          />
        </label>

        <label>
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
            value={form.description}
            required
            className="flex border-b-2 border-white/55 focus:border-purple-500 outline-0 py-1.5 px-1 transition-all ease-linear duration-150"
          />
        </label>

        <label>
          <input
            type="number"
            name="amount"
            placeholder="Cantidad"
            onChange={handleChange}
            value={form.amount}
            required
            className="flex border-b-2 border-white/55 focus:border-purple-500 outline-0 py-1.5 px-1 transition-all ease-linear duration-150"
          />
        </label>
      </fieldset>

      <div className="flex gap-4">
        <button className="flex bg-purple-500 w-fit rounded-full px-4 py-2 hover:scale-110 ease-bounce duration-300 cursor-pointer">
          Crear
        </button>
        <button
          className="flex bg-neutral-600 w-fit rounded-full px-4 py-2 hover:scale-110 ease-bounce duration-300 cursor-pointer"
          onClick={close}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
