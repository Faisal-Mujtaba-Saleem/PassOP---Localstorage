import React, { useEffect, useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const passwordRef = useRef(null);

    const [form, setForm] = useState(
        {
            site: "",
            username: "",
            password: ""
        }
    )
    const [passwordsArray, setPasswordsArray] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('passwords')) {
            setPasswordsArray(
                JSON.parse(
                    localStorage.getItem('passwords')
                )
            )
        } else {
            setPasswordsArray([]);
        }
    }, []);


    const showPassword = (e) => {
        if (e.target.src === `${window.location.origin}/public/icons/visible.svg` || e.target.src === `${window.location.origin}/icons/visible.svg`) {
            e.target.src = `icons/hidden.png`;
            e.target.title = `show password`
            passwordRef.current.type = `text`;
        }
        else {
            e.target.src = `icons/visible.svg`;
            e.target.title = `hide password`;
            passwordRef.current.type = `password`;
        }

    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const savePassword = () => {
        if (form.site.length >= 9 && form.username.length >= 3 && form.password.length >= 3) {
            let passwords = [...passwordsArray, form];
            setPasswordsArray(passwords);
            localStorage.setItem('passwords', JSON.stringify(passwords));
            setForm({
                site: "",
                username: "",
                password: ""
            });
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast('Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const editPassword = (i) => {
        let passwords = [...passwordsArray];
        let passwordToEdit = passwords.splice(i, 1);
        setForm(passwordToEdit[0]);
        setPasswordsArray(passwords);
    }
    const deletePassword = (i) => {
        let passwords = [...passwordsArray];
        let confirm = window.confirm('Are you sure you want to delete this password?');
        if (confirm) {
            passwords.splice(i, 1);
            setPasswordsArray(passwords);
            localStorage.setItem('passwords', JSON.stringify(passwords));
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const copyText = async (text) => {
        await window.navigator.clipboard.writeText(text);
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const maskPassword = (text) => {
        let str = '';
        for (const char of text) {
            str += '*';
        }
        return str;
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="md:myContainer p-4">
                <h1 className='group logo font-bold text-3xl text-center'>
                    <span className="text-green-500">
                        &lt;
                    </span>
                    <span className='group-hover:text-green-500'>
                        Pass
                    </span>
                    <span className='group-hover:text-black text-green-500'>
                        OP
                    </span>
                    <span className="text-green-500">
                        /&gt;
                    </span>
                </h1>
                <p className='text-green-500 text-center text-lg'>Your own Password Manager</p>
                <div className="flex flex-col gap-8 p-4 text-black">
                    <input
                        type="text"
                        placeholder='Enter Website Url'
                        name="site"
                        value={form.site}
                        onChange={handleChange}
                        id="site"
                        className='rounded-full border border-green-500 w-full px-4 py-1' />
                    <div className="flex flex-col md:flex-row w-full md:gap-2 gap-8">
                        <input
                            type="text"
                            placeholder='Enter Username'
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            id="username"
                            className='rounded-full border border-green-500 w-full px-4 py-1' />
                        <div className="group relative">
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder='Enter Password'
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                id="password"
                                className='rounded-full border border-green-500 w-full px-4 py-1' />
                            <img src="icons/visible.svg" alt="eye" title='Show Password' width={20} className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group-hover:animate-pulse' onClick={showPassword} />
                        </div>
                    </div>
                    <button
                        title="Save Password"
                        className='flex items-center justify-center gap-2 w-fit mx-auto rounded-full bg-green-400 hover:bg-green-300 py-2 px-6 font-medium border border-green-900'
                        onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="text-2xl font-bold text-green-500 p-4">
                        Your Passwords
                    </h2>
                    {
                        passwordsArray.length === 0 ?
                            <p className="p-4">No passwords to show</p> :
                            <div className="overflow-x-auto rounded-lg">
                                <table className="w-full table-auto">
                                    <thead className='bg-green-800 text-white'>
                                        <tr className='border border-white'>
                                            <th className='p-2'>Site</th>
                                            <th className='p-2'>Username</th>
                                            <th className='p-2'>Password</th>
                                            <th className='p-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordsArray.map((password, index) => {
                                            return (
                                                <tr className='border border-white text-center' key={index}>
                                                    <td className='p-2 w-1/4'>
                                                        <div className="flex justify-center items-center">
                                                            <a href={password.site} target="_blank" rel="noopener noreferrer">{password.site}</a>
                                                            <div className='lord-icon-copy' onClick={() => {
                                                                copyText(password.site)
                                                            }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{
                                                                        width: "20px",
                                                                        padding: "0.45rem",
                                                                        cursor: "pointer"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='p-2 w-1/4'>
                                                        <div className="flex justify-center items-center">
                                                            {password.username}
                                                            <div className='lord-icon-copy' onClick={() => {
                                                                copyText(password.username)
                                                            }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{
                                                                        width: "20px",
                                                                        padding: "0.45rem",
                                                                        cursor: "pointer"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='p-2 w-1/4'>
                                                        <div className="flex justify-center items-center">
                                                            {
                                                                maskPassword(password.password)
                                                            }
                                                            <div className='lord-icon-copy' onClick={() => {
                                                                copyText(password.password)
                                                            }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{
                                                                        width: "20px",
                                                                        padding: "0.45rem",
                                                                        cursor: "pointer"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='p-2 w-1/4'>
                                                        <div className="flex justify-center items-center gap-2">
                                                            <div className='lord-icon-edit cursor-pointer' onClick={() => editPassword(index)}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                    trigger="hover"
                                                                    style={{
                                                                        width: "25px",
                                                                        height: "25px"
                                                                    }}>
                                                                </lord-icon>
                                                            </div>
                                                            <div className='lord-icon-delete cursor-pointer' onClick={() => deletePassword(index)}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                                    trigger="hover"
                                                                    style={{
                                                                        width: '25px',
                                                                        height: '25px'
                                                                    }}>
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div >
            </div >
        </>
    )
}

export default Manager;