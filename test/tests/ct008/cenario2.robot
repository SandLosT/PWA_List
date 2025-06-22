*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 2: Inserir nome inválido
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar na opção "Adicionar"
    Preencher com um nome inválido
    Clicar em "Criar"
    Deve exibir mensagem de erro

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ${EMAIL}
    Input Password    id=senha    ${SENHA}
    Click Button    xpath=//button[@type = "submit"]

Clicar na opção "Adicionar"
    Wait Until Element Is Visible    id=botaoAdicionar    timeout=10s
    Click Button    id=botaoAdicionar

Preencher com um nome inválido
    Wait Until Element Is Visible    id=formCriarListaNome    timeout=10s
    Input Text    id=formCriarListaNome    ${EMPTY}
    
Clicar em "Criar"
    Wait Until Element Is Visible    xpath=//div[@id = "modalCriarLista"]//button[contains(text(), "Criar")]    timeout=10s
    Click Button    xpath=//div[@id = "modalCriarLista"]//button[contains(text(), "Criar")]

Deve exibir mensagem de erro
    Page Should Contain Element    xpath=//form[@id = "formCriarLista"]//*[@class = "invalid-feedback"]