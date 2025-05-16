function criarLista(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var form = document.getElementById("formCriarLista")
    var formData = new FormData(form)

    if (e.target.checkValidity()) {
        $.ajax({
            url: "/lista/criar/",
            type: "post",
            data: JSON.stringify({
                titulo: formData.get("titulo")
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: `A lista "${formData.get("titulo")}" foi criada com sucesso!`,
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function () {
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao criar a lista!",
                icon: "error"
            }).then(function () {
                window.location.reload()
            })
        })
    }
}

function editarLista(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var form = document.getElementById("formRenomearLista")
    var formData = new FormData(form)

    if (e.target.checkValidity()) {
        $.ajax({
            url: "/lista/editar/" + formData.get("id"),
            type: "put",
            data: JSON.stringify({
                id: formData.get("id"),
                titulo: formData.get("titulo")
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: `A lista foi renomeada com sucesso!`,
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function () {
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao renomear a lista!",
                icon: "error"
            }).then(function () {
                window.location.reload()
            })
        })
    }
}

function excluirLista(id) {
    Swal.fire({
        title: "Tem certeza que deseja excluir a lista?",
        text: "Não será possível desfazer esta ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#f8f9fa",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/lista/excluir/" + id,
                type: "delete"
            }).done(function () {
                Swal.fire({
                    title: "Sucesso!",
                    text: "A lista foi excluída com sucesso!",
                    icon: "success"
                }).then(function () {
                    window.location.reload()
                })
            }).fail(function () {
                Swal.fire({
                    title: "Erro!",
                    text: "Não foi possível excluir a lista!",
                    icon: "error"
                }).then(function () {
                    window.location.reload()
                })
            })
        }
    });
}