import React, { useState } from 'react';
import User from '../../assets/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export function FormUserSettings() {
    // Usa a URL da imagem importada como valor inicial
    const [imagemUrl, setImagemUrl] = useState(User);

    // Função para lidar com a mudança da imagem
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    setImagemUrl(event.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold">Dados do Usuário</h2>
            <div className='flex lg:flex-row gap-4 justify-between'>
                <div className='flex items-center mt-4'>
                    <button type='button' className='relative'>
                        <img className='rounded-full w-44' src={imagemUrl} alt="Foto do usuário" />
                        <div className="absolute inset-0 flex items-center justify-center bg-orange-100 border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="text-white text-2xl"><FontAwesomeIcon icon={faPen} /></i>
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            className="absolute inset-0 opacity-0"
                            onChange={handleImageChange}
                        />
                    </button>
                </div>
                <form className="flex flex-col gap-4 mt-4 w-full">
                    <label className="flex flex-col">
                        <span>Nome</span>
                        <input
                            type="text"
                            className="border border-gray-300 p-2"
                            value={"Admin"}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span>Email</span>
                        <input
                            type="email"
                            className="border border-gray-300 p-2"
                            value={"admin@cashflow.com"}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
}
