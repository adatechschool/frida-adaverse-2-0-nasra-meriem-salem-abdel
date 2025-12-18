"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { ProductForm } from "@/app/components/ProductForm";
import Link from "next/link";
import { updateName } from "../actions/updateName";
import { updateEmail } from "../actions/updateEmail";
import { deleteProduct } from "../actions/deleteProduct";

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

export default function AccountClient({ user, categories, products }: { user: any; categories: Category[]; products: Products[] }) {
  const [showForm, setShowForm] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [emailState, emailAction] = useActionState(updateEmail, null);

  useEffect(() => {
    if (emailState?.ok === true) setShowEmail(false);
  }, [emailState]);

  return (
    <section className="mx-auto w-full max-w-lg px-4 py-8 sm:max-w-2xl sm:px-6 sm:py-12 lg:max-w-4xl lg:px-8">
      {/* Infos utilisateur */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Mon compte</h1>
        <p className="text-black">Infos de ton profil et gestion de tes produits.</p>
      </header>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-8 lg:p-10">
        <ul className="space-y-4 text-sm sm:text-base">
          {/* Nom */}
          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-black">Nom :</span>
            <span className="text-black">{user.name}</span>
          </li>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto sm:text-base cursor-pointer"
              onClick={() => setShowNameForm((show) => !show)}
            >
              Modifier le nom
            </button>
          </div>
          {showNameForm && (
            <form action={updateName} className="mt-2">
              <input
                name="name"
                type="text"
                defaultValue={user.name}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />
              <button className="mt-2 w-full rounded-xl bg-green-700 px-5 py-3 text-sm font-medium text-white hover:bg-green-800 sm:w-auto sm:text-base cursor-pointer">
                Valider le changement
              </button>
            </form>
          )}

          {/* Email */}
          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mt-4">
            <span className="font-medium text-black">Email :</span>
            <span className="text-black">{user.email}</span>
          </li>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto sm:text-base cursor-pointer"
              onClick={() => setShowEmail((show) => !show)}
            >
              Modifier l'Email
            </button>
          </div>
          {showEmail && (
            <form action={emailAction} className="mt-2">
              <input
                name="email"
                defaultValue={user.email}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />
              {emailState?.ok === false && (
                <p className="mt-2 text-sm text-red-600">{emailState.error}</p>
              )}
              <button className="mt-2 w-full rounded-xl bg-green-700 px-5 py-3 text-sm font-medium text-white hover:bg-green-800 sm:w-auto sm:text-base cursor-pointer">
                Valider le changement
              </button>
            </form>
          )}
        </ul>

        {/* Ajouter produit */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            className="w-full cursor-pointer rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto sm:text-base"
            onClick={() => setShowForm((show) => !show)}
          >
            Ajouter un produit
          </button>
        </div>
      </div>

      {/* Modal ajout produit */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Ajouter un produit</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <ProductForm categories={categories} />

            {/* Liste produits */}
            <div className="mt-6 space-y-4">
              {products.length === 0 ? (
                <p className="text-sm text-black">Tu n’as pas encore ajouté de produit.</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <p className="text-base font-semibold">{product.title}</p>
                        {product.description && (
                          <p className="mt-1 text-sm text-black">{product.description}</p>
                        )}
                        <p className="mt-2 text-sm font-medium">
                          {(product.priceCents / 100).toFixed(2)} €
                        </p>
                      </Link>

                      <form action={deleteProduct} className="ml-auto">
                        <input type="hidden" name="productId" value={product.id} />
                        <button className="bg-red-500 hover:bg-red-700 cursor-pointer px-3 py-2 rounded-xl text-white">
                          Supprimer
                        </button>
                      </form>
                    </div>

                    <div className="mt-3 text-xs text-black">Catégorie: {product.categoryName}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
