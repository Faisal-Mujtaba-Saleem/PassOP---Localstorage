import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-slate-800 text-white w-full'>
            <div className="flex flex-col justify-between items-center py-4">
                <a className="group logo font-bold text-2xl p-2 cursor-pointer" src="#">
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

                <p className="text-center text-sm">
                    &copy; {new Date().getFullYear()} Password Manager. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;