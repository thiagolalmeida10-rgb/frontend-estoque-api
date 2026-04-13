"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const router = useRouter()

  //Função para submeter o formulário
  async function handleSubmit(e: any) {
    e.preventDefault()

    const usuario = {
      email,
      senha,
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      })

      const data = await response.json()
      if (!response.ok) return
      alert("Usuario cadastrado!")
      setEmail("")
      setSenha("")
      router.push("/Login")

    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 p-8 rounded-2xl shadow-md w-full max-w-md space-y-6 "
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Criar Conta
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 text-gray-600 border rounded-lg"
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full px-4 py-2 text-gray-600 border rounded-lg"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Cadastrar
        </button>
      </form>
    </div>
  )
}