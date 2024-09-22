import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from 'react-bootstrap/Form';
import UsuarioService from '../services/apiUsuarios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const ProfilePage = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [imagemPerfil, setImagemPerfil] = useState(null); // Estado para armazenar a imagem

    useEffect(() => {
        const fetchUsuario = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('ID do usuário não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const data = await UsuarioService.buscarPorId(userId, token);
                setUsuario(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const formData = new FormData();
        formData.append('nome', usuario.nome);
        formData.append('email', usuario.email);
        
        // Só adiciona a senha se não estiver vazia ou for '*******'
        if (usuario.senha && usuario.senha !== '*******') {
            formData.append('senha', usuario.senha);
        }

        // Se uma nova imagem foi selecionada, adiciona ao FormData
        if (imagemPerfil) {
            formData.append('imagem', imagemPerfil);
        }

        try {
            await UsuarioService.atualizar(userId, formData, token);
            alert('Dados atualizados com sucesso!');
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    return (
        <div>
            <Header />
            <h1>Perfil do Usuário</h1>
            {usuario && (
                <Form onSubmit={handleSubmit}>
                    <img
                        src={usuario.imagem}
                        alt="Profile"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            value={usuario.nome}
                            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={usuario.email}
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSenha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="Senha"
                            value={'******'} // Mantém a senha atual
                            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImagem">
                        <Form.Label>Imagem de Perfil</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImagemPerfil(e.target.files[0])} // Captura a imagem selecionada
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>
            )}
            <Footer />
        </div>
    );
};

export default ProfilePage;