import { API_BASIC_ADDRESS } from '../modules/settings.js'

function editarUsuario(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: API_BASIC_ADDRESS + "/api/usuarios/" + formData.get('id'),
            type: "put",
            data: JSON.stringify({
                nome: formData.get("nome"),
                username: formData.get("username")
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: `As suas informações foram atualizadas com sucesso!`,
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function () {
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao atualizar as suas informações!",
                icon: "error"
            }).then(function () {
                window.location.reload()
            })
        })
    }

}