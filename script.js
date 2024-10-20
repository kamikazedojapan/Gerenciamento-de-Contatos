// Seleciona os elementos do DOM
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Variável para controlar se está editando um contato existente
let editingContact = null;

// Função para adicionar ou editar um contato
contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura os valores dos campos de input
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (editingContact) {
        // Editar um contato existente
        editingContact.innerHTML = createContactHTML(name, phone, email);

        // Reativa os botões "Remover" e "Editar"
        setDeleteAndEditEvents(editingContact);

        // Reseta o estado de edição
        editingContact = null;
    } else {
        // Cria um novo item de contato (li)
        const li = document.createElement('li');
        li.innerHTML = createContactHTML(name, phone, email);

        // Adiciona o novo contato à lista
        contactList.appendChild(li);

        // Ativa os botões "Remover" e "Editar"
        setDeleteAndEditEvents(li);
    }

    // Limpa os campos do formulário após adicionar ou editar o contato
    contactForm.reset();
});

// Função para criar o HTML de um contato
function createContactHTML(name, phone, email) {
    return `
        <span>Nome:</span> ${name} <br>
        <span>Telefone:</span> ${phone} <br>
        <span>E-mail:</span> ${email}
        <button class="deleteBtn">Remover</button><br><br>
        <button class="editBtn">Editar</button>
    `;
}

// Função para configurar eventos de "Remover" e "Editar" para um item da lista
function setDeleteAndEditEvents(contactItem) {
    // Função para remover o contato
    contactItem.querySelector('.deleteBtn').addEventListener('click', function () {
        contactItem.remove();
    });

    // Função para editar o contato
    contactItem.querySelector('.editBtn').addEventListener('click', function () {
        const [name, phone, email] = extractContactInfo(contactItem);
        document.getElementById('name').value = name;
        document.getElementById('phone').value = phone;
        document.getElementById('email').value = email;

        // Define o item atual como sendo editado
        editingContact = contactItem;
    });
}

// Função para extrair as informações de um contato do HTML
function extractContactInfo(contactItem) {
    const spans = contactItem.querySelectorAll('span');
    const name = spans[0].nextSibling.textContent.trim();
    const phone = spans[1].nextSibling.textContent.trim();
    const email = spans[2].nextSibling.textContent.trim();
    return [name, phone, email];
}
