async function login(e) {
    e.preventDefault();

    const API_BASIC_ADDRESS = await fetch('/settings')
        .then(response => response.json())
        .then(data => data.servers["PWA_List.API"].address)

    e.target.classList.add("was-validated")

    var formData = new FormData(e.target)

    if (e.target.checkValidity()) {
        $.ajax({
            url: API_BASIC_ADDRESS + "/api/auth/login",
            type: "post",
            data: JSON.stringify({
                email: formData.get("email"),
                senha: formData.get("senha")
            }),
            contentType: "application/json"
        }).done(function (token) {
            localStorage.setItem("security-auth-jwt", token)
            window.location.href = '/'
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            if (jqXHR.status == 401) {
                Swal.fire({
                    title: "Atenção",
                    text: "Credenciais inválidas!",
                    icon: "info"
                })
            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Ocorreu um erro ao realizar login!",
                    icon: "error"
                }).then(function () {
                    window.location.reload()
                })
            }
        })
    }
}