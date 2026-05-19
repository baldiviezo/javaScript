class claseOne {
    constructor() {
        this.nombre = "Alvaro";
        this.apellido = "Baldiviezo";
        // Llamamos al método desde el constructor para que se configure al crear el objeto
        this.initialize();
    }

    initialize() {
        // Usamos 'this.' para que la propiedad sea parte del objeto
        this.nombreCompleto = `${this.nombre} ${this.apellido}`;
    }
    // Con 'async/await' para esperar a que el timer termine antes de llamar a 'verInformacion'
    async tiempo1() {
        await new Promise(resolve => setTimeout(() => {
            console.log('Timer 2000 seg');
            resolve();
        }, 2000));
        this.verInformacion();
    }
    // Sin 'async/await', el método se ejecutará sin esperar al timer, lo que puede causar que 'verInformacion' se ejecute antes de que 'nombreCompleto' esté definido
    tiempo2() {
        setTimeout(() => {
            console.log('Timer 3000 seg');
        }, 3000);
        this.verInformacion();
    }

    verInformacion() {
        // Ahora 'this.nombreCompleto' sí existe
        console.log(`Mi nombre es: ${this.nombreCompleto}`);
    }
}

let objetoOne = new claseOne(); // Al crear el objeto, el constructor se ejecuta y llama a 'initialize', configurando 'nombreCompleto'
objetoOne.tiempo1(); // Llamamos al método que usa 'async/await' para esperar al timer antes de mostrar la información
objetoOne.tiempo2(); 
