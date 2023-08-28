import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import Hearder from '../../components/Header';

import api from '../../config/api';

export const ListOnu = () => {

  const [data, setData] = useState([]);
  const { state } = useLocation();
  const [status, setStatus] = useState({
    type: state ? state.type : "",
    message: state ? state.message : ""
  });
  const [id, setId] = useState('')
  const [ip, setIp] = useState('');
  const [telnet_port, setTelnet_port] = useState('');


  const getONUs = async () => {
    await getParams()
    
    function getParams(){
      const url = new URLSearchParams(window.location.search)
      //setId(url.get("id"))
      const id_olt = url.get("id")
      return id_olt
    }
    await api.get("/api-smart/onus/" + getParams())
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
    const url = new URLSearchParams(window.location.search)
    setId(url.get("id"))
    setIp(url.get("ip"))
    setTelnet_port(url.get("telnet_port"))
    
    getONUs()
  }, []);

  return (
    <>
      <div class=" mx-auto h-screen bg-slate-200">
        <Hearder />
        <table class="container w-1/2 mx-auto text-center mt-3" >
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
                  <Link to={"/autorizar-router/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}&ip=${ip}&telnet_port=${telnet_port}&id=${id}`}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="button">Router</button></Link>{" "}
                  <Link to={"/autorizar-bridge/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}&ip=${ip}&telnet_port=${telnet_port}&id=${id}`}><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" type="button">Bridge</button></Link>{" "}
                  <Link to={"/autorizar-phone/?" + `board=${onts.board}&port=${onts.port}&onu=${onts.onu}&sn=${onts.sn}&ip=${ip}&telnet_port=${telnet_port}&id=${id}`}><button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" type="button">PPPoE + VoIP</button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </>
  );

}