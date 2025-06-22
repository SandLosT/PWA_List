*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Confirmar exclusão
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no menu "Eu"
    Clicar na opção "Meu perfil"
    Clicar na opção "Excluir cadastro"
    Confirmar exclusão
    Deve redirecionar para a página de login

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ct004_cenario1@teste.com
    Input Password    id=senha    senha123
    Click Button    xpath=//button[@type = "submit"]

Clicar no menu "Eu"
    Wait Until Element Is Visible    css=.dropdown-toggle    timeout=10s
    Click Element    css=.dropdown-toggle

Clicar na opção "Meu perfil"
    Wait Until Element Is Visible    xpath=//a[contains(@class, 'dropdown-item') and @href = '/usuario']    timeout=10s
    Click Element    xpath=//a[contains(@class, 'dropdown-item') and @href = '/usuario']

Clicar na opção "Excluir cadastro"
    Wait Until Element Is Visible    xpath=//button[@data-bs-toggle = "dropdown"]    timeout=10s
    Click Button    xpath=//button[@data-bs-toggle = "dropdown"]
    Wait Until Element Is Visible    xpath=//button[@onclick = "excluirCadastro()"]    timeout=10s
    Click Button    xpath=//button[@onclick = "excluirCadastro()"]

Confirmar exclusão
    Wait Until Element Is Visible    xpath=//button[contains(@class, "swal2-confirm")]    timeout=10s
    Click Button    xpath=//button[contains(@class, "swal2-confirm")]

Deve redirecionar para a página de login
    Wait Until Location Contains    ${LOGIN_URL}