
class IA {
    constructor(qtdeExperimentos, qtdeMaxFuncoesPorExperimentos) {
        this.qtdeExperimentos = qtdeExperimentos;
        this.qtdeMaxFuncoesPorExperimentos = qtdeMaxFuncoesPorExperimentos + 1;
        this.arrFuncaoRandomica = [];
        for (let i = 0; i < qtdeExperimentos; i++) {
            this.arrFuncaoRandomica.push(new FuncaoRandomica(this.qtdeMaxFuncoesPorExperimentos));
        }
        let fnCheck = new FuncaoRandomica(this.qtdeMaxFuncoesPorExperimentos);
        fnCheck.setCheck();
        // this.arrFuncaoRandomica.push(fnCheck);
    }

    treinar(arrayTeste) {
        this.arrFuncaoRandomicaFiltrada = this.arrFuncaoRandomica;
        arrayTeste.forEach(ar => {
            this.arrFuncaoRandomicaFiltrada = this.arrFuncaoRandomicaFiltrada.filter((elemFn, index, arr) => {
                let result = elemFn.calcular(ar[0]);
                return result == ar[1];
            });
            // this.print();
        });
    }

    print() {
        this.arrFuncaoRandomicaFiltrada.forEach(elemFn => elemFn.print());
    }

    print1() {
        this.arrFuncaoRandomica
            .filter(elemFn => elemFn.arrayFn.length == 1)
            .filter(elemFn => elemFn.arrayValores[0] == 2)
            .filter(elemFn => elemFn.arrayFn[0].nome == "/")
            .forEach(elemFn => elemFn.print());
    }
}

class FuncaoRandomica {

    constructor(qtdeMax) {
        this.qtdeMax = qtdeMax;
        let funcoes = [
            {
                nome: "+",
                exec: function(a, b) {
                    return a + b;
                }
            }, {
                nome: "-",
                exec: function(a, b) {
                    return a - b;
                }
            }, {
                nome: "*",
                exec: function(a, b) {
                    return a * b;
                }
            }, {
                nome: "/",
                exec: function(a, b) {
                    return a / b;
                }
            }, {
                nome: "**",
                exec: function(a, b) {
                    return a ** b;
                }
            }, {
                nome: "√",
                exec: function(a, b) {
                    return a + b;
                }
            }, {
                nome: "\\",
                exec: function(a, b) {
                    return a % b;
                }
            }
        ];
        this.funcoes = funcoes;
          
        let qtdeFn = Math.floor(Math.random() * this.qtdeMax);
        this.arrayFn = [];
        this.arrayValores = [];
        this.arrayValoresAntesDepois = [];
        for (let i = 0; i < qtdeFn; i++) {
            let idFuncao = Math.floor(Math.random() * funcoes.length);
            this.arrayFn.push(funcoes[idFuncao]);            
            let valorRandom = Math.floor(Math.random() * 10) + 1;
            let antesOuDepois = Math.random() < 0.5; //False = Antes, True = Depois; False = (Result, valorRandom), True = (valorRandom, Result)
            if (this.check) {
                valorRandom = 2;
                antesOuDepois = true;
            }
            this.arrayValores.push(valorRandom);
            this.arrayValoresAntesDepois.push(antesOuDepois);
        }
    }

    setCheck() {
        this.check = true;
        this.arrayFn = [];
        this.arrayFn.push(this.funcoes[3]);
    }

    calcular(a) {
        this.valorInicial = a;
        let result = a;

        this.arrayFn.forEach((fn, index) => {
            let valorRandom = this.arrayValores[index];
            let antesOuDepois = this.arrayValoresAntesDepois[index];
            let val1 = antesOuDepois ? result : valorRandom;
            let val2 = antesOuDepois ? valorRandom: result;
            result = fn.exec(val1, val2);
        });
        return result;
    }

    print() {
        let result = "";
        for (let i = 0; i < this.arrayFn.length; i++) {
            let a = " a ";
            let b = " b(" +this.arrayValores[i] + ") ";
            let f = this.arrayFn[i].nome;

            let f1 = this.arrayValoresAntesDepois[i] ? a + f + b : b + f + a;
            result += f1;
        }
        if (this.check) {
            result = "*** " + result;
        }
        console.log("=> "  + result);
        // console.table(this.arrayFn);
        // console.table(this.arrayValores);
        // console.table(this.arrayValoresAntesDepois);
    }

}
