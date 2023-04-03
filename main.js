// procura o campo (<input>) em que o cep será digitado a partir de seu id #cep.
var cep = document.getElementById('cep');
// quando o usuário clicar para fora do campo após escrever o CEP, ele invoca a function assíncrona buscaEndereço e manda o valor do CEP digitado para que possa haver a busca do CEP especificado na API ViaCEP. 
cep.addEventListener('focusout', () => buscaEndereco(cep.value))

// definimos a function buscaEndereco() como uma function assíncrona através de async, tornando-a uma promise. O fetch será executado na variável, buscando as informações a partir do CEP informado, porém nenhum outro código abaixo na function será executado até que a promise retorne concluída, já que o await pausa a execução da function até que a promise seja finalizada. Quando a resposta da invocação fetch() for resolvida, a var consultaCep receberá o valor da promise resolvida, e os códigos abaixo serão executados. Após isso, formatamos o valor obtido em consultaCep para .json na var consultaCepConvertida, atribuindo await novamente. Caso não utilizássemos o await nesse caso, a function não esperaria a promise ser resolvida, e o restante do código seria executado, mesmo sem ter obtido algum valor. Por isso, é necessário adicionar o await para que a promise seja finalizada antes que os outros códigos sejam executados. 

// o try irá analisar o bloco de código, e se houver alguma exceção/erro enquanto estiver sendo executado, ele envia essa informação ao catch, que por sua vez receberá o throw Error ('Cep não existe.'), exibindo a mensagem no console. Caso a promise retorne resolvida, o objeto obtido será retornado. 
async function buscaEndereco(cep) {
  // adiciona uma mensagem em vazio à div relacionada ao input do CEP.
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCepConvertida = await consultaCep.json();
    if(consultaCepConvertida.erro) {
      throw Error('Cep não existe.');
    } 
    
    // procura o campo (<input>) em que a cidade será digitada a partir de seu id #cidade.
    var cidade = document.getElementById("cidade");
    // procura o campo (<input>) em que o endereço será digitado a partir de seu id #endereco.
    var logradouro = document.getElementById("endereco");
    // procura o campo (<input>) em que o estado será digitado a partir de seu id #estado.
    var estado = document.getElementById("estado");
    // procura o campo (<input>) em que o bairro será digitado a partir de seu id #bairro.
    var bairro = document.getElementById("bairro");

    // vamos atribuir o valor das propriedades obtidas na busca do CEP, nos campos do próprio site. 
    // acessa o valor da variável cidade e atribui a ela o valor da propriedade localidade presente no objeto obtido a partir da busca na API. 
    cidade.value = consultaCepConvertida.localidade;
    // acessa o valor da variável logradouro e atribui a ela o valor da propriedade logradouro presente no objeto obtido a partir da busca na API. 
    logradouro.value = consultaCepConvertida.logradouro;
    // acessa o valor da variável estado e atribui a ela o valor da propriedade uf presente no objeto obtido a partir da busca na API. 
    estado.value = consultaCepConvertida.uf;
    // acessa o valor da variável bairro e atribui a ela o valor da propriedade bairro presente no objeto obtido a partir da busca na API. 
    bairro.value = consultaCepConvertida.bairro;
    
    console.log(consultaCepConvertida);
    return consultaCepConvertida;
    } catch(erro) {
      // quando o CEP for inválido, insere um parágrafo dentro da div 'erro' presente no campo do CEP, informando a invalidez do CEP. 
      mensagemErro.innerHTML = `<p>CEP inválido. Tente Novamente.</p>`
      console.log(erro);
    }
}






// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map((valores) => buscaEndereco(valores))
// Promise.all(conjuntoCeps).then((respostas) => console.log(respostas))

// .then((resposta) => resposta.json())
// .then((data) => {
//     if (data.erro){ // Caso o promise obtido seja rejeitado ou pegado pelo catch(), throw lançará um erro personalizado para que seja pegado por catch(), exibindo-o no console. Caso o promise obtido seja resolvido, um console.log com o promise concluído será exibido.  
//         throw Error('Este CEP não existe.')
//     }else {
//       console.log(data) 
//     } 
// })
// //catch() irá identificar a promise rejeitada e enviará a mensagem de erro ao console. 
// .catch((erro) => console.log(erro))
// // quando a promise for concluída, finally irá enviar uma mensagem de conclusão ao console.
// .finally((mensagem) => console.log('Processamento concluído'));

