//Game 1

const secret_key = "database";
let entryCount = 0;
const limitCount = 3;

function runGuesser (){
    function createChecker(correctKey){
        function checkKey(inputKey){
            return inputKey === correctKey;
        }
        return checkKey;
    }
    
    while (entryCount < limitCount){
        const inputUser = prompt("ingrese clave para pasar de nivel");
        const checker = createChecker(secret_key);
        if(checker(inputUser)){
            console.log("nivel 3")
            break;
        }
        else{
            entryCount++;
            if(entryCount === limitCount){
                alert("denegado");
            }
        }
    }

}

runGuesser();



/*

//Variables
// keyword + name = value;

let usuario = "Juan";
const server = "192.168.10.68" //Const no cambia el valor luego de su declaración

//metodo de escritura // camelCase //  Esto es una pregunta para ver si hay stock
let isStock = false;

//uso de tab y break
console.log("productos: \narroz \tqueso jamon");

// backtics `` desbloquea template string (${})

// || significa o

console.log("Im " + usuario);
console.log("Im", usuario);
console.log(`Im ${usuario}`);

// methos and properties

let nickName = "PeTeR";

console.log(nickName.toLowerCase());
console.log(nickName.toLowerCase());

let greetings = "Hi everyone!";
console.log(greetings.startsWith("Hi")); //devuelve un true o false

console.log(greetings.length); //calcular longitud... cantidad de chars en este caso

console.log(greetings.replace("Hi", "Hello")); //reemplaza Hi por Hello en la variable greetings

console.log(nickName.includes("P")); //si incluye o no lo que esta en comillas

*/

/* 
Ejercicio 1
let cantidad = parseInt(prompt('INGRESE CANTIDAD DE REPETICIONES'));
let texto = prompt('INGRESE TEXTO A REPETIR');
for (let index = 0; index < cantidad; index) {
    cantidad --;
console.log(texto);
console.log(cantidad);
console.log(typeof(cantidad));
}

Ejercicio 2
let lados = prompt('INGRESE CANTIDAD DE LADOS');
for (let index = 0; index < lados; index++) {
if (index > 3) {
}
alert("lado");
}

Ejercicio 3
let numero = prompt("ingresar numero:");

if(numero%2 == 0){
    console.log(numero);
}

//Calculadora

let num1 = prompt("Enter number:")
let num2 = prompt("Enter number:")

parseFloat(num1);
parseFloat(num2);

document.write(num1+num2);

*/