'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar(){

    const router = useRouter()
    function handleLogout(){
        //Remove token
        localStorage.removeItem("token")

        //Volta pro login
        router.push("/Login")
    }
    return(
        <nav style={{
            backgroundColor:"black",
            color:'white',
            padding:'20px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
            }}>

            <div>
            <Link href="/Produtos" style={{marginRight:'20px'}} >Produtos</Link>
            <Link href="/Produtos/novo" style={{marginRight:'20px'}} >Novo Produto</Link>
            <Link href="/Movimentacao" style={{marginRight:'20px'}} >Movimentação</Link>
            <Link href="/Sobre" style={{marginRight:'20px'}} >Sobre</Link>
            </div>

            <button 
                onClick={handleLogout}
                style={{
                    backgroundColor:'red',
                    color:'white',
                    border:'none',
                    padding:'8px 15px',
                    cursor:'pointer'
                }}
            >
                Logout
            </button>
        </nav>
    )
}