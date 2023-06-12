import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import  Hearder  from '../../components/Header'

import api from '../../config/api';

export const Dashboard = () => {

  const [data, setData] = useState([]);

  const { state } = useLocation();
  const [status, setStatus] = useState({
    type: state ? state.type : "",
    message: state ? state.message : ""
  });

  const getONUs = async () => {
    await api.get("/api-smart/onus")
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

  useEffect(() => {
    getONUs();

  }, []);

  return (
    <>
      <Hearder/>
      <div class="container mx-auto bg-slate-200">
        
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-1/2 mx-auto text-center m-2" >
              <thead class="border-b bg-gray-600">
                <tr>
                  <th scope="col" class="text-sm text-white font-bold">Slot</th>
                  <th scope="col" class="text-sm text-white font-bold">PON</th>
                  <th scope="col" class="text-sm text-white font-bold">ONU ID</th>
                  <th scope="col" class="text-sm text-white font-bold">SN</th>
                  <th scope="col" class="text-sm text-white font-bold">Autorizar</th>
                </tr>
              </thead>
              <tbody>

                {Array.isArray(data) && data.map(onts => (
                  <tr class="bg-slate-200 border-b border-slate-300" key={onts.id}>
                    <td>{onts.board}</td>
                    <td>{onts.port}</td>
                    <td>{onts.onu}</td>
                    <td>{onts.sn}</td>
                    <td>
                      <Link to={"/autorizar-router/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}`}><button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="button">Router</button></Link>{" "}
                      <Link to={"/autorizar-bridge/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}`}><button  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" type="button">Bridge</button></Link>{" "}
                      <Link to={"/autorizar-phone/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}`}><button  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" type="button">PPPoE + VoIP</button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
    </>
  );

}