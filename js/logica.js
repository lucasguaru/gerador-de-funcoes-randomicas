iniciar();

function iniciar() {
    let arrayTeste = [[2, 1], [4, 2], [6, 3], [8, 4], [10, 5]];
    let ia = new IA(1000, 1);
    ia.treinar(arrayTeste);
    ia.print();
    // ia.print1();
}
