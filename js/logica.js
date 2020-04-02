// iniciar();

function iniciar() {
    // let arrayTeste = [[2, 1], [4, 2], [6, 3], [8, 4], [10, 5]];
    let arrayTeste = [];
    $('input').value.split('\n').forEach(ar => arrayTeste.push(ar.split(' ')));

    // let ia = new IA(10000, 10);
    let ia = new IA($('qtdeInteracoes').value, $('qtdeFuncoes').value);
    ia.treinar(arrayTeste);
    let output = ia.gerarOutput();
    $('output').value = output;
    // ia.print();
    $('btnCalcular').value = "Calcular";
}

function calcular() {
    $('btnCalcular').value = "Calculando...";
    setTimeout(iniciar, 100);
}

function $(el) {
    return document.getElementById(el);
}
