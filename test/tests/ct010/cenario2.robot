*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 2: Inserir nome inválido
    Abrir a página de login
    Inserir as credenciais válidas
    Selecionar uma lista
    Clicar na opção "Renomear"
    Inserir nome inválido
    Clicar na opção "Salvar"
    Deve exibir mensagem de erro 

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

Clicar na opção "Renomear"
    Wait Until Element Is Visible    xpath=(//div[contains(@class, "etiqueta--lista")]//button[contains(@class, "dropdown-item")])[2]    timeout=10s
    Click Button    xpath=(//div[contains(@class, "etiqueta--lista")]//button[contains(@class, "dropdown-item")])[2]

Inserir nome inválido
    Wait Until Element Is Visible    id=formRenomearListaNome    timeout=10s
    Clear Element Text    id=formRenomearListaNome
    Input Text    id=formRenomearListaNome    ${EMPTY}

Clicar na opção "Salvar"
    Wait Until Element Is Visible    xpath=//div[@id = "modalRenomearLista"]//button[contains(text(), "Salvar")]    timeout=10s
    Click Button    xpath=//div[@id = "modalRenomearLista"]//button[contains(text(), "Salvar")]
    
Deve exibir mensagem de erro
    Page Should Contain Element    xpath=//form[@id = "formRenomearLista"]//*[@class = "invalid-feedback"]