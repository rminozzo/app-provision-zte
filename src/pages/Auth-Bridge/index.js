import React, { useEffect, useState } from "react";
import api from '../../config/api';
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner"
import Header from "../../components/Header";

export const AuthBridge = () => {

    const [slot, setSlot] = useState('');
    const [pon, setPon] = useState('');
    const [onu, setOnu] = useState('');
    const [sn, setSn] = useState('');
    const [nome, setNome] = useState('');
    const [ip, setIp] = useState('');
    const [id, setId] = useState('');
    const [telnet_port, setTelnet_port] = useState('');
    const [vlan_dados, setVlan_dados] = useState('');
    const [vlan_mgmt, setVlan_mgmt] = useState('');

    useEffect(() => {
        const url = new URLSearchParams(window.location.search)
        setSlot(url.get("board"))
        setPon(url.get("port"))
        setOnu(url.get("onu"))
        setSn(url.get("sn"))
        setIp(url.get("ip"))
        setId(url.get("id"))
        setTelnet_port(url.get("telnet_port"))
    }, []);

    const [status, setStatus] = useState({
        type: '',
        message: '',
        loading: false
    });

    const navigate = useNavigate();

    const authOnt = async e => {

        setStatus({
            loading: true
        })

        e.preventDefault();

        await api.post("/api-bridge/auth-bridge", {
            slot, pon, onu, sn, nome, vlan_dados, vlan_mgmt, ip, telnet_port
        })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message,
                    loading: false
                });

            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        message: err.response.data.message,
                        loading: false
                    });
                } else {
                    setStatus({
                        type: 'error',
                        message: "Erro, tente mais tarde!",
                        loading: false
                    });
                }
            });

    }

    const toDash = () => {
        navigate(`/list-onu?id=${id}&ip=${ip}&telnet_port=${telnet_port}`, {
            state: {
                type: "success",
                message: status.message
            }
        })
    }

    //console.log(`SLOT: ${slot} PON: ${pon} ONU: ${onu} SN: ${sn}`);
    return (
        <>
            <div class="mx-auto h-screen bg-slate-300">
                <Header />
                {status.type === 'error' ? alert(status.mensagem) : ""}
                {status.type === 'success' ? toDash() : ""}
                {status.loading === true ? <Spinner /> : ""}

                <form class="w-1/2 mx-auto mt-2" onSubmit={authOnt}>
                    <div class="flex grid gap-2">
                        <div>
                            <label class="block mb-2 text-sm font-bold text-gray-900" >SLOT: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="slot" value={slot} onChange={e => setSlot(e.target.value)} disabled></input>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-bold text-gray-900" >PON: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="pon" value={pon} onChange={e => setPon(e.target.value)} disabled></input>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-bold text-gray-900" >ONU ID: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="onu" value={onu} onChange={e => setOnu(e.target.value)} disabled></input>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-bold text-gray-900" >SN: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="sn" value={sn} onChange={e => setSn(e.target.value)} disabled></input>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-bold text-gray-900" >NOME: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="nome" onChange={e => setNome(e.target.value)} required></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >VLAN GERENCIA: </label>
                            <input class="w-full h-10 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="vlan_mgmt" onChange={e => setVlan_mgmt(e.target.value)} required></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >VLAN DADOS: </label>
                            <input class="w-full h-10 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="vlan_dados" onChange={e => setVlan_dados(e.target.value)} required></input>
                        </div>

                        <button class="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mb-3" type="submit">Provisonar</button>
                    </div>
                </form>
            </div>
        </>
    )
}