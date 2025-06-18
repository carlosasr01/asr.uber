const form = document.getElementById('origem-form');
const origensList = document.getElementById('origens-list');
const feedback = document.getElementById('feedback');

// Carregar origens
async function carregarOrigens() {
    const { data, error } = await supabase.from('origens').select('id, nome');
    if (error) {
        feedback.textContent = 'Erro ao carregar origens: ' + error.message;
        return;
    }
    origensList.innerHTML = '';
    data.forEach(origem => {
        const li = document.createElement('li');
        li.textContent = origem.nome;
        origensList.appendChild(li);
    });
}

// Adicionar origem
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const { error } = await supabase.from('origens').insert([{ nome }]);
    feedback.textContent = error ? 'Erro: ' + error.message : 'Origem adicionada com sucesso!';
    document.getElementById('nome').value = '';
    carregarOrigens();
});

// Carregar origens ao iniciar
carregarOrigens();