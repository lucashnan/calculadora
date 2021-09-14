class Calculadora{
    sumar(num1, num2){
        return num1+num2
    }
    restar(num1, num2){
        return num1-num2
    }
    multiplicar(num1, num2){
        return num1*num2
    }
    dividir(num1, num2){
        return num1/num2
    }

}


class DisplayVisual{
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorAnterior = displayValorAnterior;
        this.displayValorActual = displayValorActual;
        this.calculador = new Calculadora();
        this.tipoOperacion= undefined;
        this.valorActual = '';
        this.valorAnterior ='';
        this.signos= {
            sumar:"+",
            restar:"-",
            multiplicar:"*",
            dividir:"÷",
        }
    }

    borrar(){
        this.valorActual=this.valorActual.toString().slice(0,-1);
        this.mostrarNumero();
    }

    borrarTodo(){
        this.valorActual= "";
        this.valorAnterior="";
        this.tipoOperacion= undefined;
        this.mostrarNumero();

        }

    agregarNumero(numero){
        if(numero==='.'&& this.valorActual.includes('.'))return;
        this.valorActual = this.valorActual.toString()+numero.toString();
        this.mostrarNumero();
    }
    mostrarNumero(){
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }


    calcular(){

        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual)|| isNaN(valorAnterior))return;
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);

    }

    computar(tipo){

        this.tipoOperacion!=='igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.mostrarNumero();


    }



}

const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumero = document.querySelectorAll('.numeroB');
const botonesOperadores = document.querySelectorAll('.simbolos');

const display = new DisplayVisual(displayValorAnterior, displayValorActual);

botonesNumero.forEach(boton =>boton.addEventListener('click', ()=> display.agregarNumero(boton.innerHTML)));

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', ()=> display.computar(boton.value));
});