var divElement = document.querySelector('#app');
var inputElement = document.createElement('input');
var ulElement = document.createElement('ul');
var buttonElement = document.createElement('button');
divElement.appendChild(inputElement);
buttonElement.textContent = 'Buscar repositórios do usuário';
divElement.appendChild(buttonElement);

buttonElement.onclick = function(){
    ulElement.innerHTML ='';
    var liElement = document.createElement('li');
    liElement.textContent = 'Carregando...';
    ulElement.appendChild(liElement);
    
    var link = 'https://api.github.com/users/'+inputElement.value+'/repos';
    inputElement.value = '';

    axios.get(link)
    .then(function(response) {
        ulElement.innerHTML ='';
        var data = response.data;
        for(nomes of data){
            var liElement = document.createElement('li');
            liElement.textContent = nomes.name;
            ulElement.appendChild(liElement);
        }
    })
    .catch(function(error) {
        ulElement.innerHTML ='';
        var liElement = document.createElement('li');
        if (error == 'Error: Request failed with status code 404'){
            liElement.textContent = 'Erro, usuário não existe!';
        } else {
            liElement.textContent = error;
        }
        ulElement.appendChild(liElement);
    });
    divElement.appendChild(ulElement);
}