"use client";

import AddButton from "@/components/addButton";
import Form from "@/components/form";
import Header from "@/components/header";
import Product from "@/interfaces/product.interface";
import FormatDate from "@/utils/formatDate";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setproducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const handleDelete = (id: number) => {
    const newProducts = products.filter((product) => product.code !== id);
    setproducts(newProducts);
  };

  const filteredProducts = [...products].sort((a, b) => {
    switch (filter) {
      case "amount":
        return b.amount - a.amount;
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "code":
        return a.code - b.code;
      default:
        return 0;
    }
  });

  return (
    <>
      <Header />
      <main className="mx-8 my-32 grid gap-16">
        <section className="flex flex-col gap-4">
          <h1 className="text-white font-bold text-5xl w-fit">
            Administra tus <span className="text-purple-500">productos</span>!
          </h1>
          <p className="text-white opacity-55 w-fit text-lg">
            Crea productos rápido y de manera sencilla, visualízalos y, si algo
            no te gusta,
            <br /> lo puedes eliminar.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold text-3xl w-fit">Productos</h2>

            <ul className="flex gap-4 text-neutral-400 text-sm font-normal items-center flex-wrap">
              <li>
                <FaFilter className="w-5 h-5 text-neutral-700" />
              </li>
              <li>
                <button
                  className={`flex ${
                    filter === "all"
                      ? "bg-purple-500 shadow-primary-2 text-white"
                      : "bg-neutral-800"
                  } w-fit justify-center rounded-full py-1 px-4 bottom-6 right-6 hover:scale-105 ease-bounce duration-300 cursor-pointer`}
                  onClick={() => setFilter("all")}
                >
                  Todos
                </button>
              </li>
              <li>
                <button
                  className={`flex ${
                    filter === "amount"
                      ? "bg-purple-500 shadow-primary-2 text-white"
                      : "bg-neutral-800"
                  } w-fit justify-center rounded-full py-1 px-4 bottom-6 right-6 hover:scale-105 ease-bounce duration-300 cursor-pointer`}
                  onClick={() => setFilter("amount")}
                >
                  Cantidad
                </button>
              </li>
              <li>
                <button
                  className={`flex ${
                    filter === "date"
                      ? "bg-purple-500 shadow-primary-2 text-white"
                      : "bg-neutral-800"
                  } w-fit justify-center rounded-full py-1 px-4 bottom-6 right-6 hover:scale-105 ease-bounce duration-300 cursor-pointer`}
                  onClick={() => setFilter("date")}
                >
                  Fecha
                </button>
              </li>
              <li>
                <button
                  className={`flex ${
                    filter === "code"
                      ? "bg-purple-500 shadow-primary-2 text-white"
                      : "bg-neutral-800"
                  } w-fit justify-center rounded-full py-1 px-4 bottom-6 right-6 hover:scale-105 ease-bounce duration-300 cursor-pointer`}
                  onClick={() => setFilter("code")}
                >
                  Código
                </button>
              </li>
              <li>
                <button
                  className={`flex ${
                    filter === "name"
                      ? "bg-purple-500 shadow-primary-2 text-white"
                      : "bg-neutral-800"
                  } w-fit justify-center rounded-full py-1 px-4 bottom-6 right-6 hover:scale-105 ease-bounce duration-300 cursor-pointer`}
                  onClick={() => setFilter("name")}
                >
                  Nombre
                </button>
              </li>
            </ul>
          </div>

          {filteredProducts.length != 0 ? (
            <ul className="grid grid-cols-4 gap-6 max-[1500px]:grid-cols-3 max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1">
              {filteredProducts.map((product, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col gap-1 bg-neutral-800/60 p-4 rounded-xl max-w-md w-auto text-white border border-neutral-700 hover:scale-103 transition-all ease-bounce duration-300"
                  >
                    <div className="flex justify-between w-full">
                      <span className="font-bold text-xl">{product.name}</span>
                      <span className="font-bold text-xl text-purple-400">
                        # {product.code}
                      </span>
                    </div>

                    <div className="flex flex-col gap-6 justify-between h-full text-sm">
                      <p className="font-normal text-sm text-white/50">
                        {product.description}
                      </p>

                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <FaRegClock className="w-5 h-5" />
                          <span>{FormatDate(product.date)}</span>
                        </div>

                        <span className="bg-purple-500/20 border border-purple-500 text-purple-100 rounded-full px-4 py-0.5">
                          {product.amount} en stock
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-neutral-700 pt-4">
                      <button
                        className="flex bg-red-500 w-full justify-center rounded-full py-2 bottom-6 right-6 hover:scale-103 ease-bounce duration-300 cursor-pointer"
                        onClick={() => handleDelete(product.code)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-neutral-500 flex">
              No hay ningún producto por aqui, prueba creando alguno!
            </p>
          )}
        </section>

        <AddButton open={() => setIsOpen(true)} />

        <dialog
          className={`bg-transparent w-full h-screen inset-0 items-center justify-center ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <div className="w-full h-screen bg-black/50 backdrop-blur-sm fixed" />

          <Form
            close={() => setIsOpen(false)}
            setProduct={(product) => setproducts([...products, product])}
          />
        </dialog>
      </main>
    </>
  );
}
