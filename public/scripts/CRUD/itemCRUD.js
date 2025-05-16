function criarItem(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var listaId = document.getElementById("listaId").value
    var form = document.getElementById("formCriarItem")
    var formData = new FormData(form)

    // debug
    console.log(listaId)
    console.log(formData.get("nome"))
    console.log(parseInt(formData.get("quantidade")))
    console.log(parseFloat(formData.get("preco")))

    if (e.target.checkValidity()) {
        $.ajax({
            url: "/item/criar",
            type: "post",
            data: JSON.stringify({
                nome: formData.get("nome"),
                quantidade: parseInt(formData.get("quantidade")),
                preco: parseFloat(formData.get("preco")),
                listaId: listaId
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: `O item "${formData.get("nome")}" foi criado com sucesso!`,
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function () {
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao criar o item!",
                icon: "error"
            }).then(function () {
                window.location.reload()
            })
        })
    }
}

function editarItem(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var form = document.getElementById('formEditarItem')
    var formData = new FormData(form)

    if (e.target.checkValidity()) {
        $.ajax({
            url: "/item/editar/" + formData.get('id'),
            type: "put",
            data: JSON.stringify({
                id: formData.get('id'),
                nome: formData.get('nome'),
                quantidade: parseInt(formData.get('quantidade')),
                preco: parseFloat(formData.get('preco')),
                listaId: formData.get('listaId')
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: `O item foi editado com sucesso!`,
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function () {
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao editar o item!",
                icon: "error"
            }).then(function () {
                window.location.reload()
            })
        })
    }
}

function diminuirItem(id) {
    $.ajax({
        url: "/item/diminuir/" + id,
        type: "post"
    }).done(function (resultado) {
        $(`#item${id}`).val(resultado.quantidade)
    }).fail(function () {
        window.location.reload()
    })
}

function aumentarItem(id) {
    $.ajax({
        url: "/item/aumentar/" + id,
        type: "post"
    }).done(function (resultado) {
        $(`#item${id}`).val(resultado.quantidade)
    }).fail(function () {
        window.location.reload()
    })
}

function excluirItem(id) {
    Swal.fire({
        title: "Tem certeza que deseja excluir o item?",
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
                url: "/item/excluir/" + id,
                type: "delete"
            }).done(function () {
                Swal.fire({
                    title: "Sucesso",
                    text: "O item foi excluído com sucesso!",
                    icon: "success"
                }).then(function () {
                    window.location.reload()
                })
            }).fail(function () {
                Swal.fire({
                    title: "Erro",
                    text: "Ocorreu um erro ao excluir o item!",
                    icon: "error"
                }).then(function () {
                    window.location.reload()
                })
            })
        }
    })
}