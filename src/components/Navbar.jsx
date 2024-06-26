import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="sm:myContainer max-h-14 !py-5 flex justify-between items-center">
                <a className="group logo font-bold text-3xl p-2 cursor-pointer" src="#">
                    <span className="text-green-500">
                        &lt;
                    </span>
                    <span className='group-hover:text-green-500'>
                        Pass
                    </span>
                    <span className='group-hover:text-white text-green-500'>
                        OP
                    </span>
                    <span className="text-green-500">
                        /&gt;
                    </span>
                </a>
                <button className="github-logo flex justify-between items-center text-white bg-green-700 rounded-full font-bold text-lg ring-1 ring-emerald-50">
                    <img src="icons/github.svg" alt="GitHub Logo" className='invert w-10' />
                    <span className='px-2'>
                        GitHub
                    </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;