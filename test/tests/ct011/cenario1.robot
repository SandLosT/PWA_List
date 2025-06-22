*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Confirmar exclusão
    Abrir a página de login
    Inserir as credenciais válidas
    Selecionar uma lista
    Clicar na opção "Excluir"
    Confirmar exclusão
    Deve exibir mensagem de sucesso 

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ${EMAIL}
    Input Password    id=senha    ${SENHA}
    Click Button    xpath=//button[@type = "submit"]

Selecionar uma lista
    Wait Until Element Is Visible    xpath=(//div[contains(@class, "etiqueta--lista")]//button[@data-bs-toggle="dropdown"])[1]    timeout=10s
    Click Button    xpath=(//div[contains(@class, "etiqueta--lista")]//button[@data-bs-toggle = "dropdown"])[1]

Clicar na opção "Excluir"
    Wait Until Element Is Visible    xpath=(//div[contains(@class, "etiqueta--lista")]//button[contains(@class, "dropdown-item")])[3]    timeout=10s
    Click Button    xpath=(//div[contains(@class, "etiqueta--lista")]//button[contains(@class, "dropdown-item")])[3]

Confirmar exclusão
    Wait Until Element Is Visible    xpath=//button[contains(@class, "swal2-confirm")]    timeout=10s
    Click Button    xpath=//button[contains(@class, "swal2-confirm")]
    
Deve exibir mensagem de sucesso
    Wait Until Element Contains    id=swal2-title    Sucesso