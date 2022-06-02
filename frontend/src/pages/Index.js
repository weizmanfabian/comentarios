import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import View from '../components/View';
import Form from '../components/Form';
import { getAllCommentarios, getVersion } from '../data/api';
import Footer from '../components/Footer';

const Index = () => {
    const [title, setTitle] = useState('Listado de Comentarios');
    const [data, setData] = useState([]);
    const [form, setForm] = useState(false);
    const [registro, setRegistro] = useState('');
    const [version, setVersion] = useState('');

    useEffect(() => {
        firstAction()
    }, [])

    const firstAction = async () => {
        consultarDatos()
        const { data } = await getVersion()
        setVersion(data)
    }

    const consultarDatos = async () => {
        const { data } = await getAllCommentarios('comentarios')
        const { rows } = await data
        setData(rows)
    }

    const mostrarForm = (msg, register) => {
        setForm(true)
        setTitle(msg)
        setRegistro(register)
    }

    const ocultarForm = () => {
        consultarDatos();
        setTitle('Listado de Comentarios');
        setForm(false)
    }

    return (
        <>
            <Navbar msg={title} />
            <div className="container">
                <div className='row'>
                    <div className='col-md-8'>
                        <View
                            data={data}
                            mostrarForm={mostrarForm}
                            setRegistro={setRegistro}
                            ocultarForm={ocultarForm}
                            setForm={setForm}
                            title={title}
                            setTitle={setTitle}
                        />
                    </div>
                    <div className='col-md-4'>
                        {form && <Form
                            registro={registro}
                            title={title}
                            handleForm={ocultarForm}
                        />}
                    </div>
                </div>
            </div>
            <Footer version={version} />
        </>
    )
}

export default Index;