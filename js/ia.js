
class IA {
    constructor(qtdeExperimentos, qtdeMaxFuncoesPorExperimentos) {
        this.qtdeExperimentos = qtdeExperimentos;
        this.qtdeMaxFuncoesPorExperimentos = qtdeMaxFuncoesPorExperimentos + 1;
        this.arrFuncaoRandomica = [];
        this.objFuncaoRandomica = {};
        for (let i = 0; i < qtdeExperimentos; i++) {
            let fn = new FuncaoRandomica(this.qtdeMaxFuncoesPorExperimentos);
            if (!this.objFuncaoRandomica.hasOwnProperty(fn.hash)) {
                this.arrFuncaoRandomica.push(fn);
                this.objFuncaoRandomica[fn.hash] = fn;
            }
        }
        // let fnCheck = new FuncaoRandomica(this.qtdeMaxFuncoesPorExperimentos);
        // fnCheck.setCheck();
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

    gerarOutput() {
        let result = ""
        this.arrFuncaoRandomicaFiltrada.forEach(elemFn => result += elemFn.gerarOutput() + "\n");
        return result;
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
        this.valorInicial = [];
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
                    return Math.pow(a, 1/b);
                }
            }, {
                nome: "\\",
                exec: function(a, b) {
                    return a % b;
                }
            }
        ];
        this.funcoes = funcoes;
        this.hash = "";
          
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
            this.hash += antesOuDepois ? funcoes[idFuncao].nome + valorRandom : valorRandom + funcoes[idFuncao].nome;
        }
    }

    setCheck() {
        this.check = true;
        this.arrayFn = [];
        this.arrayFn.push(this.funcoes[3]);
    }

    calcular(a) {
        this.valorInicial.push(a);
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

    calcularSimples(fn, antesOuDepois, result, valorRandom) {
        let val1 = antesOuDepois ? result : valorRandom;
        let val2 = antesOuDepois ? valorRandom: result;
        return fn.exec(val1, val2);
    }

    gerarOutput() {
        let resultStr =  ""; // `Input [${this.valorInicial[0]}] => \n`;
        let resultHeader = "Fórmula =>";
        // let result = this.valorInicial[0]
        this.valorInicial.forEach((result, indexVI) => {
            for (let i = 0; i < this.arrayFn.length; i++) {
                let a = "[" + result + "]";
                let b = this.arrayValores[i];
                let f = this.arrayFn[i].nome;
                result = this.calcularSimples(
                    this.arrayFn[i],
                    this.arrayValoresAntesDepois[i],
                    result, b);
                
                let antes = this.arrayValoresAntesDepois[i];
                let f1 = antes ? a + " " + f + " " + b : b + " " + f + " " + a;
                resultStr += "  " + f1 + ", ";
                if (indexVI == 0) {
                    resultHeader += antes ? " a " + f + " b, ": " b " + f + " a, ";
                }
            }
            if (this.check) {
                resultStr = "*** " + resultStr;
            }
            resultStr = resultStr.substr(0, resultStr.length - 2) + " => " + result + "  \n";            
            if (indexVI == 0) {
            //     resultHeader += antes ? " a " + f + " b, ": " b " + f + " a, ";
                resultHeader = resultHeader.substr(0, resultHeader.length - 2) + " \n";
                resultStr = resultHeader + resultStr;
            }
        })
        // resultStr = resultStr.substr(0, resultStr.length - 4);
        return resultStr;
    }

    print() {
        console.log(this.gerarOutput());
    }

}
