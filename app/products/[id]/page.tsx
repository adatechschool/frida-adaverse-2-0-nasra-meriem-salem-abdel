import { auth } from "@/lib/auth";
import { headers } from "next/headers"
import { getProductsById, getComment} from "@/lib/queries";
import  CommentsForm  from "@/app/components/CommentsForm";
import CommentsProduct from "@/app/components/CommentsProduct";





type ProductPageParams = {
  id: number;
};

interface ProductsPageProps {
  params: Promise<ProductPageParams>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
   
  const { id } = await params;
  const product = await getProductsById(id);
  const comments = await getComment(id);
  if (!product) {
    return (
      <h1 className="text-center text-xl font-semibold">AUCUN PRODUIT SORRYYYYYY</h1>
    );
  }
 const session = await auth.api.getSession({
  headers: await headers(),
});

const connectedUserId = session?.user?.id ?? null;


  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <p className="mb-2 text-lg font-semibold">
        {product.description}
      </p>
      <p className="mb-1 text-lg font-semibold">
        Prix :{product.priceCents / 100}
      </p>
      <p className="text-lg font-semibold">
        Vendeur : {product.ownerId}
      </p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Commentaires</h2>
        <CommentsForm productId={id}/>
      
        {comments.length === 0 &&(
          <p>Aucun commentaire pour ce produit</p>
        )}
        {comments.map((comment) => (
  <div
    key={comment.id}
    className="mb-4 rounded border p-3"
  >
    <small className="mb-1">{comment.authorName}</small>

    <p className="mb-1">{comment.content}</p>

    <small className="text-gray-500 block">
      Posté le {new Date(comment.createdAt).toLocaleDateString()}
    </small>

    <CommentsProduct
      commentId={comment.id}
      commentContent={comment.content}
      authorId={comment.authorId}
      connectedUserId={connectedUserId}
    />
  </div>
))}
      </section>
    </main>
  );
}
