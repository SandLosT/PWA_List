*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 2: Cancelar exclusão
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no nome de uma lista
    Selecionar um item
    Clicar na opção "Excluir"
    Cancelar exclusão

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ${EMAIL}
    Input Password    id=senha    ${SENHA}
    Click Button    xpath=//button[@type = "submit"]

Clicar no nome de uma lista
    Wait Until Element Is Visible    xpath=(//*[@class = "etiqueta__titulo"])[1]    timeout=10s
    Click Element    xpath=(//*[@class = "etiqueta__titulo"])[1]

Selecionar um item
    Sleep    2s
    Wait Until Element Is Visible    xpath=(//div[contains(@class, "etiqueta--item")]//button[@data-bs-toggle="dropdown"])[1]    timeout=10s
    Click Button    xpath=(//div[contains(@class, "etiqueta--item")]//button[@data-bs-toggle = "dropdown"])[1]

Clicar na opção "Excluir"
    Wait Until Element Is Visible    xpath=(//div[contains(@class, "etiqueta--item")]//button[contains(@class, "dropdown-item")])[2]    timeout=10s
    Click Button    xpath=(//div[contains(@class, "etiqueta--item")]//button[contains(@class, "dropdown-item")])[2]

Cancelar exclusão
    Wait Until Element Is Visible    xpath=//button[contains(@class, "swal2-cancel")]    timeout=10s
    Click Button    xpath=//button[contains(@class, "swal2-cancel")]