document.addEventListener('DOMContentLoaded', function() {
    const tipoServico = document.getElementById('tipoServico');
    const locucaoOptions = document.getElementById('locucaoOptions');
    const orcamentoForm = document.getElementById('orcamentoForm');
    const orcamentoResult = document.getElementById('orcamentoResult');

    // Mostrar/ocultar opções de locução
    tipoServico.addEventListener('change', function() {
        if (this.value === 'locucao') {
            locucaoOptions.style.display = 'block';
        } else {
            locucaoOptions.style.display = 'none';
        }
    });

    // Cálculo do orçamento
    orcamentoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const precos = {
            locucao: {
                comercial: 200,
                institucional: 150,
                audiobook: 100
            },
            traducao: 0.15,
            localizacao: 0.20
        };

        const resultado = calcularOrcamento(precos);

        const resultContent = orcamentoResult.querySelector('.result-content');
        resultContent.innerHTML = `
            <p>Valor estimado: R$ ${resultado.toFixed(2)}</p>
            <p><small>*Este é um valor aproximado. Entre em contato para um orçamento detalhado.</small></p>
        `;
    });

    function calcularOrcamento(precos) {
        // Implementar lógica real de cálculo aqui
        return 500;
    }
});
