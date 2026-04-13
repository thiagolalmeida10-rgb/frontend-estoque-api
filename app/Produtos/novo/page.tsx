'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NovoProduto(){

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [estoque, setEstoque] = useState<number | string>("")
    const [estoqueMinimo, setEstoqueMinimo] = useState<number | string>("")

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(!token) {
            router.push("/Login")
        }
    }, [])

    async function handleSubmit(e:any) {
        e.preventDefault()

        const produto = {
            nome,
            descricao,
            estoque,
            estoqueMinimo
        }

        await fetch("http://localhost:3000/produto", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(produto)
        })

        alert("Produto cadastrado com sucesso!")
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                
                <h1 className="text-2xl font-bold text-white text-center mb-6">
                    Cadastro de Produtos
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome"
                        onChange={(e)=> setNome(e.target.value)}
                    />

                    <input
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descrição"
                        onChange={(e)=> setDescricao(e.target.value)}
                    />

                    <input
                        type="number"
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Estoque"
                        onChange={(e)=> setEstoque(Number(e.target.value))}
                    />

                    <input
                        type="number"
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Estoque Mínimo"
                        onChange={(e)=> setEstoqueMinimo(Number(e.target.value))}
                    />

                    <button
                        className="mt-2 p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Cadastrar
                    </button>

                </form>
            </div>

        </div>
    )
}