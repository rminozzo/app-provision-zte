import React from "react";
import { Link } from "react-router-dom";

function Header() {

    return (
        <nav class="bg-blue-900 min-w-full px-4 sm:px-4 py-1 mb-2">
            <div class="container min-w-full flex flex-wrap justify-between items-center mx-auto">
                <a class="no-underline hover:no-underline" href="/">
                    <img src="/images/adylnetelecomNovo_branco.png" width="40" height="40" class="mr-7 sm:h-17" alt="Adylnet Logo" />
                </a>
              {/* <Link to={"/search-onu"}> <button class="py-2 pr-4 pl-3 hover:bg-transparent p-1 text-white"> Buscar ONU</button></Link> */ }
            </div>
        </nav>
    )

}

export default Header;