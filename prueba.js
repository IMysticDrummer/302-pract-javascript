class Prueba {
  constructor() {
    this.prueba='Prueba'

    this.variableFuncion=() => console.log('Esto es una funcion')
    this.variableFuncion2=function(){console.log('Esto es una funcion2')}
  }
}
Prueba.prototype.test=() => this.variableFuncion()
Prueba.prototype.test2=() => this.variableFuncion2()

let aVer=new Prueba()
aVer.test()