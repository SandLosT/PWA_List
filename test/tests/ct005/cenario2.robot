*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 2: Inserir credenciais inválidas
    Abrir a página de login
    Inserir as credenciais inválidas
    Deve exibir mensagem de erro

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window
    
Inserir as credenciais inválidas
    Input Text    id=email    email_errado@gmail.com
    Input Password    id=senha    senha_errada
    Click Button    xpath=//button[@type = "submit"]

Deve exibir mensagem de erro
    Wait Until Element Contains    id=swal2-html-container    Credenciais inválidas!