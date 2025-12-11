import Link from "next/link"




export const Header = () => {
    return (
        <header className="flex flex-col items-center gap-4 mb-10   border-b border-zinc-600 px-4 py-4 md:flex-row md:items-center md:px-10">
            <Link href={"/"} 
            className=" m-10 text-3xl font-semibold">
            AdaMarketPlace
            </Link>
            <div className="flex gap-4 md:ml-auto md:gap-8">
                <Link href={"/auth/sign-up"}
                className="font-semibold">
                S'inscrire
                </Link>
                <Link href={"/auth/sign-in"}
                className="font-semibold">
                Se connecter
                </Link>
            </div>
        </header>
    )
}