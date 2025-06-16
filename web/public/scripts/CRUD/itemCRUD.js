function criarItem(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var form = document.getElementById("formCriarItem")
    var formData = new FormData(form)

    if (e.target.checkValidity()) {
        $.ajax({
            url: '/item/criar/' + formData.get("listaId"),
            type: "post",
            data: JSON.stringify({
                nome: formData.get("nome"),
                quantidade: parseInt(formData.get("quantidade")),
                preco: parseFloat(formData.get("preco"))
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
            url: "/item/editar/" + formData.get('id') + '/lista/' + formData.get('listaId'),
            type: "put",
            data: JSON.stringify({
                nome: formData.get('nome'),
                quantidade: parseInt(formData.get('quantidade')),
                preco: parseFloat(formData.get('preco'))
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
        }).fail(function (jqXHR, statusText, errorThrown) {
            // console.log(jqXHR)
            // console.log(statusText)
            // console.log(errorThrown)
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

function diminuirItem(listaId, itemId) {
    $.ajax({
        url: "/item/diminuir/" + itemId + '/lista/' + listaId,
        type: "put"
    }).done(function () {
        var quantidade = $(`#item${itemId}`).val()
        if (quantidade - 1 < 0) {
            $(`#item${itemId}`).val(0)
        } else {
            $(`#item${itemId}`).val(parseInt(quantidade) - 1)
        }
    }).fail(function (jqXHR, statusText, errorThrown) {
        // console.log(jqXHR)
        // console.log(statusText)
        // console.log(errorThrown)
        window.location.reload()
    })
}

function aumentarItem(listaId, itemId) {
    $.ajax({
        url: "/item/aumentar/" + itemId + '/lista/' + listaId,
        type: "put"
    }).done(function () {
        var quantidade = $(`#item${itemId}`).val()
        $(`#item${itemId}`).val(parseInt(quantidade) + 1)
    }).fail(function (jqXHR, statusText, errorThrown) {
        // console.log(jqXHR)
        // console.log(statusText)
        // console.log(errorThrown)
        window.location.reload()
    })
}

function excluirItem(listaId, itemId) {
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
                url: "/item/excluir/" + itemId + "/lista/" + listaId,
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