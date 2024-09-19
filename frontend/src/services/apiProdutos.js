const BASE_URL_PRODUTOS = 'http://localhost:3000/api'; // Base URL da API de produtos

const ProdutoService = {
    // Lista todos os produtos
    listar: async (token) => {
        const resposta = await fetch(`${BASE_URL_PRODUTOS}/produtos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao listar produtos');
        }
        return await resposta.json();
    },

    // Busca produto por ID
    buscarPorId: async (produtoId, token) => {
        const resposta = await fetch(`${BASE_URL_PRODUTOS}/produto/${produtoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao buscar produto');
        }
        return await resposta.json();
    },

    // Cria um novo produto
    criar: async (formData, token) => {
        console.log('token criar produto', token);
        
        const resposta = await fetch(`${BASE_URL_PRODUTOS}/produtos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // formData inclui 'foto'
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao criar produto');
        }
        return await resposta.json();
    },
    

    // Atualiza um produto existente
    atualizar: async (produtoId, formData, token) => {
        console.log('token atualizar produto', token);
        
        const resposta = await fetch(`${BASE_URL_PRODUTOS}/produto/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // formData inclui 'foto'
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao atualizar produto');
        }
        return await resposta.json();
    },

    // Deleta um produto
    excluir: async (produtoId, token) => {
        const resposta = await fetch(`${BASE_URL_PRODUTOS}/produto/${produtoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao excluir produto');
        }
        return await resposta.json();
    },

    // Lista produtos por usuário
    listarPorUsuario: async (usuarioId, token) => {
        const resposta = await fetch(`${BASE_URL_PRODUTOS}/produtos/usuario/${usuarioId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
        });
        if (!resposta.ok) {
            const errorData = await resposta.json();
            throw new Error(errorData.message || 'Erro ao listar produtos do usuário');
        }
        return await resposta.json();
    },
};

export default ProdutoService;
