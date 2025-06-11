async function editarUsuario(e) {
    e.preventDefault()
    
    // const apiBasicAddress = await getApiBasicAddress();

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: "/usuarios/" + formData.get('id'),
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