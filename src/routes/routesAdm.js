import { Route, Routes} from "react-router-dom";

import {ListOnu} from '../pages/List-Onu';
import { AuthRouter } from '../pages/Auth-router';
import { AuthBridge } from '../pages/Auth-Bridge';
import { AuthPhone } from '../pages/Auth-Phone';
import { SearchOnu } from '../pages/Search-ONU';
import { AddService } from '../pages/Add-Serice'
import { OLTs } from "../pages/OLTs-List";

export default function RoutesAdm() {

    return(
        <Routes>
            <Route path='/' element={<OLTs/>} />
            <Route path='/list-onu' element={<ListOnu />} />
            <Route path='/autorizar-router' element={<AuthRouter />} />
            <Route path='/autorizar-bridge' element={<AuthBridge />} />
            <Route path='/autorizar-phone' element={<AuthPhone />} />
            <Route path='/search-onu' element={<SearchOnu />} />
            <Route path='/add-service' element={<AddService />} />
            
        </Routes>
    )
}