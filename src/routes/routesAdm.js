import { Route, Routes} from "react-router-dom";

import {Dashboard} from '../pages/dashboard';
import { AuthRouter } from '../pages/Auth-router';
import { AuthBridge } from '../pages/Auth-Bridge';
import { AuthPhone } from '../pages/Auth-Phone';

export default function RoutesAdm() {

    return(
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/autorizar-router' element={<AuthRouter />} />
            <Route path='/autorizar-bridge' element={<AuthBridge />} />
            <Route path='/autorizar-phone' element={<AuthPhone />} />
        </Routes>
    )
}