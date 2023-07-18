import { Route, Routes} from "react-router-dom";

import {Dashboard} from '../pages/dashboard';
import { AuthRouter } from '../pages/Auth-router';
import { AuthBridge } from '../pages/Auth-Bridge';
import { AuthPhone } from '../pages/Auth-Phone';
import { SearchOnu } from '../pages/Search-ONU';
import { AddService } from '../pages/Add-Serice'
import { OLTs } from "../pages/OLTs-List";

export default function RoutesAdm() {

    return(
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/autorizar-router' element={<AuthRouter />} />
            <Route path='/autorizar-bridge' element={<AuthBridge />} />
            <Route path='/autorizar-phone' element={<AuthPhone />} />
            <Route path='/search-onu' element={<SearchOnu />} />
            <Route path='/add-service' element={<AddService />} />
            <Route path='/list-olt' element={<OLTs/>} />
        </Routes>
    )
}