*** Settings ***
Library    SeleniumLibrary
Library    Collections
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Editar item com sucesso
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no nome de uma lista
    Selecionar um item
    Clicar na opção "Editar"
    Inserir nome válido
    Clicar na opção "Salvar"
    Deve exibir mensagem de sucesso

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

Clicar na opção "Editar"
    Wait Until Element Is Visible    xpath=(//div[contains(@class, "etiqueta--item")]//button[contains(@class, "dropdown-item")])[1]    timeout=10s
    Click Button    xpath=(//div[contains(@class, "etiqueta--item")]//button[contains(@class, "dropdown-item")])[1]

Inserir nome válido
    Wait Until Element Is Visible    id=formEditarItemNome    timeout=10s
    Clear Element Text    id=formEditarItemNome
    Sleep    1s
    Input Text    id=formEditarItemNome    Cuscuz de arroz

Clicar na opção "Salvar"
    Wait Until Element Is Visible    xpath=//div[@id = "modalEditarItem"]//button[contains(text(), "Salvar")]    timeout=10s
    Click Button    xpath=//div[@id = "modalEditarItem"]//button[contains(text(), "Salvar")]

Deve exibir mensagem de sucesso
    Wait Until Element Contains    id=swal2-title    Sucesso