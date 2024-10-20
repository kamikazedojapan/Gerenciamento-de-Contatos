// Seleciona os elementos do DOM
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Váriavel para controlar se está editando um contato existente
let editingContact = null;

// Função para adicionar ou editar um contato
contactForm.addEventListener('submit', function(event){
    event.preventDefault();

    // Captura os valores dos campos de input
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (editingContact) {
        // Editar um contato existente
        editingContact.innerHTML = `<span>Nome:</span> ${name} <br><span>Telefone:</span> ${phone} <br><span>E-mail:</span> ${email}
        <button class="deleteBtn">Remover</button><br><br>
        <button class="editBtn">Editar</button>`;

        // Reativa os botoes "Remover" e "Editar" para o conteudo editado
        setDeleteAndEditEvents(editingContact);

        // Reseta o estado de edição
        editingContact = null;
    } else {
        // Cria um novo item de contato(li)
        const li = document.createElement('li');

        li.innerHTML = `<span>Nome:</span> ${name} <br><span>Telefone:</span> ${phone} <br><span>E-mail:</span> ${email}
        <button class="deleteBtn">Remover</button><br><br>
        <button class="editBtn">Editar</button>`;

        // Adcionar o novo contato à lista
        contactList.appendChild(li);

        //Ativa os botoes "Remover" e "Editar" para o novo contato
        setDeleteAndEditEvents(li); 
    }

    // Limpa os campos do formulário após adcionar ou editar o contato
    contactForm.reset();
});

// Função para configurar eventos de "Remover" e "Editar" para um item da lista
function setDeleteAndEditEvents(contactItem) {
    // Função para remover o contato da lista
    contactItem.querySelector('.deleteBtn').addEventListener('click',function() {
        contactItem.remove();
    });

    // Função para editar o contato da lista
    contactItem.querySelector('.editBtn').addEventListener('click', function() {
        // Preenche o formulário com os valores do contato
        const contactDetails = contactItem.querySelectorAll('span');
        document.getElementById('name').value = contactDetails[0].nextSibling.nodeValue.trim();
        document.getElementById('phone').value = contactDetails[2].nextSibling.nodeValue.trim();
        document.getElementById('email').value = contactDetails[4].nextSibling.nodeValue.trim();

        // Define o contato em edição
        editingContact = contactItem;
    });
}
