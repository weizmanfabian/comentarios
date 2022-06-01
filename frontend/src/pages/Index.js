import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import View from '../components/View';
import { getAllCommentarios } from '../data/api';

const Index = () => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        consultarDatos()
    }, [])

    const consultarDatos = async () => {
        const { data } = await getAllCommentarios('comentarios')
        const { rows, msg } = await data
        setMsg(msg)
        setData(rows)
    }

    return (
        <>
            <Navbar msg={title} />
            <div className="container">
                <View data={data} updateTitle={setTitle} msg={msg} />
            </div>
        </>
    )
}

export default Index;