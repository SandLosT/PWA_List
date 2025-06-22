*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Visualizar cadastro
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no menu "Eu"
    Clicar na opção "Meu perfil"
    Deve exibir a página "Meu perfil"

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
    
Deve exibir a página "Meu perfil"
    Wait Until Location Contains    ${MEU_PERFIL_URL}