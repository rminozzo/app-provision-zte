import React, { useEffect, useState } from "react";
import api from '../../config/api';
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner"
import Header from "../../components/Header";

export const AuthPhone = () => {

    const [slot, setSlot] = useState('');
    const [pon, setPon] = useState('');
    const [onu, setOnu] = useState('');
    const [sn, setSn] = useState('');
    const [nome, setNome] = useState('');
    const [vlan, setVlan] = useState('');
    const [vlanTel, setVlanTel] = useState('');

    useEffect(() => {
        const url = new URLSearchParams(window.location.search)
        setSlot(url.get("board"))
        setPon(url.get("port"))
        setOnu(url.get("onu"))
        setSn(url.get("sn"))
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

        await api.post("/api-phone/auth-phone", {
            slot, pon, onu, sn, nome, vlan, vlanTel
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
        navigate("/", {
            state: {
                type: "success",
                message: status.message
            }
        })
    }

    //console.log(`SLOT: ${slot} PON: ${pon} ONU: ${onu} SN: ${sn}`);
    return (
        <>
        <Header/>
            <div class="w-full mx-auto bg-gray-100">
                {status.type === 'error' ? alert(status.mensagem) : ""}
                {status.type === 'success' ? toDash() : ""}
                {status.loading === true ? <Spinner/> : ""}
                
                    <form class="w-1/2 mx-auto m-1" onSubmit={authOnt}>
                    <div class="flex grid gap-2">
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >SLOT: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="slot" value={slot} onChange={e => setSlot(e.target.value)} disabled></input>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >PON: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="pon" value={pon} onChange={e => setPon(e.target.value)} disabled></input>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >ONU ID: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="onu" value={onu} onChange={e => setOnu(e.target.value)} disabled></input>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >SN: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="sn" value={sn} onChange={e => setSn(e.target.value)} disabled></input>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >NOME: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="nome" onChange={e => setNome(e.target.value)} required></input>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >VLAN PPPoE: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="vlan" onChange={e => setVlan(e.target.value)} required></input>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-2 text-sm font-bold text-gray-900" >VLAN VoIP: </label>
                            <input class="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="vlanTel" onChange={e => setVlanTel(e.target.value)} required></input>
                        </div>
                        

                        <button  class="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mb-3" type="submit">Provisonar</button>
                        </div>
                    </form>
            </div>
        </>
    )
}