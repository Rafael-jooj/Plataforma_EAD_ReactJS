import { gql, useMutation } from "@apollo/client"
import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Logo } from "../components/Logo"

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber($name: String!, $email: String!) {
  createSubscriber(data: {name: $name, email: $email}) {
    id
  }
}
`

export function Home(){
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, {loading}] = useMutation(CREATE_SUBSCRIBER_MUTATION)

    async function handleSubscribe(event: FormEvent){
        event?.preventDefault()

        await createSubscriber({
            variables:{
                name,
                email,
            }
        })

        navigate('/event')
    }

    return(
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="flex items-center w-full max-w-[1100px] justify-between mt-20 mx-auto">
                <div className="max-w-[640px] flex flex-col">
                    <Logo/>
                    <h1 className="text-[40px] mt-10 leading-tight">
                        Minha plataforma <strong className="text-blue-500">EAD completa</strong>, Feita do zero, com <strong className="text-blue-500">React JS</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Uma plataforma de aulas/eventos online criada utilizando ReactJS e GraphQL
                    </p>
                </div>

                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input 
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text" 
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />
                        <input 
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email" 
                            placeholder="Digite seu email" 
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 uppercase py-4 font-bold text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            ENTRAR NA PLATAFORMA
                        </button>
                    </form>
                </div>
            </div>
            
            <img src="/src/assets/mockup2.png" alt="code" className="mt-20 mb-10" width={720} height={500}/>
        </div>
    )
}