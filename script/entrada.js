const form = document.getElementById('entrada-form');
const origemSelect = document.getElementById('origem');
const feedback = document.getElementById('feedback');

// Carregar origens no dropdown
async function carregarOrigens() {
    const { data, error } = await supabase.from('origens').select('id, nome');
    if (error) {
        feedback.textContent = 'Erro ao carregar origens: ' + error.message;
        return;
    }
    origemSelect.innerHTML = '<option value="">Selecione uma origem</option>';
    data.forEach(origem => {
        const option = document.createElement('option');
        option.value = origem.id;
        option.textContent = origem.nome;
        origemSelect.appendChild(option);
    });
}

// Salvar entrada
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = document.getElementById('data').value;
    const origem_id = document.getElementById('origem').value;
    const valor_faturado = parseFloat(document.getElementById('valor_faturado').value);
    const qtd_viagens = parseInt(document.getElementById('qtd_viagens').value);
    const qtd_quilometros = parseFloat(document.getElementById('qtd_quilometros').value);
    const qtd_horas = document.getElementById('qtd_horas').value + ':00'; // Adiciona segundos

    const { error } = await supabase.from('entradas').insert([{
        data,
        origem_id,
        valor_faturado,
        qtd_viagens,
        qtd_quilometros,
        qtd_horas,
        user_id: supabase.auth.getUser().data.user.id
    }]);

    feedback.textContent = error ? 'Erro: ' + error.message : 'Entrada salva com sucesso!';
});

// Carregar origens ao iniciar
carregarOrigens();