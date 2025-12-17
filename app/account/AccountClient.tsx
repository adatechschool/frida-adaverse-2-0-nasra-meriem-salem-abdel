"use client";

import { useState } from "react";
import { ProductForm } from "@/app/components/ProductForm";
import Link from "next/link";
import Favoris from "@/app/components/favories";

type Category = {
  id: number;
  name: string;
};

type Products = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  isPublished: boolean;
  ownerId: string;
  categoryId: number;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  categoryName: string;
};

export default function AccountClient({
  user,
  categories,
  products,
}: {
  user: any;
  categories: Category[];
  products: Products[];
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="mx-auto w-full max-w-lg px-4 py-8 sm:max-w-2xl sm:px-6 sm:py-12 lg:max-w-4xl lg:px-8">
      <header className="text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Mon compte</h1>
        <p className="mt-2 text-sm text-black sm:text-base">Infos de ton profil et gestion de tes produits.</p>
      </header>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-8 lg:p-10">
        <ul className="space-y-4 text-sm sm:text-base">
          <li className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-medium text-black sm:min-w-28">User ID :</span>
            <span className="break-all rounded-lg bg-gray-50 px-3 py-2 text-black">{user.id}</span>
          </li>

          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-black">Nom :</span>
            <span className="text-black">{user.name}</span>
          </li>

          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-black">Email :</span>
            <span className="text-black">{user.email}</span>
          </li>
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto sm:text-base"
            onClick={() => setShowForm((show) => !show)}
          >
            Ajouter un produit
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Ajouter un produit</h2>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100" aria-label="Fermer">
                ✕
              </button>
            </div>

            <ProductForm categories={categories} />
          </div>
        </div>
      )}

      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">Mes produits</h2>

        {products.length === 0 ? (
          <p className="text-sm text-black">Tu n’as pas encore ajouté de produit.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <Link href={`/products/${product.id}`}>
                  <p className="text-base font-semibold">{product.title}</p>
                  {product.description && <p className="mt-1 text-sm text-black">{product.description}</p>}
                  <p className="mt-2 text-sm font-medium">{(product.priceCents / 100).toFixed(2)} €</p>
                </Link>
              </div>
              <div className="mt-3 text-xs text-black">Catégorie: {product.categoryName}</div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Mes favoris</h2>
        <Favoris />
      </div>
    </section>
  );
}
