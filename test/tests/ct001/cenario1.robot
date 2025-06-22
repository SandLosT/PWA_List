*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Preencher com um e-mail que já existe
    Acessar a página de cadastro
    Preencher com um e-mail que já existe
    Clicar em avançar
    Deve exibir mensagem de erro

*** Keywords ***
Acessar a página de cadastro
    Open Browser    ${CADASTRAR_URL}    chrome
    Maximize Browser Window

Preencher com um e-mail que já existe
    Input Text    id=email    ${EMAIL}

Clicar em avançar
    Wait Until Element Is Visible    xpath=//form[@id = "formEmail"]//button[@type = "submit"]
    Click Button    xpath=//form[@id = "formEmail"]//button[@type = "submit"]
Deve exibir mensagem de erro
    Wait Until Element Contains    id=swal2-html-container    Esse e-mail já possui cadastro!