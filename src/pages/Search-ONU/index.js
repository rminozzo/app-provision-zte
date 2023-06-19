import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import Spinner from "../../components/Spinner"
import api from '../../config/api';

export const SearchOnu = () => {

    const [data, setData] = useState([]);
    const [pesq, setPesq] = useState('');
    const { state } = useLocation();
    const [status, setStatus] = useState({
        type: state ? state.type : "",
        message: state ? state.message : "",
        loading: false
    });

    const getOnu = async e => {
        e.preventDefault();
        setStatus({
            loading: true
        });
        await api.get("/api-smart/search-onu/" + pesq)
        
            .then((response) => {
                setStatus({
                    loading: false
                })
                if(response.data.onus[0] === undefined){
                    alert("Nada Encontrado")
                    document.getElementById("list").style.display = 'none'
                }else{
                    setData(response.data.onus[0])
                    document.getElementById("list").style.display = 'block'
                    
                }
               
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        message: "Nada Encontrado",
                        loading: false
                    })
                } else {
                    setStatus({
                        type: 'error',
                        message: "Erro, tente mais tarde",
                        loading: false
                    })
                }
            });
    }


    return (
        <>
            <div class="mx-auto h-screen bg-slate-300">
                <Header />
                {/*status.type === 'error' ? alert(status.message) : ""*/}
                {status.loading === true ? <Spinner /> : ""}
                <div class="w-1/2 mx-auto">
                    <h1 class="mb-2 text-lg font-semibold text-gray-900 ">Busca ONU por SN</h1>
                    <form class="mt-3" onSubmit={getOnu}>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 " name="pesq" onChange={e => setPesq(e.target.value)} placeholder="Digite o SN" required></input>
                            <button type="submit" class="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 ">Buscar</button>
                        </div>
                    </form>

                    <div id="list" style={{display: "none"}} class="mt-10 text-center">
                        <hr />
                        <h2  class="mb-1 text-lg font-semibold text-gray-900" >Detalhes ONU</h2>
                        <ul  class=" space-y-1 text-gray-700">
                            <li>
                                <span class="font-semibold text-gray-900 ">OLT: </span> {data.olt_name}
                            </li>
                            <li>
                                <span class="font-semibold text-gray-900 ">NOME: </span> {data.name}
                            </li>
                            <li>
                                <span class="font-semibold text-gray-900 ">SLOT: </span> {data.board}
                            </li>
                            <li>
                                <span class="font-semibold text-gray-900 ">PON: </span> {data.port}
                            </li>
                            <li>
                                <span class="font-semibold text-gray-900 ">ONU ID: </span> {data.onu}
                            </li>
                            <li>
                                <span class="font-semibold text-gray-900 ">MODE: </span> {data.mode}
                            </li>
                            <li>
                                <span class="font-semibold text-gray-900 ">VLAN: </span> {data.vlan}
                            </li>
                        </ul>

                        <Link to={"/add-service/?" + `board=${data.board}&port=${data.port}&onu=${data.onu}&sn=${data.sn}&name=${data.name}`}><button class="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded m-3" type="submit">Add Serviço</button></Link>

                    </div>
                </div>

            </div>
        </>
    )

}