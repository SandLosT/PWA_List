async function login(e) {
    e.preventDefault();

    // const apiBasicAddress = await getApiBasicAddress()

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: "/auth/login",
            type: "POST",
            data: JSON.stringify({
                email: formData.get("email"),
                senha: formData.get("senha")
            }),
            contentType: "application/json"
        }).done(function () {
            window.location.href = '/lista'
        }).fail(function (jqXHR, statusText, errorThrown) {
            // console.log(jqXHR)
            // console.log(statusText)
            // console.log(errorThrown)
            if (jqXHR.status == 401) {
                Swal.fire({
                    title: "Atenção",
                    text: "Credenciais inválidas!",
                    icon: "info"
                })
            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Ocorreu um erro ao realizar login: " + errorThrown || textStatus,
                    icon: "error"
                }).then(function () {
                    window.location.reload()
                })
            }
        })
    }
}