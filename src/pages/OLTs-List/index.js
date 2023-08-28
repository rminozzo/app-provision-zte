import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Hearder from '../../components/Header';

import api from '../../config/api';


export const OLTs = () => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([])
  const { state } = useLocation();
  const [status, setStatus] = useState({
    type: state ? state.type : "",
    message: state ? state.message : ""
  });

  const getOLTs = async () => {
    await api.get("/api-list/olts")
      .then((response) => {
        setData(response.data.response)
        //console.log(response.data.response)
      }).catch((err) => {
        if (err.response) {
          setStatus({
            type: 'error',
            message: err.response.data.message
          });
        } else {
          setStatus({
            type: 'error',
            message: "Erro, tente novamente"
          });
        }
      });

  }

  const lowerSearch = search.toLowerCase()

  const getPesq = (e) => {
    e.preventDefault();
    const result = data.filter((item) => 
    item.name.toLowerCase().includes(lowerSearch))
    setFiltered(result)
    console.log(result)
  }

  
  useEffect(() => {
    getOLTs();
   
  }, [])

  return (
    <>
      <div class=" mx-auto h-screen bg-slate-200">
        <Hearder />
        <div class="w-1/2 mx-auto">
          <h1 class="mb-2 text-lg font-semibold text-gray-900 ">Buscar OLT</h1>

          <form class="mt-3" onSubmit={getPesq}>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" value={search} class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 " name="pesq"  onChange={(e) => setSearch(e.target.value)} placeholder="Digite o Nome" required></input>
              <button type="submit" class="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 ">Buscar</button>
            </div>
          </form>

          <table class="container mx-auto text-center mt-3" >
            <thead class="border-b bg-gray-600">
              <tr>
                <th scope="col" class="text-sm text-white font-bold">ID</th>
                <th scope="col" class="text-sm text-white font-bold">NOME</th>
                <th scope="col" class="text-sm text-white font-bold">MODELO</th>
                <th scope="col" class="text-sm text-white font-bold">AÇÃO</th>

              </tr>
            </thead>
            <tbody>

              {Array.isArray(filtered) && filtered.map(olts => (
                <tr class="bg-slate-200 border-b border-slate-300" key={olts.id}>
                  <td>{olts.id}</td>
                  <td>{olts.name}</td>
                  <td>{olts.olt_hardware_version}</td>
                  <td>
                    <Link  to={"/list-onu?" + `id=${olts.id}&ip=${olts.ip}&telnet_port=${olts.telnet_port}`}> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="button">Listar ONUs</button></Link>{" "}
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}