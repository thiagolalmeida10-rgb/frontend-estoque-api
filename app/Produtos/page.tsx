"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Produto {
  id: number
  nome: string
  descricao: string
  estoque: number
  estoqueMinimo: number
}

export default function Produtos() {

  const router = useRouter()
  const [produtos, setProdutos] = useState<Produto[]>([])

  // 🔐 Carrega produtos ao montar componente
  useEffect(() => {
    async function fetchProdutos() {

      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/Login")
        return
      }

      const res = await fetch('http://localhost:3000/produtos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        localStorage.removeItem("token")
        router.push("/Login")
        return
      }

      const data = await res.json()

      // garante que sempre seja array
      setProdutos(Array.isArray(data) ? data : data.produtos || [])
    }

    fetchProdutos()
  }, [router])

  // 🗑️ Excluir produto
  async function excluirProduto(id: number) {
    const confirmacao = confirm("Tem certeza que deseja excluir esse produto?")
    if (!confirmacao) return

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/Login")
      return
    }

    const res = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 401) {
      localStorage.removeItem("token")
      router.push("/Login")
      return
    }

    if (!res.ok) {
      const erro = await res.json()
      alert(erro.message || "Erro ao excluir")
      return
    }

    // remove da tela sem reload
    setProdutos((prev) => prev.filter((p) => p.id !== id))
    alert("Produto excluído com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Produtos
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {produtos.map((prod) => (
          <div
            key={prod.id}
            className="bg-gray-800 text-white rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-100">{prod.nome}</h2>
              <p className="text-gray-400 mt-2 text-sm">{prod.descricao}</p>

              <div className="mt-4 flex justify-between items-center">

                <span className={`font-bold ${prod.estoque < prod.estoqueMinimo ? 'text-red-500' : 'text-green-400'}`}>
                  Estoque: {prod.estoque}
                </span>
                <span className="text-sm text-red-500"> Mín: {prod.estoqueMinimo}</span>
              </div>
            </div>

            <button
              onClick={() => excluirProduto(prod.id)}
              className="mt-5 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}