import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import  Hearder  from '../../components/Header';

import api from '../../config/api';


export const OLTs = () => {

    const [data, setData] = useState([]);
    const { state } = useLocation();
    const [status, setStatus] = useState({
        type: state ? state.type : "",
        message: state ? state.message : ""
      });

    const getOLTs = async () => {
        await api.get("/api-list/olts")
            .then((response) => {
                setData(response.data.response)
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
    useEffect(() =>{
        getOLTs();
    })

    return (
        <>
        <div class=" mx-auto h-screen bg-slate-200">
          <Hearder/>     
                <table class="container w-1/2 mx-auto text-center mt-3" >
                  <thead class="border-b bg-gray-600">
                    <tr>
                      <th scope="col" class="text-sm text-white font-bold">ID</th>
                      <th scope="col" class="text-sm text-white font-bold">NOME</th>
                      <th scope="col" class="text-sm text-white font-bold">MODELO</th>
                      <th scope="col" class="text-sm text-white font-bold">LISTAR</th>

                    </tr>
                  </thead>
                  <tbody>
    
                    {Array.isArray(data) && data.map(olts => (
                      <tr class="bg-slate-200 border-b border-slate-300" key={olts.id}>
                        <td>{olts.id}</td>
                        <td>{olts.name}</td>
                        <td>{olts.olt_hardware_version}</td>
                        <td>
                          {/*<Link to={"/autorizar-router/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}`}><button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="button">Router</button></Link>{" "}
                          <Link to={"/autorizar-bridge/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}`}><button  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" type="button">Bridge</button></Link>{" "}
                          <Link to={"/autorizar-phone/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}`}><button  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" type="button">PPPoE + VoIP</button></Link>
                    */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
            
          </div>
        </>
    )
}