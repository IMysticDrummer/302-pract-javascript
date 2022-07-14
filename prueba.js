class Prueba {
  constructor() {
    this.prueba='Prueba'

  }
  variableFuncion(){
    console.log('Esto es una funcion')
  }
  variableFuncion2() {console.log('Esto es una funcion2')}
}
Prueba.prototype.test=() => Prueba.prototype.variableFuncion()
Prueba.prototype.test2=() => Prueba.prototype.variableFuncion2()

let aVer=new Prueba()
aVer.test()