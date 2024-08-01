//dados iniciais
//variável qwue vai guardar quem vai está nessas áreas
let areas = {
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    //função que começa arrastar e função que termina de arrastar
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

//evento para a área onde vai permitir que solte o item dentro dele
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

//evento para voltar na area que estava o item
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

//funções dos itens dentro da área
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}
    
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

//funções da área dos itens
function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) {
        //função que permite a função soltar algum item
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    e.currentTarget.classList.remove('hover');

    

    //verificando se á uma div ja dentro do espaço onde quer soltar o item
    if(e.currentTarget.querySelector('.item') === null) {
        //para identificar e pegar o item que está arrastando
        let dragItem = document.querySelector('.item.dragging');

        //função que vai mudar o item de lugar sem criar um clone ou excluir
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

//função para voltar os itens para a área onde sairam
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    //e.preventDefault();
    e.currentTarget.classList.remove('hover');
    //para identificar e pegar o item que está arrastando
    let dragItem = document.querySelector('.item.dragging');

    //função que vai mudar o item de lugar sem criar um clone ou excluir
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//logicas de funções
//função que vai atualizar quem vai estar nas áreas
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        //variavel que vai pegar o nome da área
        let name = area.getAttribute('data-name');

        //verificando quem está dentro da área
        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        }else {
            areas[name] = null;
        }
    });
    
    //condição para ver se todas as areas estão com os numero em seguencia
    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    }else {
        document.querySelector('.areas').classList.remove('correct');
    }
}