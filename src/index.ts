console.log("¡Hola, TypeScript!");

function saludar(nombre: string): string {
	return `Hola, ${nombre}!`;
}

const mensaje = saludar("Mundo");
console.log(mensaje);
