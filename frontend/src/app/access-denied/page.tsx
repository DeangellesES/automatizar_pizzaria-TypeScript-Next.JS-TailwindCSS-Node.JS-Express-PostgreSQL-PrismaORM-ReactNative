import Link from "next/link";
import { logoutAction } from "@/actions/auth";

export default function AccessDenied() {
    return (
        <main className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md rounded-lg border border-app-border bg-app-card p-6 text-center text-white space-y-4">
                <h1 className="text-2xl font-bold">Voce nao tem permissao</h1>
                <p className="text-sm text-gray-300">
                    Esta conta nao possui acesso ao dashboard administrativo.
                </p>

                <div className="flex flex-col gap-2">
                    <Link
                        href="/login"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-brand-primary px-4 text-sm font-medium text-white"
                    >
                        Ir para login
                    </Link>

                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-app-border px-4 text-sm font-medium text-gray-200"
                        >
                            Sair desta conta
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}