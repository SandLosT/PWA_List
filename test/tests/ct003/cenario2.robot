*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 2: Inserir nome inválido
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no menu "Eu"
    Clicar na opção "Meu perfil"
    Clicar na opção "Editar" do formulário "Informações pessoais"
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

Clicar no menu "Eu"
    Wait Until Element Is Visible    css=.dropdown-toggle    timeout=10s
    Click Element    css=.dropdown-toggle

Clicar na opção "Meu perfil"
    Wait Until Element Is Visible    xpath=//a[contains(@class, 'dropdown-item') and @href = '/usuario']    timeout=10s
    Click Element    xpath=//a[contains(@class, 'dropdown-item') and @href = '/usuario']

Clicar na opção "Editar" do formulário "Informações pessoais"
    Wait Until Element Is Visible    xpath=//form[@id = "formNome"]//button[contains(text(), "Editar")]    timeout=10s
    Click Button    xpath=//form[@id = "formNome"]//button[contains(text(), "Editar")]

Inserir nome inválido
    Input Text    xpath=//form[@id="formNome"]//input[@id = "nome"]    ${EMPTY}

Clicar na opção "Salvar"
    Wait Until Element Is Visible    xpath=//form[@id = "formNome"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formNome"]//button[@type = "submit"]

Deve exibir mensagem de erro
    Page Should Contain Element    xpath=//form[@id = "formNome"]//*[@class = "invalid-feedback"]