"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import "./Login.css"

export default function Login(){

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)

    //Função que faz o envio das informações para o backend e salva o token
    async function handleLogin(e:any) {
        e.preventDefault()

        setLoading(true)

        try{
        const response = await fetch("http://localhost:3000/auth/login", {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email, senha})
        })

         if (!response.ok) {
        throw new Error("Login inválido")
        }

        const data = await response.json()

        console.log(data)

        //Salvar o token
        localStorage.setItem("token", data.access_token)

        //Redireciona pra página de Produtos
        router.push("/Produtos")

        } catch (error) {
            alert("Email ou senha inválidos")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="container">
            <div className="card">
                     
                <Image
                    src={require("../../public/estoque.png")}
                    alt="logotipo"
                    width={250}
                    height={100}
                    className=" block mx-auto mb-4 object-contain"
                />               

                <h2 className="title">
                    Tela de Login
                </h2>

                <form 
                    className="form"
                    onSubmit={handleLogin}
                >
                    
                    <input 
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder="Digite seu email..."
                        className="input"
                    />

                    <input 
                        type="password"
                        value={senha}
                        onChange={(e)=> setSenha(e.target.value)}
                        placeholder="Digite sua senha..."
                        className="input"
                    />

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full
                        bg-blue-600
                        text-white
                        py-2
                        rounded-md
                        flex
                        justify-center
                        items-center
                        gap-2
                        transition
                        disabled:bg-gray-400
                        "
                    >
                    {loading && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    )}

                    {loading ? "Entrando..." : "Entrar"}
                    </button>
                    
                    <button
                    type="button"
                    onClick={() => router.push("/Register")}
                    className="w-full text-blue-600 hover:underline"
                    >
                       Criar uma conta
                    </button>
                </form>
            </div>
        </div>
    )
}