'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Produto{
    id: number
    nome: string
    estoque: number
}

export default function Movimentacao(){

    const router = useRouter()

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produtoId, setProdutoId] = useState("")
    const [tipo, setTipo] = useState("ENTRADA")
    const [quantidade, setQuantidade] = useState("")

    //Carregar Produtos Protegidos
    useEffect(() => {
    async function carregarProdutos() {
        const token = localStorage.getItem("token");

        //Se não estiver logado
        if (!token) {
            router.push("/Login");
            return;
        }

        const res = await fetch("http://localhost:3000/produtos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Token inválido / expirado
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/Login");
            return;
        }

        const data = await res.json();
        setProdutos(data);
    }

    carregarProdutos();

}, [router]);

    //Salvar movimentação protegida
    async function SalvarMovimentacao(e:any) {
        e.preventDefault()

        const token = localStorage.getItem("token")

        const res = await fetch("http://localhost:3000/movimentacoes",{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                produtoId: Number(produtoId),
                tipo,
                quantidade: Number(quantidade)
            })
        })

        if(!res.ok){
            const erro = await res.json()
            alert(erro.message || "Erro ao movimentar")
            return
        }

        alert("Movimentação realizada!")

        setQuantidade("")
        setProdutoId("")
    }

    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Movimentar Estoque</h1>

            <form onSubmit={SalvarMovimentacao} className="space-y-4">

                <select
                    value={produtoId}
                    onChange={(e)=> setProdutoId(e.target.value)}
                    className="w-full border border-gray-500 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="" className="text-gray-900">Selecione um produto</option>
                    {produtos.map((produto)=> (
                        <option key={produto.id} value={produto.id} className="text-gray-900">
                            {produto.nome} - Estoque: {produto.estoque}
                        </option>
                    ))}
                </select>

                <select
                    value={tipo}
                    onChange={(e)=> setTipo(e.target.value)}
                    className="w-full border border-gray-500 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="ENTRADA" className="text-gray-900">Entrada</option>
                    <option value="SAIDA" className="text-gray-900">Saída</option>
                </select>

                <input
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e)=> setQuantidade(e.target.value)}
                    className="w-full border border-gray-500 rounded px-3 py-2 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Movimentar
                </button>
            </form>
        </div>
    )
}