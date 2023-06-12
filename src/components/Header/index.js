import React from "react";

function Header() {

    return (
        <nav class="bg-violet-900 min-w-full px-4 sm:px-4 py-1 ">
            <div class="md:container min-w-full flex flex-wrap justify-between items-center mx-auto">
                <a class="no-underline hover:no-underline" href="/">
                    <img src="/images/adylnetelecomNovo_branco.png" width="80" height="80" class="mr-7 sm:h-17" alt="Adylnet Logo" />
                </a>

            </div>
        </nav>
    )

}

export default Header;