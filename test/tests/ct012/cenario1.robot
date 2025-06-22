*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Criar item com sucesso
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no nome de uma lista
    Clicar na opção "Adicionar"
    Preencher todos os campos obrigatórios
    Clicar na opção "Criar"
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

Clicar na opção "Adicionar"
    Sleep    2s
    Wait Until Element Is Visible    id=botaoAdicionar    timeout=10s
    Click Button    id=botaoAdicionar

Preencher todos os campos obrigatórios
    Wait Until Element Is Visible    id=formCriarItemNome    timeout=10s
    Input Text    id=formCriarItemNome    Item teste

Clicar na opção "Criar"
    Wait Until Element Is Visible    xpath=//div[@id = "modalCriarItem"]//button[contains(text(), "Criar")]    timeout=10s
    Click Button    xpath=//div[@id = "modalCriarItem"]//button[contains(text(), "Criar")]
    
Deve exibir mensagem de sucesso
    Wait Until Element Contains    id=swal2-title    Sucesso