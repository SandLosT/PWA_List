async function editarUsuario(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: '/usuario/editar',
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

function alterarSenha(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    if ($('#formSenhaValidacoes input[type="checkbox"]:checked').length != $('#formSenhaValidacoes input[type="checkbox"]').length) {
        return
    }

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: '/usuario/alterar-senha',
            type: "put",
            data: JSON.stringify({
                senha: formData.get("senha")
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: 'A sua senha foi alterada com sucesso! Faça login novamente no aplicativo.',
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

function alterarEmail(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: '/usuario/alterar-email',
            type: "put",
            data: JSON.stringify({
                email: formData.get("email")
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: 'O seu e-mail foi alterado com sucesso! Faça login novamente no aplicativo.',
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function (jqXHR, statusText, errorThrown) {
            if (jqXHR.status == 400) {
                Swal.fire({
                    title: "Atenção",
                    text: "Esse e-mail já possui cadastro!",
                    icon: "info"
                })
            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Ocorreu um erro ao atualizar as suas informações!",
                    icon: "error"
                }).then(function () {
                    window.location.reload()
                })
            }
        })
    }
}

function alterarUsername(e) {
    e.preventDefault()

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: '/usuario/editar',
            type: "put",
            data: JSON.stringify({
                username: formData.get("username")
            }),
            contentType: "application/json"
        }).done(function () {
            Swal.fire({
                title: "Sucesso",
                text: 'O seu nome de usuário foi alterado com sucesso!',
                icon: "success"
            }).then(function () {
                window.location.reload()
            })
        }).fail(function (jqXHR, statusText, errorThrown) {
            if (jqXHR.status == 400) {
                Swal.fire({
                    title: "Atenção",
                    text: "Esse nome de usuário já possui cadastro!",
                    icon: "info"
                })
            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Ocorreu um erro ao atualizar as suas informações!",
                    icon: "error"
                }).then(function () {
                    window.location.reload()
                })
            }
        })
    }
}

function excluirCadastro() {
    Swal.fire({
        title: "Tem certeza que deseja excluir o seu cadastro?",
        text: "Esta é uma ação permanente e não será possível desfazê-la! Você perderá acesso a todas as suas informações neste aplicativo!",
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
                url: '/usuario/excluir/',
                type: "delete"
            }).done(function () {
                window.location.href = '/auth/login'
            }).fail(function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR)
                // console.log(textStatus)
                // console.log(errorThrown)
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível excluir o seu cadastro! Entre em contato com o nosso suporte via e-mail: support@makeitlist.com',
                    icon: 'error'
                })
            })
        }
    });
}