"use client";

import AddButton from "@/components/addButton";
import Form from "@/components/form";
import Product from "@/interfaces/product.interface";
import FormatDate from "@/utils/formatDate";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setproducts] = useState<Product[]>([]);

  return (
    <>
      <main className="mx-8 my-36 grid gap-16">
        <section className="flex flex-col gap-4 w-max">
          <h1 className="text-white font-bold text-5xl w-fit">
            Administra tus <span className="text-purple-500">productos</span>!
          </h1>
          <p className="text-white opacity-55 w-fit text-lg">
            Crea productos rapido y de manera sencilla, visualizalos y si algo
            no te gusta <br /> lo puedes eliminar.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-white font-bold text-3xl w-fit">Productos</h2>

          <ul className="grid grid-cols-4 gap-0 gap-x-6">
            {products.map((product, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-col gap-1 bg-neutral-800 p-4 rounded-xl max-w-md w-auto text-white border border-neutral-700 hover:scale-103 transition-all ease-bounce duration-300"
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
                    <button className="flex bg-red-500 w-full justify-center rounded-full py-2 bottom-6 right-6 hover:scale-103 ease-bounce duration-300 cursor-pointer">
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <AddButton open={() => setIsOpen(true)} />

        <dialog
          className={`bg-transparent w-full h-screen inset-0 items-center justify-center ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <div className="w-full h-screen bg-black opacity-50 backdrop-blur-sm fixed" />

          <Form
            close={() => setIsOpen(false)}
            setProduct={(product) => setproducts([...products, product])}
          />
        </dialog>
      </main>
    </>
  );
}
