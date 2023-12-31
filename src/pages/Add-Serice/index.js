import React, { useEffect, useState } from "react";
import api from '../../config/api';
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner"
import Header from "../../components/Header";

export const AddService = () => {

    const [slot, setSlot] = useState('');
    const [pon, setPon] = useState('');
    const [onu, setOnu] = useState('');
    const [sn, setSn] = useState('');
    const [nome, setNome] = useState('');
    const [vlan, setVlan] = useState('');

    useEffect(() => {
        const url = new URLSearchParams(window.location.search)
        setSlot(url.get("board"))
        setPon(url.get("port"))
        setOnu(url.get("onu"))
        setOnu(url.get("onu"))
        setNome(url.get("name"))
        setSn(url.get("sn"))
    }, []);

    const [status, setStatus] = useState({
        type: '',
        message: '',
        loading: false
    });

    const navigate = useNavigate();

    const addService = async e => {

        setStatus({
            loading: true
        })

        e.preventDefault();

        await api.post("/api-add/add-service", {
            slot, pon, onu, nome, vlan
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

    const toSearch = () => {
        navigate("/search-onu", {
            state: {
                type: "success",
                message: status.message
            }
        })
    }

    return (
        <>
            <div class="mx-auto h-screen bg-slate-300">
                <Header />
                {status.type === 'error' ? alert(status.message) : ""}
                {status.type === 'success' ? toSearch() : ""}
                {status.loading === true ? <Spinner /> : ""}
                <form class="w-1/2 mx-auto mt-2" onSubmit={addService}>
                    <div class="flex grid gap-2">
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >SLOT: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="slot" value={slot} onChange={e => setSlot(e.target.value)} disabled></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >PON: </label>
                            <input class="w-full h-10 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="pon" value={pon} onChange={e => setPon(e.target.value)} disabled></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >ONU ID: </label>
                            <input class="w-full h-10 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="onu" value={onu} onChange={e => setOnu(e.target.value)} disabled></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >SN: </label>
                            <input class="w-full h-10 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="sn" value={sn} onChange={e => setSn(e.target.value)} disabled></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >NOME: </label>
                            <input class="w-full h-10 px-4 mb-1 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name={"nome"} value={nome} onChange={e => setNome(e.target.value)} required></input>
                        </div>
                        <div >
                            <label class="block mb-2 text-sm font-bold text-gray-900" >VLAN: </label>
                            <input class="w-full h-10 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="vlan" onChange={e => setVlan(e.target.value)} required></input>
                        </div>
                        <button class="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mb-3" type="submit">Add Vlan</button>
                    </div>
                </form>
            </div>
        </>
    )
}