const BASE_URL_USERS = 'http://localhost:3000/api'; // Base URL da API de usuários

const UsuarioService = {
    // Lista todos os usuários
    listar: async (token) => {
        const resposta = await fetch(`${BASE_URL_USERS}/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Autenticação com token
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao buscar usuários');
        }
        return await resposta.json();
    },

    // Busca usuário por ID
    buscarPorId: async (id, token) => {
        const resposta = await fetch(`${BASE_URL_USERS}/usuario/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao buscar usuário');
        }
        return await resposta.json();
    },

    // Cria um novo usuário
    criar: async (formData) => {
        const resposta = await fetch(`${BASE_URL_USERS}/criar`, {
            method: 'POST',
            body: formData, // formData inclui 'foto'
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao criar usuário');
        }
        return await resposta.json();
    },

    // Login do usuário
    login: async (email, senha) => {
        const resposta = await fetch(`${BASE_URL_USERS}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao realizar login');
        }
        return await resposta.json();
    },

    // Atualiza um usuário existente
    atualizar: async (id, formData, token) => {
        const resposta = await fetch(`${BASE_URL_USERS}/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // formData inclui 'foto'
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao atualizar usuário');
        }
        return await resposta.json();
    },

    // Deleta um usuário
    excluir: async (id, token) => {
        const resposta = await fetch(`${BASE_URL_USERS}/usuario/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao excluir usuário');
        }
        return await resposta.json();
    },
};

export default UsuarioService;
